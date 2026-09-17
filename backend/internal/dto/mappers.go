package dto

import (
	"time"

	"ai-community/backend/internal/apperr"
	"ai-community/backend/internal/model"
	"ai-community/backend/internal/wire"
)

func ToProjectListItem(p model.Project, featured bool) (ProjectListItemResponse, error) {
	cat, ok := wire.ProjectCategoryWire(p.Category)
	if !ok {
		return ProjectListItemResponse{}, apperr.InternalCoded("INVALID_PROJECT_CATEGORY", "Invalid project category in data store")
	}
	st, ok := wire.ProjectStatusWire(p.Status)
	if !ok {
		return ProjectListItemResponse{}, apperr.InternalCoded("INVALID_PROJECT_STATUS", "Invalid project status in data store")
	}
	return ProjectListItemResponse{
		ID: p.ID, Slug: p.Slug, Title: p.Title, Summary: p.Summary,
		Category: cat, Year: p.Year, Status: st, Featured: featured,
		Persona: wire.PersonaForCategory(p.Category),
	}, nil
}

func ToProjectDetail(p model.Project, featured bool) (ProjectDetailResponse, error) {
	item, err := ToProjectListItem(p, featured)
	if err != nil {
		return ProjectDetailResponse{}, err
	}
	return ProjectDetailResponse{
		ID: item.ID, Slug: item.Slug, Title: item.Title, Summary: item.Summary,
		Category: item.Category, Year: item.Year, Status: item.Status,
		Featured: item.Featured, Persona: item.Persona,
	}, nil
}

func ToEvent(e model.CommunityEvent) (EventResponse, error) {
	format, ok := wire.EventFormatWire(e.Format)
	if !ok {
		return EventResponse{}, apperr.InternalCoded("INVALID_EVENT_FORMAT", "Invalid event format in data store")
	}
	return EventResponse{
		ID: e.ID, Slug: e.Slug, Title: e.Title, Format: format, Summary: e.Summary,
		StartsAt: formatRFC3339UTC(e.StartsAt), EndsAt: formatRFC3339UTC(e.EndsAt),
		LocationText: e.LocationText,
	}, nil
}

func ToCommunityMember(m model.CommunityMember, modes []string) CommunityMemberResponse {
	return CommunityMemberResponse{
		ID: m.ID, Slug: m.Slug, DisplayName: m.DisplayName,
		Headline: m.Headline, Bio: m.Bio, ContributionModes: modes,
	}
}

func ToRecruitingNotPublished(headline, description *string) RecruitingStatusResponse {
	return RecruitingStatusResponse{
		Status:      wire.RecruitingStatusWire(model.RecruitingStatusNotPublished),
		Headline:    headline,
		Description: description,
	}
}

func ToRecruitingPublished(row model.RecruitingStatus) RecruitingStatusResponse {
	return RecruitingStatusResponse{
		Status:       wire.RecruitingStatusWire(model.RecruitingStatusPublished),
		Headline:     row.Headline,
		Description:  row.Description,
		ContactType:  row.ContactType,
		ContactValue: row.ContactValue,
	}
}

func formatRFC3339UTC(t *time.Time) *string {
	if t == nil {
		return nil
	}
	s := t.UTC().Format(time.RFC3339)
	return &s
}
