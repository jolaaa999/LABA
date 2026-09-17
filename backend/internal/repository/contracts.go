package repository

import (
	"context"
	"time"

	"ai-community/backend/internal/model"
)

type ProjectListFilter struct {
	Category   *string
	ToolFilter bool // archive "tools": DEVELOPER_TOOL + OPEN_SOURCE
}

type ProjectRepository interface {
	ListPublic(ctx context.Context, filter ProjectListFilter) ([]model.Project, error)
	GetPublicBySlug(ctx context.Context, slug string) (*model.Project, error)
}

type EventListFilter struct {
	Scope string // upcoming | all
	Now   time.Time
}

type EventRepository interface {
	ListPublic(ctx context.Context, filter EventListFilter) ([]model.CommunityEvent, error)
}

type CommunityMemberRepository interface {
	ListPublic(ctx context.Context) ([]model.CommunityMember, error)
}

type RecruitingStatusRepository interface {
	GetCurrent(ctx context.Context) (*model.RecruitingStatus, error)
}
