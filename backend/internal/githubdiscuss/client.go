package githubdiscuss

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"sync"
	"time"
)

const (
	oauthAuthorizeURL = "https://github.com/login/oauth/authorize"
	oauthTokenURL     = "https://github.com/login/oauth/access_token"
	apiURL            = "https://api.github.com/graphql"
	userURL           = "https://api.github.com/user"
)

type Config struct {
	ClientID     string
	ClientSecret string
	RedirectURL  string
	Owner        string
	Repo         string
	RepoID       string
	QACategoryID string
}

type Client struct {
	cfg        Config
	http       *http.Client
	mu         sync.Mutex
	repoID     string
	qaCategory string
}

func New(cfg Config) *Client {
	return &Client{
		cfg: cfg,
		http: &http.Client{
			Timeout: 20 * time.Second,
		},
		repoID:     strings.TrimSpace(cfg.RepoID),
		qaCategory: strings.TrimSpace(cfg.QACategoryID),
	}
}

func (c *Client) AuthorizeURL(state string) string {
	q := url.Values{}
	q.Set("client_id", c.cfg.ClientID)
	q.Set("redirect_uri", c.cfg.RedirectURL)
	q.Set("scope", "read:user public_repo")
	q.Set("state", state)
	return oauthAuthorizeURL + "?" + q.Encode()
}

type TokenResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	Scope       string `json:"scope"`
	Error       string `json:"error"`
	ErrorDesc   string `json:"error_description"`
}

func (c *Client) ExchangeCode(ctx context.Context, code string) (string, error) {
	form := url.Values{}
	form.Set("client_id", c.cfg.ClientID)
	form.Set("client_secret", c.cfg.ClientSecret)
	form.Set("code", code)
	form.Set("redirect_uri", c.cfg.RedirectURL)

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, oauthTokenURL, strings.NewReader(form.Encode()))
	if err != nil {
		return "", err
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	res, err := c.http.Do(req)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)
	var tr TokenResponse
	if err := json.Unmarshal(body, &tr); err != nil {
		return "", err
	}
	if tr.Error != "" || tr.AccessToken == "" {
		return "", fmt.Errorf("oauth token: %s %s", tr.Error, tr.ErrorDesc)
	}
	return tr.AccessToken, nil
}

type User struct {
	Login     string `json:"login"`
	Name      string `json:"name"`
	AvatarURL string `json:"avatar_url"`
	HTMLURL   string `json:"html_url"`
}

func (c *Client) FetchUser(ctx context.Context, token string) (User, error) {
	var zero User
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, userURL, nil)
	if err != nil {
		return zero, err
	}
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Accept", "application/vnd.github+json")
	res, err := c.http.Do(req)
	if err != nil {
		return zero, err
	}
	defer res.Body.Close()
	if res.StatusCode >= 300 {
		b, _ := io.ReadAll(res.Body)
		return zero, fmt.Errorf("github user: %s", strings.TrimSpace(string(b)))
	}
	var u User
	if err := json.NewDecoder(res.Body).Decode(&u); err != nil {
		return zero, err
	}
	return u, nil
}

type Author struct {
	Login     string `json:"login"`
	AvatarURL string `json:"avatarUrl"`
}

type Discussion struct {
	ID           string    `json:"id"`
	Number       int       `json:"number"`
	Title        string    `json:"title"`
	Body         string    `json:"body"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
	URL          string    `json:"url"`
	Author       *Author   `json:"author"`
	CategoryName string    `json:"categoryName"`
	CategorySlug string    `json:"categorySlug"`
	CommentCount int       `json:"commentCount"`
	Answered     bool      `json:"answered"`
}

type Comment struct {
	ID        string    `json:"id"`
	Body      string    `json:"body"`
	CreatedAt time.Time `json:"createdAt"`
	Author    *Author   `json:"author"`
	IsAnswer  bool      `json:"isAnswer"`
}

type DiscussionDetail struct {
	Discussion
	Comments []Comment `json:"comments"`
}

func (c *Client) EnsureIDs(ctx context.Context, token string) error {
	c.mu.Lock()
	defer c.mu.Unlock()
	if c.repoID != "" && c.qaCategory != "" {
		return nil
	}
	query := `
query($owner:String!,$name:String!){
  repository(owner:$owner,name:$name){
    id
    discussionCategories(first:20){nodes{id name slug isAnswerable}}
  }
}`
	var out struct {
		Repository struct {
			ID                   string `json:"id"`
			DiscussionCategories struct {
				Nodes []struct {
					ID           string `json:"id"`
					Name         string `json:"name"`
					Slug         string `json:"slug"`
					IsAnswerable bool   `json:"isAnswerable"`
				} `json:"nodes"`
			} `json:"discussionCategories"`
		} `json:"repository"`
	}
	if err := c.graphql(ctx, token, query, map[string]any{
		"owner": c.cfg.Owner,
		"name":  c.cfg.Repo,
	}, &out); err != nil {
		return err
	}
	if out.Repository.ID == "" {
		return fmt.Errorf("repository not found")
	}
	c.repoID = out.Repository.ID
	for _, n := range out.Repository.DiscussionCategories.Nodes {
		if n.Slug == "q-a" || n.IsAnswerable {
			c.qaCategory = n.ID
			break
		}
	}
	if c.qaCategory == "" && len(out.Repository.DiscussionCategories.Nodes) > 0 {
		c.qaCategory = out.Repository.DiscussionCategories.Nodes[0].ID
	}
	if c.qaCategory == "" {
		return fmt.Errorf("no discussion category found")
	}
	return nil
}

func (c *Client) ListDiscussions(ctx context.Context, token string) ([]Discussion, error) {
	query := `
query($owner:String!,$name:String!){
  repository(owner:$owner,name:$name){
    discussions(first:30, orderBy:{field:UPDATED_AT, direction:DESC}){
      nodes{
        id number title body createdAt updatedAt url
        author{login avatarUrl}
        category{name slug}
        comments{totalCount}
        answer{id}
      }
    }
  }
}`
	var out struct {
		Repository struct {
			Discussions struct {
				Nodes []struct {
					ID        string    `json:"id"`
					Number    int       `json:"number"`
					Title     string    `json:"title"`
					Body      string    `json:"body"`
					CreatedAt time.Time `json:"createdAt"`
					UpdatedAt time.Time `json:"updatedAt"`
					URL       string    `json:"url"`
					Author    *Author   `json:"author"`
					Category  struct {
						Name string `json:"name"`
						Slug string `json:"slug"`
					} `json:"category"`
					Comments struct {
						TotalCount int `json:"totalCount"`
					} `json:"comments"`
					Answer *struct {
						ID string `json:"id"`
					} `json:"answer"`
				} `json:"nodes"`
			} `json:"discussions"`
		} `json:"repository"`
	}
	if err := c.graphql(ctx, token, query, map[string]any{
		"owner": c.cfg.Owner,
		"name":  c.cfg.Repo,
	}, &out); err != nil {
		return nil, err
	}
	items := make([]Discussion, 0, len(out.Repository.Discussions.Nodes))
	for _, n := range out.Repository.Discussions.Nodes {
		items = append(items, Discussion{
			ID:           n.ID,
			Number:       n.Number,
			Title:        n.Title,
			Body:         n.Body,
			CreatedAt:    n.CreatedAt,
			UpdatedAt:    n.UpdatedAt,
			URL:          n.URL,
			Author:       n.Author,
			CategoryName: n.Category.Name,
			CategorySlug: n.Category.Slug,
			CommentCount: n.Comments.TotalCount,
			Answered:     n.Answer != nil,
		})
	}
	return items, nil
}

func (c *Client) GetDiscussion(ctx context.Context, token string, number int) (DiscussionDetail, error) {
	var zero DiscussionDetail
	query := `
query($owner:String!,$name:String!,$number:Int!){
  repository(owner:$owner,name:$name){
    discussion(number:$number){
      id number title body createdAt updatedAt url
      author{login avatarUrl}
      category{name slug}
      comments(first:50){
        totalCount
        nodes{
          id body createdAt
          author{login avatarUrl}
          isAnswer
        }
      }
      answer{id}
    }
  }
}`
	var out struct {
		Repository struct {
			Discussion *struct {
				ID        string    `json:"id"`
				Number    int       `json:"number"`
				Title     string    `json:"title"`
				Body      string    `json:"body"`
				CreatedAt time.Time `json:"createdAt"`
				UpdatedAt time.Time `json:"updatedAt"`
				URL       string    `json:"url"`
				Author    *Author   `json:"author"`
				Category  struct {
					Name string `json:"name"`
					Slug string `json:"slug"`
				} `json:"category"`
				Comments struct {
					TotalCount int `json:"totalCount"`
					Nodes      []struct {
						ID        string    `json:"id"`
						Body      string    `json:"body"`
						CreatedAt time.Time `json:"createdAt"`
						Author    *Author   `json:"author"`
						IsAnswer  bool      `json:"isAnswer"`
					} `json:"nodes"`
				} `json:"comments"`
				Answer *struct {
					ID string `json:"id"`
				} `json:"answer"`
			} `json:"discussion"`
		} `json:"repository"`
	}
	if err := c.graphql(ctx, token, query, map[string]any{
		"owner":  c.cfg.Owner,
		"name":   c.cfg.Repo,
		"number": number,
	}, &out); err != nil {
		return zero, err
	}
	d := out.Repository.Discussion
	if d == nil {
		return zero, fmt.Errorf("discussion not found")
	}
	comments := make([]Comment, 0, len(d.Comments.Nodes))
	for _, n := range d.Comments.Nodes {
		comments = append(comments, Comment{
			ID:        n.ID,
			Body:      n.Body,
			CreatedAt: n.CreatedAt,
			Author:    n.Author,
			IsAnswer:  n.IsAnswer,
		})
	}
	return DiscussionDetail{
		Discussion: Discussion{
			ID:           d.ID,
			Number:       d.Number,
			Title:        d.Title,
			Body:         d.Body,
			CreatedAt:    d.CreatedAt,
			UpdatedAt:    d.UpdatedAt,
			URL:          d.URL,
			Author:       d.Author,
			CategoryName: d.Category.Name,
			CategorySlug: d.Category.Slug,
			CommentCount: d.Comments.TotalCount,
			Answered:     d.Answer != nil,
		},
		Comments: comments,
	}, nil
}

func (c *Client) CreateDiscussion(ctx context.Context, token, title, body string) (Discussion, error) {
	var zero Discussion
	if err := c.EnsureIDs(ctx, token); err != nil {
		return zero, err
	}
	c.mu.Lock()
	repoID, catID := c.repoID, c.qaCategory
	c.mu.Unlock()

	mutation := `
mutation($repo:ID!,$cat:ID!,$title:String!,$body:String!){
  createDiscussion(input:{repositoryId:$repo,categoryId:$cat,title:$title,body:$body}){
    discussion{
      id number title body createdAt updatedAt url
      author{login avatarUrl}
      category{name slug}
      comments{totalCount}
    }
  }
}`
	var out struct {
		CreateDiscussion struct {
			Discussion struct {
				ID        string    `json:"id"`
				Number    int       `json:"number"`
				Title     string    `json:"title"`
				Body      string    `json:"body"`
				CreatedAt time.Time `json:"createdAt"`
				UpdatedAt time.Time `json:"updatedAt"`
				URL       string    `json:"url"`
				Author    *Author   `json:"author"`
				Category  struct {
					Name string `json:"name"`
					Slug string `json:"slug"`
				} `json:"category"`
				Comments struct {
					TotalCount int `json:"totalCount"`
				} `json:"comments"`
			} `json:"discussion"`
		} `json:"createDiscussion"`
	}
	if err := c.graphql(ctx, token, mutation, map[string]any{
		"repo":  repoID,
		"cat":   catID,
		"title": title,
		"body":  body,
	}, &out); err != nil {
		return zero, err
	}
	d := out.CreateDiscussion.Discussion
	return Discussion{
		ID:           d.ID,
		Number:       d.Number,
		Title:        d.Title,
		Body:         d.Body,
		CreatedAt:    d.CreatedAt,
		UpdatedAt:    d.UpdatedAt,
		URL:          d.URL,
		Author:       d.Author,
		CategoryName: d.Category.Name,
		CategorySlug: d.Category.Slug,
		CommentCount: d.Comments.TotalCount,
	}, nil
}

func (c *Client) AddComment(ctx context.Context, token, discussionID, body string) (Comment, error) {
	var zero Comment
	mutation := `
mutation($id:ID!,$body:String!){
  addDiscussionComment(input:{discussionId:$id,body:$body}){
    comment{
      id body createdAt
      author{login avatarUrl}
      isAnswer
    }
  }
}`
	var out struct {
		AddDiscussionComment struct {
			Comment struct {
				ID        string    `json:"id"`
				Body      string    `json:"body"`
				CreatedAt time.Time `json:"createdAt"`
				Author    *Author   `json:"author"`
				IsAnswer  bool      `json:"isAnswer"`
			} `json:"comment"`
		} `json:"addDiscussionComment"`
	}
	if err := c.graphql(ctx, token, mutation, map[string]any{
		"id":   discussionID,
		"body": body,
	}, &out); err != nil {
		return zero, err
	}
	n := out.AddDiscussionComment.Comment
	return Comment{
		ID:        n.ID,
		Body:      n.Body,
		CreatedAt: n.CreatedAt,
		Author:    n.Author,
		IsAnswer:  n.IsAnswer,
	}, nil
}

func (c *Client) graphql(ctx context.Context, token, query string, variables map[string]any, out any) error {
	payload := map[string]any{"query": query, "variables": variables}
	raw, err := json.Marshal(payload)
	if err != nil {
		return err
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, apiURL, bytes.NewReader(raw))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}
	res, err := c.http.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	if err != nil {
		return err
	}
	var envelope struct {
		Data   json.RawMessage `json:"data"`
		Errors []struct {
			Message string `json:"message"`
		} `json:"errors"`
	}
	if err := json.Unmarshal(body, &envelope); err != nil {
		return err
	}
	if len(envelope.Errors) > 0 {
		return fmt.Errorf("graphql: %s", envelope.Errors[0].Message)
	}
	if res.StatusCode >= 300 {
		return fmt.Errorf("graphql http %d: %s", res.StatusCode, strings.TrimSpace(string(body)))
	}
	if envelope.Data == nil {
		return fmt.Errorf("graphql: empty data")
	}
	return json.Unmarshal(envelope.Data, out)
}
