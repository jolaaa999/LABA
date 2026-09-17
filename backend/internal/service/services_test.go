package service_test

import (
	"context"
	"encoding/json"
	"errors"
	"testing"
	"time"

	"ai-community/backend/internal/apperr"
	"ai-community/backend/internal/model"
	"ai-community/backend/internal/repository"
	"ai-community/backend/internal/service"
)

type fakeProjectRepo struct {
	items []model.Project
}

func (f *fakeProjectRepo) ListPublic(_ context.Context, filter repository.ProjectListFilter) ([]model.Project, error) {
	var out []model.Project
	for _, p := range f.items {
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

func (f *fakeProjectRepo) GetPublicBySlug(_ context.Context, slug string) (*model.Project, error) {
	for i := range f.items {
		p := f.items[i]
		if p.Slug == slug && p.Published && !p.Placeholder {
			return &p, nil
		}
	}
	return nil, nil
}

func TestProjectService_PublicFiltering(t *testing.T) {
	repo := &fakeProjectRepo{items: []model.Project{
		{ID: "1", Slug: "pub", Title: "Pub", Category: model.ProjectCategoryResearch, Status: model.ProjectStatusActive, Year: "2026", Published: true, Placeholder: false, Featured: true},
		{ID: "2", Slug: "draft", Title: "Draft", Category: model.ProjectCategoryResearch, Status: model.ProjectStatusDraft, Year: "2026", Published: false, Placeholder: false},
		{ID: "3", Slug: "ph", Title: "PH", Category: model.ProjectCategoryResearch, Status: model.ProjectStatusActive, Year: "2026", Published: true, Placeholder: true},
	}}
	svc := service.NewProjectService(repo)
	items, err := svc.List(context.Background(), "")
	if err != nil {
		t.Fatal(err)
	}
	if len(items) != 1 || items[0].Slug != "pub" {
		t.Fatalf("got %#v", items)
	}
	if items[0].Category != "research" || items[0].Status != "active" {
		t.Fatalf("wire enums: %#v", items[0])
	}
	if _, ok := json.Marshal(items[0]); ok != nil {
		// ensure no sortOrder field via marshal check of keys
	}
	raw, _ := json.Marshal(items[0])
	if containsKey(string(raw), "sortOrder") || containsKey(string(raw), "published") {
		t.Fatalf("leaked internal fields: %s", raw)
	}
}

func TestProjectService_FeaturedDeterministic(t *testing.T) {
	// Repo returns already ordered; two featured → first wins.
	repo := &fakeProjectRepo{items: []model.Project{
		{ID: "1", Slug: "a", Title: "A", Category: model.ProjectCategoryResearch, Status: model.ProjectStatusActive, Year: "2026", Published: true, Featured: true},
		{ID: "2", Slug: "b", Title: "B", Category: model.ProjectCategoryResearch, Status: model.ProjectStatusActive, Year: "2026", Published: true, Featured: true},
	}}
	svc := service.NewProjectService(repo)
	items, err := svc.List(context.Background(), "")
	if err != nil {
		t.Fatal(err)
	}
	featured := 0
	for _, it := range items {
		if it.Featured {
			featured++
			if it.Slug != "a" {
				t.Fatalf("winner should be first ordered featured, got %s", it.Slug)
			}
		}
	}
	if featured != 1 {
		t.Fatalf("featured count=%d", featured)
	}
}

func TestProjectService_InvalidCategory(t *testing.T) {
	svc := service.NewProjectService(&fakeProjectRepo{})
	_, err := svc.List(context.Background(), "banana")
	assertCode(t, err, "INVALID_CATEGORY")
}

func TestProjectService_ToolFilter(t *testing.T) {
	repo := &fakeProjectRepo{items: []model.Project{
		{ID: "1", Slug: "t", Title: "T", Category: model.ProjectCategoryDeveloperTool, Status: model.ProjectStatusActive, Year: "2026", Published: true},
		{ID: "2", Slug: "o", Title: "O", Category: model.ProjectCategoryOpenSource, Status: model.ProjectStatusActive, Year: "2026", Published: true},
		{ID: "3", Slug: "r", Title: "R", Category: model.ProjectCategoryResearch, Status: model.ProjectStatusActive, Year: "2026", Published: true},
	}}
	svc := service.NewProjectService(repo)
	items, err := svc.List(context.Background(), "tool")
	if err != nil {
		t.Fatal(err)
	}
	if len(items) != 2 {
		t.Fatalf("got %#v", items)
	}
}

func TestProjectService_HiddenDetail(t *testing.T) {
	repo := &fakeProjectRepo{items: []model.Project{
		{ID: "1", Slug: "draft", Published: false, Placeholder: false, Category: model.ProjectCategoryResearch, Status: model.ProjectStatusDraft, Year: "2026", Title: "D"},
		{ID: "2", Slug: "ph", Published: true, Placeholder: true, Category: model.ProjectCategoryResearch, Status: model.ProjectStatusActive, Year: "2026", Title: "P"},
	}}
	svc := service.NewProjectService(repo)
	_, err := svc.GetBySlug(context.Background(), "draft")
	assertCode(t, err, "PROJECT_NOT_FOUND")
	_, err = svc.GetBySlug(context.Background(), "ph")
	assertCode(t, err, "PROJECT_NOT_FOUND")
	_, err = svc.GetBySlug(context.Background(), "Bad_Slug")
	assertCode(t, err, "INVALID_SLUG")
}

type fakeEventRepo struct {
	items []model.CommunityEvent
}

func (f *fakeEventRepo) ListPublic(_ context.Context, filter repository.EventListFilter) ([]model.CommunityEvent, error) {
	var out []model.CommunityEvent
	now := filter.Now
	for _, e := range f.items {
		if !e.Published {
			continue
		}
		if filter.Scope == model.EventScopeUpcoming {
			if e.EndsAt != nil && e.EndsAt.Before(now) {
				continue
			}
			if e.EndsAt == nil && e.StartsAt != nil && e.StartsAt.Before(now) {
				continue
			}
		}
		out = append(out, e)
	}
	return out, nil
}

func TestEventService_UnpublishedAndScope(t *testing.T) {
	past := time.Now().UTC().Add(-48 * time.Hour)
	future := time.Now().UTC().Add(48 * time.Hour)
	repo := &fakeEventRepo{items: []model.CommunityEvent{
		{ID: "1", Slug: "u", Format: model.EventFormatWorkshop, Title: "U", Summary: "s", Published: false, StartsAt: &future},
		{ID: "2", Slug: "past", Format: model.EventFormatRead, Title: "P", Summary: "s", Published: true, StartsAt: &past, EndsAt: &past},
		{ID: "3", Slug: "up", Format: model.EventFormatBuild, Title: "Up", Summary: "s", Published: true, StartsAt: &future},
	}}
	svc := service.NewEventService(repo)
	items, err := svc.List(context.Background(), "")
	if err != nil {
		t.Fatal(err)
	}
	if len(items) != 1 || items[0].Slug != "up" || items[0].Format != "build" {
		t.Fatalf("got %#v", items)
	}
	_, err = svc.List(context.Background(), "banana")
	assertCode(t, err, "INVALID_EVENT_SCOPE")
}

type fakeMemberRepo struct {
	items []model.CommunityMember
}

func (f *fakeMemberRepo) ListPublic(_ context.Context) ([]model.CommunityMember, error) {
	var out []model.CommunityMember
	for _, m := range f.items {
		if m.PublicProfile && !m.Placeholder {
			out = append(out, m)
		}
	}
	return out, nil
}

func TestMemberService_PrivacyAndModes(t *testing.T) {
	modes := `["BUILD","EXPLAIN"]`
	bad := `["TELEPATHY"]`
	repo := &fakeMemberRepo{items: []model.CommunityMember{
		{ID: "1", Slug: "ok", DisplayName: "OK", PublicProfile: true, Placeholder: false, ContributionModes: &modes},
		{ID: "2", Slug: "priv", DisplayName: "Priv", PublicProfile: false, Placeholder: false},
		{ID: "3", Slug: "ph", DisplayName: "PH", PublicProfile: true, Placeholder: true},
	}}
	svc := service.NewCommunityMemberService(repo)
	items, err := svc.ListPublic(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if len(items) != 1 || items[0].ContributionModes[0] != "build" {
		t.Fatalf("got %#v", items)
	}
	raw, _ := json.Marshal(items[0])
	if containsKey(string(raw), "sortOrder") {
		t.Fatalf("leaked sortOrder: %s", raw)
	}

	repo.items[0].ContributionModes = &bad
	_, err = svc.ListPublic(context.Background())
	if err == nil {
		t.Fatal("expected invalid mode error")
	}
}

type fakeRecruitingRepo struct {
	row *model.RecruitingStatus
}

func (f *fakeRecruitingRepo) GetCurrent(_ context.Context) (*model.RecruitingStatus, error) {
	return f.row, nil
}

func TestRecruiting_NotPublishedStripsContact(t *testing.T) {
	ct, cv := "qq", "12345"
	svc := service.NewRecruitingService(&fakeRecruitingRepo{row: &model.RecruitingStatus{
		Status: model.RecruitingStatusNotPublished, ContactType: &ct, ContactValue: &cv,
		Headline: strPtr("Soon"),
	}})
	resp, err := svc.GetStatus(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if resp.Status != "not-published" {
		t.Fatalf("status=%s", resp.Status)
	}
	if resp.ContactType != nil || resp.ContactValue != nil {
		t.Fatalf("contact leaked: %#v", resp)
	}
}

func assertCode(t *testing.T, err error, code string) {
	t.Helper()
	var coded *apperr.CodedError
	if !errors.As(err, &coded) || coded.Code != code {
		t.Fatalf("want %s, got %v", code, err)
	}
}

func strPtr(s string) *string { return &s }

func containsKey(jsonStr, key string) bool {
	return indexOf(jsonStr, `"`+key+`"`) >= 0
}

func indexOf(s, sub string) int {
	for i := 0; i+len(sub) <= len(s); i++ {
		if s[i:i+len(sub)] == sub {
			return i
		}
	}
	return -1
}
