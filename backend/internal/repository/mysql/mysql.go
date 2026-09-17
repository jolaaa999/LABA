package mysql

import (
	"context"
	"errors"

	"ai-community/backend/internal/model"
	"ai-community/backend/internal/repository"

	"gorm.io/gorm"
)

type ProjectRepository struct {
	db *gorm.DB
}

func NewProjectRepository(db *gorm.DB) *ProjectRepository {
	return &ProjectRepository{db: db}
}

var _ repository.ProjectRepository = (*ProjectRepository)(nil)

func (r *ProjectRepository) ListPublic(ctx context.Context, filter repository.ProjectListFilter) ([]model.Project, error) {
	q := r.db.WithContext(ctx).
		Where("published = ? AND placeholder = ?", true, false).
		Order("featured DESC, sort_order ASC, year DESC, title ASC")
	if filter.ToolFilter {
		q = q.Where("category IN ?", []string{
			model.ProjectCategoryDeveloperTool,
			model.ProjectCategoryOpenSource,
		})
	} else if filter.Category != nil {
		q = q.Where("category = ?", *filter.Category)
	}
	var items []model.Project
	if err := q.Find(&items).Error; err != nil {
		return nil, err
	}
	return items, nil
}

func (r *ProjectRepository) GetPublicBySlug(ctx context.Context, slug string) (*model.Project, error) {
	var p model.Project
	err := r.db.WithContext(ctx).
		Where("slug = ? AND published = ? AND placeholder = ?", slug, true, false).
		First(&p).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &p, nil
}

type EventRepository struct {
	db *gorm.DB
}

func NewEventRepository(db *gorm.DB) *EventRepository {
	return &EventRepository{db: db}
}

var _ repository.EventRepository = (*EventRepository)(nil)

func (r *EventRepository) ListPublic(ctx context.Context, filter repository.EventListFilter) ([]model.CommunityEvent, error) {
	q := r.db.WithContext(ctx).Where("published = ?", true)
	if filter.Scope == model.EventScopeUpcoming {
		now := filter.Now.UTC()
		// Upcoming + ongoing: not clearly ended before now.
		q = q.Where(
			"(ends_at IS NOT NULL AND ends_at >= ?) OR (ends_at IS NULL AND (starts_at IS NULL OR starts_at >= ?))",
			now, now,
		)
	}
	q = q.Order("starts_at IS NULL ASC, starts_at ASC, created_at ASC")
	var items []model.CommunityEvent
	if err := q.Find(&items).Error; err != nil {
		return nil, err
	}
	return items, nil
}

type CommunityMemberRepository struct {
	db *gorm.DB
}

func NewCommunityMemberRepository(db *gorm.DB) *CommunityMemberRepository {
	return &CommunityMemberRepository{db: db}
}

var _ repository.CommunityMemberRepository = (*CommunityMemberRepository)(nil)

func (r *CommunityMemberRepository) ListPublic(ctx context.Context) ([]model.CommunityMember, error) {
	var items []model.CommunityMember
	err := r.db.WithContext(ctx).
		Where("public_profile = ? AND placeholder = ?", true, false).
		Order("sort_order ASC, display_name ASC").
		Find(&items).Error
	if err != nil {
		return nil, err
	}
	return items, nil
}

type RecruitingStatusRepository struct {
	db *gorm.DB
}

func NewRecruitingStatusRepository(db *gorm.DB) *RecruitingStatusRepository {
	return &RecruitingStatusRepository{db: db}
}

var _ repository.RecruitingStatusRepository = (*RecruitingStatusRepository)(nil)

func (r *RecruitingStatusRepository) GetCurrent(ctx context.Context) (*model.RecruitingStatus, error) {
	var row model.RecruitingStatus
	err := r.db.WithContext(ctx).
		Order("updated_at DESC").
		First(&row).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &row, nil
}
