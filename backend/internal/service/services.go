package service

import (
	"context"
	"encoding/json"
	"strings"
	"time"

	"ai-community/backend/internal/apperr"
	"ai-community/backend/internal/dto"
	"ai-community/backend/internal/model"
	"ai-community/backend/internal/repository"
	"ai-community/backend/internal/wire"
)

type ProjectService struct {
	repo repository.ProjectRepository
}

func NewProjectService(repo repository.ProjectRepository) *ProjectService {
	return &ProjectService{repo: repo}
}

func (s *ProjectService) List(ctx context.Context, categoryQuery string) ([]dto.ProjectListItemResponse, error) {
	domain, toolFilter, ok := wire.ParseProjectCategoryQuery(categoryQuery)
	if !ok {
		return nil, apperr.Invalid("INVALID_CATEGORY", "Invalid project category")
	}
	filter := repository.ProjectListFilter{ToolFilter: toolFilter}
	if domain != "" {
		filter.Category = &domain
	}

	items, err := s.repo.ListPublic(ctx, filter)
	if err != nil {
		return nil, err
	}

	featuredSlug := pickFeaturedSlug(items)
	out := make([]dto.ProjectListItemResponse, 0, len(items))
	for _, p := range items {
		item, err := dto.ToProjectListItem(p, p.Slug == featuredSlug)
		if err != nil {
			return nil, err
		}
		out = append(out, item)
	}
	return out, nil
}

func (s *ProjectService) GetBySlug(ctx context.Context, slug string) (*dto.ProjectDetailResponse, error) {
	slug = strings.TrimSpace(slug)
	if !isValidSlug(slug) {
		return nil, apperr.Invalid("INVALID_SLUG", "Invalid project slug")
	}

	p, err := s.repo.GetPublicBySlug(ctx, slug)
	if err != nil {
		return nil, err
	}
	if p == nil {
		// Same code for missing, unpublished, or placeholder — public resource hiding.
		return nil, apperr.NotFound("PROJECT_NOT_FOUND", "Project not found")
	}

	// Featured on detail: true only if this row is featured; multi-featured invariant
	// is enforced on list. Detail reports stored featured flag for this public row.
	detail, err := dto.ToProjectDetail(*p, p.Featured)
	if err != nil {
		return nil, err
	}
	return &detail, nil
}

// pickFeaturedSlug returns at most one featured winner after list order.
func pickFeaturedSlug(items []model.Project) string {
	for _, p := range items {
		if p.Featured {
			return p.Slug
		}
	}
	return ""
}

func isValidSlug(s string) bool {
	if len(s) == 0 || len(s) > 128 {
		return false
	}
	for _, r := range s {
		if (r >= 'a' && r <= 'z') || (r >= '0' && r <= '9') || r == '-' {
			continue
		}
		return false
	}
	return true
}

type EventService struct {
	repo repository.EventRepository
	now  func() time.Time
}

func NewEventService(repo repository.EventRepository) *EventService {
	return &EventService{repo: repo, now: time.Now}
}

func (s *EventService) List(ctx context.Context, scopeQuery string) ([]dto.EventResponse, error) {
	scope, ok := wire.ParseEventScope(scopeQuery)
	if !ok {
		return nil, apperr.Invalid("INVALID_EVENT_SCOPE", "Invalid event scope")
	}
	items, err := s.repo.ListPublic(ctx, repository.EventListFilter{
		Scope: scope,
		Now:   s.now(),
	})
	if err != nil {
		return nil, err
	}
	out := make([]dto.EventResponse, 0, len(items))
	for _, e := range items {
		item, err := dto.ToEvent(e)
		if err != nil {
			return nil, err
		}
		out = append(out, item)
	}
	return out, nil
}

type CommunityMemberService struct {
	repo repository.CommunityMemberRepository
}

func NewCommunityMemberService(repo repository.CommunityMemberRepository) *CommunityMemberService {
	return &CommunityMemberService{repo: repo}
}

func (s *CommunityMemberService) ListPublic(ctx context.Context) ([]dto.CommunityMemberResponse, error) {
	items, err := s.repo.ListPublic(ctx)
	if err != nil {
		return nil, err
	}
	out := make([]dto.CommunityMemberResponse, 0, len(items))
	for _, m := range items {
		modes, err := parseAndValidateModes(m.ContributionModes)
		if err != nil {
			return nil, apperr.InternalCoded("INVALID_CONTRIBUTION_MODE", "Invalid contribution mode in data store")
		}
		out = append(out, dto.ToCommunityMember(m, modes))
	}
	return out, nil
}

func parseAndValidateModes(raw *string) ([]string, error) {
	if raw == nil || strings.TrimSpace(*raw) == "" {
		return nil, nil
	}
	var modes []string
	if err := json.Unmarshal([]byte(*raw), &modes); err != nil {
		return nil, err
	}
	return wire.ContributionModesWire(modes)
}

type RecruitingService struct {
	repo repository.RecruitingStatusRepository
}

func NewRecruitingService(repo repository.RecruitingStatusRepository) *RecruitingService {
	return &RecruitingService{repo: repo}
}

func (s *RecruitingService) GetStatus(ctx context.Context) (*dto.RecruitingStatusResponse, error) {
	row, err := s.repo.GetCurrent(ctx)
	if err != nil {
		return nil, err
	}
	if row == nil || row.Status != model.RecruitingStatusPublished {
		var headline, description *string
		if row != nil {
			headline = row.Headline
			description = row.Description
		}
		resp := dto.ToRecruitingNotPublished(headline, description)
		return &resp, nil
	}
	// PUBLISHED: contact is optional (offline entry allowed). Never invent values.
	resp := dto.ToRecruitingPublished(*row)
	return &resp, nil
}
