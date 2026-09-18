package handler

import (
	"crypto/rand"
	"encoding/hex"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"

	"ai-community/backend/internal/auth/session"
	"ai-community/backend/internal/config"
	"ai-community/backend/internal/githubdiscuss"
	"ai-community/backend/internal/http/response"

	"github.com/gin-gonic/gin"
)

type AuthDiscussionHandler struct {
	cfg    *config.Config
	gh     *githubdiscuss.Client
	store  *session.Store
	secure bool
}

func NewAuthDiscussionHandler(cfg *config.Config, gh *githubdiscuss.Client, store *session.Store) *AuthDiscussionHandler {
	return &AuthDiscussionHandler{
		cfg:    cfg,
		gh:     gh,
		store:  store,
		secure: !cfg.IsDevelopment(),
	}
}

func (h *AuthDiscussionHandler) Login(c *gin.Context) {
	if !h.cfg.GitHub.Enabled {
		response.Fail(c, http.StatusServiceUnavailable, "AUTH_DISABLED", "GitHub OAuth is not configured")
		return
	}
	returnTo := h.safeReturnTo(c.Query("return_to"))
	state := randomState() + "|" + returnTo
	http.SetCookie(c.Writer, &http.Cookie{
		Name:     "laba_oauth_state",
		Value:    state,
		Path:     "/",
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		Secure:   h.secure,
		MaxAge:   int((10 * time.Minute).Seconds()),
	})
	c.Redirect(http.StatusFound, h.gh.AuthorizeURL(state))
}

func (h *AuthDiscussionHandler) Callback(c *gin.Context) {
	if !h.cfg.GitHub.Enabled {
		response.Fail(c, http.StatusServiceUnavailable, "AUTH_DISABLED", "GitHub OAuth is not configured")
		return
	}
	stateCookie, err := c.Request.Cookie("laba_oauth_state")
	if err != nil || stateCookie.Value == "" || stateCookie.Value != c.Query("state") {
		response.BadRequest(c, "INVALID_STATE", "OAuth state mismatch")
		return
	}
	http.SetCookie(c.Writer, &http.Cookie{
		Name:     "laba_oauth_state",
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		HttpOnly: true,
	})

	code := strings.TrimSpace(c.Query("code"))
	if code == "" {
		response.BadRequest(c, "MISSING_CODE", "Missing OAuth code")
		return
	}

	token, err := h.gh.ExchangeCode(c.Request.Context(), code)
	if err != nil {
		response.Fail(c, http.StatusBadGateway, "OAUTH_EXCHANGE_FAILED", "Failed to exchange GitHub code")
		return
	}
	user, err := h.gh.FetchUser(c.Request.Context(), token)
	if err != nil {
		response.Fail(c, http.StatusBadGateway, "OAUTH_USER_FAILED", "Failed to load GitHub user")
		return
	}
	_ = h.gh.EnsureIDs(c.Request.Context(), token)

	payload := session.Payload{
		AccessToken: token,
		User: session.User{
			Login:     user.Login,
			Name:      user.Name,
			AvatarURL: user.AvatarURL,
			HTMLURL:   user.HTMLURL,
		},
		ExpiresAt: time.Now().Add(7 * 24 * time.Hour),
	}
	encoded, err := h.store.Encode(payload)
	if err != nil {
		response.Internal(c)
		return
	}
	h.store.SetCookie(c.Writer, encoded, 7*24*time.Hour)

	returnTo := h.cfg.Frontend.Origin + "/LABA/community"
	if parts := strings.SplitN(c.Query("state"), "|", 2); len(parts) == 2 && parts[1] != "" {
		returnTo = h.safeReturnTo(parts[1])
	}
	c.Redirect(http.StatusFound, returnTo)
}

func (h *AuthDiscussionHandler) Me(c *gin.Context) {
	p, err := h.store.FromRequest(c.Request)
	if err != nil {
		response.OK(c, map[string]any{"authenticated": false, "user": nil})
		return
	}
	response.OK(c, map[string]any{
		"authenticated": true,
		"user":          p.User,
	})
}

func (h *AuthDiscussionHandler) Logout(c *gin.Context) {
	h.store.ClearCookie(c.Writer)
	response.OK(c, map[string]any{"ok": true})
}

func (h *AuthDiscussionHandler) ListDiscussions(c *gin.Context) {
	token := h.optionalToken(c)
	items, err := h.gh.ListDiscussions(c.Request.Context(), token)
	if err != nil {
		response.Fail(c, http.StatusBadGateway, "DISCUSSIONS_LIST_FAILED", err.Error())
		return
	}
	response.OK(c, items)
}

func (h *AuthDiscussionHandler) GetDiscussion(c *gin.Context) {
	n, err := strconv.Atoi(c.Param("number"))
	if err != nil || n <= 0 {
		response.BadRequest(c, "INVALID_NUMBER", "Invalid discussion number")
		return
	}
	token := h.optionalToken(c)
	item, err := h.gh.GetDiscussion(c.Request.Context(), token, n)
	if err != nil {
		response.Fail(c, http.StatusBadGateway, "DISCUSSION_GET_FAILED", err.Error())
		return
	}
	response.OK(c, item)
}

type createDiscussionBody struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}

func (h *AuthDiscussionHandler) CreateDiscussion(c *gin.Context) {
	p, ok := h.requireSession(c)
	if !ok {
		return
	}
	var in createDiscussionBody
	if err := c.ShouldBindJSON(&in); err != nil {
		response.BadRequest(c, "INVALID_BODY", "Expected title and body")
		return
	}
	in.Title = strings.TrimSpace(in.Title)
	in.Body = strings.TrimSpace(in.Body)
	if in.Title == "" || in.Body == "" {
		response.BadRequest(c, "INVALID_BODY", "Title and body are required")
		return
	}
	item, err := h.gh.CreateDiscussion(c.Request.Context(), p.AccessToken, in.Title, in.Body)
	if err != nil {
		response.Fail(c, http.StatusBadGateway, "DISCUSSION_CREATE_FAILED", err.Error())
		return
	}
	response.OK(c, item)
}

type createCommentBody struct {
	Body string `json:"body"`
}

func (h *AuthDiscussionHandler) CreateComment(c *gin.Context) {
	p, ok := h.requireSession(c)
	if !ok {
		return
	}
	n, err := strconv.Atoi(c.Param("number"))
	if err != nil || n <= 0 {
		response.BadRequest(c, "INVALID_NUMBER", "Invalid discussion number")
		return
	}
	var in createCommentBody
	if err := c.ShouldBindJSON(&in); err != nil {
		response.BadRequest(c, "INVALID_BODY", "Expected body")
		return
	}
	in.Body = strings.TrimSpace(in.Body)
	if in.Body == "" {
		response.BadRequest(c, "INVALID_BODY", "Body is required")
		return
	}
	detail, err := h.gh.GetDiscussion(c.Request.Context(), p.AccessToken, n)
	if err != nil {
		response.Fail(c, http.StatusBadGateway, "DISCUSSION_GET_FAILED", err.Error())
		return
	}
	comment, err := h.gh.AddComment(c.Request.Context(), p.AccessToken, detail.ID, in.Body)
	if err != nil {
		response.Fail(c, http.StatusBadGateway, "COMMENT_CREATE_FAILED", err.Error())
		return
	}
	response.OK(c, comment)
}

func (h *AuthDiscussionHandler) requireSession(c *gin.Context) (session.Payload, bool) {
	p, err := h.store.FromRequest(c.Request)
	if err != nil {
		response.Fail(c, http.StatusUnauthorized, "UNAUTHORIZED", "GitHub login required")
		return session.Payload{}, false
	}
	return p, true
}

func (h *AuthDiscussionHandler) optionalToken(c *gin.Context) string {
	if p, err := h.store.FromRequest(c.Request); err == nil {
		return p.AccessToken
	}
	return ""
}

func (h *AuthDiscussionHandler) safeReturnTo(raw string) string {
	fallback := strings.TrimRight(h.cfg.Frontend.Origin, "/") + "/LABA/community"
	raw = strings.TrimSpace(raw)
	if raw == "" {
		return fallback
	}
	u, err := url.Parse(raw)
	if err != nil || u.Scheme == "" || u.Host == "" {
		return fallback
	}
	origin, err := url.Parse(h.cfg.Frontend.Origin)
	if err != nil {
		return fallback
	}
	if !strings.EqualFold(u.Scheme, origin.Scheme) || !strings.EqualFold(u.Host, origin.Host) {
		return fallback
	}
	return u.String()
}

func randomState() string {
	b := make([]byte, 16)
	_, _ = rand.Read(b)
	return hex.EncodeToString(b)
}
