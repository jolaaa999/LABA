package handler_test

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"ai-community/backend/internal/config"
	"ai-community/backend/internal/http/handler"
	"ai-community/backend/internal/http/router"
	"ai-community/backend/internal/model"
	"ai-community/backend/internal/repository"
	"ai-community/backend/internal/service"

	"github.com/gin-gonic/gin"
)

type memProjectRepo struct {
	items []model.Project
}

func (m *memProjectRepo) ListPublic(_ context.Context, filter repository.ProjectListFilter) ([]model.Project, error) {
	var out []model.Project
	for _, p := range m.items {
		if !p.Published || p.Placeholder {
			continue
		}
		if filter.ToolFilter {
			if p.Category != model.ProjectCategoryDeveloperTool && p.Category != model.ProjectCategoryOpenSource {
				continue
			}
		} else if filter.Category != nil && p.Category != *filter.Category {
			continue
		}
		out = append(out, p)
	}
	return out, nil
}

func (m *memProjectRepo) GetPublicBySlug(_ context.Context, slug string) (*model.Project, error) {
	for i := range m.items {
		if m.items[i].Slug == slug && m.items[i].Published && !m.items[i].Placeholder {
			return &m.items[i], nil
		}
	}
	return nil, nil
}

type memEventRepo struct {
	items []model.CommunityEvent
}

func (m *memEventRepo) ListPublic(_ context.Context, filter repository.EventListFilter) ([]model.CommunityEvent, error) {
	var out []model.CommunityEvent
	for _, e := range m.items {
		if !e.Published {
			continue
		}
		if filter.Scope == model.EventScopeUpcoming {
			if e.EndsAt != nil && e.EndsAt.Before(filter.Now) {
				continue
			}
		}
		out = append(out, e)
	}
	return out, nil
}

type memMemberRepo struct {
	items []model.CommunityMember
}

func (m *memMemberRepo) ListPublic(_ context.Context) ([]model.CommunityMember, error) {
	var out []model.CommunityMember
	for _, x := range m.items {
		if x.PublicProfile && !x.Placeholder {
			out = append(out, x)
		}
	}
	return out, nil
}

type memRecruitingRepo struct {
	row *model.RecruitingStatus
}

func (m *memRecruitingRepo) GetCurrent(_ context.Context) (*model.RecruitingStatus, error) {
	if m.row != nil {
		return m.row, nil
	}
	return &model.RecruitingStatus{Status: model.RecruitingStatusNotPublished}, nil
}

func testEngine(projects []model.Project, events []model.CommunityEvent, members []model.CommunityMember, recruiting *model.RecruitingStatus) *gin.Engine {
	gin.SetMode(gin.TestMode)
	cfg := &config.Config{
		CORS: config.CORSConfig{AllowedOrigins: []string{"http://localhost:5173"}},
	}
	return router.New(router.Deps{
		Config:     cfg,
		Health:     handler.NewHealthHandler(nil),
		Projects:   handler.NewProjectHandler(service.NewProjectService(&memProjectRepo{items: projects})),
		Events:     handler.NewEventHandler(service.NewEventService(&memEventRepo{items: events})),
		Community:  handler.NewCommunityHandler(service.NewCommunityMemberService(&memMemberRepo{items: members})),
		Recruiting: handler.NewRecruitingHandler(service.NewRecruitingService(&memRecruitingRepo{row: recruiting})),
	})
}

func decodeData(t *testing.T, w *httptest.ResponseRecorder) map[string]any {
	t.Helper()
	var body map[string]any
	if err := json.Unmarshal(w.Body.Bytes(), &body); err != nil {
		t.Fatal(err)
	}
	return body
}

func TestHealthEnvelope(t *testing.T) {
	r := testEngine(nil, nil, nil, nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, httptest.NewRequest(http.MethodGet, "/api/v1/health", nil))
	if w.Code != 200 {
		t.Fatal(w.Body.String())
	}
	body := decodeData(t, w)
	if _, ok := body["data"]; !ok {
		t.Fatalf("missing data envelope: %v", body)
	}
}

func TestProjectsEmpty(t *testing.T) {
	r := testEngine(nil, nil, nil, nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, httptest.NewRequest(http.MethodGet, "/api/v1/projects", nil))
	if w.Code != 200 {
		t.Fatal(w.Body.String())
	}
	body := decodeData(t, w)
	arr := body["data"].([]any)
	if len(arr) != 0 {
		t.Fatalf("%v", arr)
	}
}

func TestProjectsPublicFiltering(t *testing.T) {
	r := testEngine([]model.Project{
		{ID: "1", Slug: "ok", Title: "OK", Summary: "s", Category: model.ProjectCategoryResearch, Year: "2026", Status: model.ProjectStatusActive, Published: true},
		{ID: "2", Slug: "draft", Title: "D", Summary: "s", Category: model.ProjectCategoryResearch, Year: "2026", Status: model.ProjectStatusDraft, Published: false},
		{ID: "3", Slug: "ph", Title: "P", Summary: "s", Category: model.ProjectCategoryResearch, Year: "2026", Status: model.ProjectStatusActive, Published: true, Placeholder: true},
	}, nil, nil, nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, httptest.NewRequest(http.MethodGet, "/api/v1/projects", nil))
	body := decodeData(t, w)
	arr := body["data"].([]any)
	if len(arr) != 1 {
		t.Fatalf("%v", arr)
	}
	item := arr[0].(map[string]any)
	if item["category"] != "research" || item["status"] != "active" {
		t.Fatalf("%v", item)
	}
	if _, ok := item["sortOrder"]; ok {
		t.Fatal("sortOrder must not be public")
	}
}

func TestProjectDetailSuccessAndHidden(t *testing.T) {
	r := testEngine([]model.Project{
		{ID: "1", Slug: "ok-project", Title: "OK", Summary: "s", Category: model.ProjectCategoryAIEngineering, Year: "2026", Status: model.ProjectStatusActive, Published: true, Featured: true},
		{ID: "2", Slug: "hidden", Title: "H", Summary: "s", Category: model.ProjectCategoryAIEngineering, Year: "2026", Status: model.ProjectStatusDraft, Published: false},
	}, nil, nil, nil)

	w := httptest.NewRecorder()
	r.ServeHTTP(w, httptest.NewRequest(http.MethodGet, "/api/v1/projects/ok-project", nil))
	if w.Code != 200 {
		t.Fatal(w.Body.String())
	}
	body := decodeData(t, w)
	data := body["data"].(map[string]any)
	if data["persona"] != "engineering" || data["category"] != "ai-engineering" {
		t.Fatalf("%v", data)
	}

	w = httptest.NewRecorder()
	r.ServeHTTP(w, httptest.NewRequest(http.MethodGet, "/api/v1/projects/hidden", nil))
	if w.Code != 404 {
		t.Fatal(w.Body.String())
	}
	errBody := decodeData(t, w)["error"].(map[string]any)
	if errBody["code"] != "PROJECT_NOT_FOUND" {
		t.Fatalf("%v", errBody)
	}
}

func TestInvalidCategoryAndSlug(t *testing.T) {
	r := testEngine(nil, nil, nil, nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, httptest.NewRequest(http.MethodGet, "/api/v1/projects?category=banana", nil))
	if w.Code != 400 {
		t.Fatal(w.Body.String())
	}
	w = httptest.NewRecorder()
	r.ServeHTTP(w, httptest.NewRequest(http.MethodGet, "/api/v1/projects/Not_Valid", nil))
	if w.Code != 400 {
		t.Fatal(w.Body.String())
	}
}

func TestEventsEmptyAndUnpublished(t *testing.T) {
	future := time.Now().UTC().Add(24 * time.Hour)
	r := testEngine(nil, []model.CommunityEvent{
		{ID: "1", Slug: "draft", Title: "D", Format: model.EventFormatWorkshop, Summary: "s", Published: false, StartsAt: &future},
	}, nil, nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, httptest.NewRequest(http.MethodGet, "/api/v1/events", nil))
	if w.Code != 200 {
		t.Fatal(w.Body.String())
	}
	arr := decodeData(t, w)["data"].([]any)
	if len(arr) != 0 {
		t.Fatalf("%v", arr)
	}
	w = httptest.NewRecorder()
	r.ServeHTTP(w, httptest.NewRequest(http.MethodGet, "/api/v1/events?scope=nope", nil))
	if w.Code != 400 {
		t.Fatal(w.Body.String())
	}
}

func TestMembersPrivacy(t *testing.T) {
	modes := `["BUILD"]`
	r := testEngine(nil, nil, []model.CommunityMember{
		{ID: "1", Slug: "ok", DisplayName: "OK", PublicProfile: true, Placeholder: false, ContributionModes: &modes},
		{ID: "2", Slug: "priv", DisplayName: "P", PublicProfile: false},
		{ID: "3", Slug: "ph", DisplayName: "PH", PublicProfile: true, Placeholder: true},
	}, nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, httptest.NewRequest(http.MethodGet, "/api/v1/community/members", nil))
	arr := decodeData(t, w)["data"].([]any)
	if len(arr) != 1 {
		t.Fatalf("%v", arr)
	}
	item := arr[0].(map[string]any)
	modesArr := item["contributionModes"].([]any)
	if modesArr[0] != "build" {
		t.Fatalf("%v", item)
	}
}

func TestRecruitingNotPublishedNoContact(t *testing.T) {
	ct, cv := "qq", "999"
	r := testEngine(nil, nil, nil, &model.RecruitingStatus{
		Status: model.RecruitingStatusNotPublished, ContactType: &ct, ContactValue: &cv,
	})
	w := httptest.NewRecorder()
	r.ServeHTTP(w, httptest.NewRequest(http.MethodGet, "/api/v1/recruiting/status", nil))
	data := decodeData(t, w)["data"].(map[string]any)
	if data["status"] != "not-published" {
		t.Fatalf("%v", data)
	}
	if _, ok := data["contactValue"]; ok {
		t.Fatal("contact leaked")
	}
	if _, ok := data["contactType"]; ok {
		t.Fatal("contact leaked")
	}
}
