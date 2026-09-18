package session

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"
)

const CookieName = "laba_gh_session"

type User struct {
	Login     string `json:"login"`
	Name      string `json:"name,omitempty"`
	AvatarURL string `json:"avatarUrl"`
	HTMLURL   string `json:"htmlUrl"`
}

type Payload struct {
	AccessToken string    `json:"accessToken"`
	User        User      `json:"user"`
	ExpiresAt   time.Time `json:"expiresAt"`
}

type Store struct {
	secret []byte
	secure bool
}

func NewStore(secret string, secure bool) (*Store, error) {
	if strings.TrimSpace(secret) == "" {
		return nil, errors.New("SESSION_SECRET is required")
	}
	return &Store{secret: []byte(secret), secure: secure}, nil
}

func (s *Store) Encode(p Payload) (string, error) {
	raw, err := json.Marshal(p)
	if err != nil {
		return "", err
	}
	body := base64.RawURLEncoding.EncodeToString(raw)
	sig := s.sign(body)
	return body + "." + sig, nil
}

func (s *Store) Decode(value string) (Payload, error) {
	var zero Payload
	parts := strings.Split(value, ".")
	if len(parts) != 2 {
		return zero, errors.New("invalid session")
	}
	body, sig := parts[0], parts[1]
	if !hmac.Equal([]byte(sig), []byte(s.sign(body))) {
		return zero, errors.New("invalid session signature")
	}
	raw, err := base64.RawURLEncoding.DecodeString(body)
	if err != nil {
		return zero, err
	}
	var p Payload
	if err := json.Unmarshal(raw, &p); err != nil {
		return zero, err
	}
	if time.Now().After(p.ExpiresAt) {
		return zero, errors.New("session expired")
	}
	if p.AccessToken == "" || p.User.Login == "" {
		return zero, errors.New("incomplete session")
	}
	return p, nil
}

func (s *Store) sign(body string) string {
	mac := hmac.New(sha256.New, s.secret)
	_, _ = mac.Write([]byte(body))
	return base64.RawURLEncoding.EncodeToString(mac.Sum(nil))
}

func (s *Store) SetCookie(w http.ResponseWriter, value string, maxAge time.Duration) {
	http.SetCookie(w, &http.Cookie{
		Name:     CookieName,
		Value:    value,
		Path:     "/",
		HttpOnly: true,
		Secure:   s.secure,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   int(maxAge.Seconds()),
	})
}

func (s *Store) ClearCookie(w http.ResponseWriter) {
	http.SetCookie(w, &http.Cookie{
		Name:     CookieName,
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		Secure:   s.secure,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   -1,
	})
}

func (s *Store) FromRequest(r *http.Request) (Payload, error) {
	c, err := r.Cookie(CookieName)
	if err != nil {
		return Payload{}, err
	}
	return s.Decode(c.Value)
}

func (s *Store) MustEncode(p Payload) string {
	v, err := s.Encode(p)
	if err != nil {
		panic(fmt.Sprintf("session encode: %v", err))
	}
	return v
}
