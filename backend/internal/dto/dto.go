package dto

// Public response DTOs — camelCase JSON (Phase 8A contract preserved).
// Internal flags (published, placeholder, sort_order) are never exposed.

type ProjectListItemResponse struct {
	ID       string `json:"id"`
	Slug     string `json:"slug"`
	Title    string `json:"title"`
	Summary  string `json:"summary"`
	Category string `json:"category"`
	Year     string `json:"year"`
	Status   string `json:"status"`
	Featured bool   `json:"featured"`
	Persona  string `json:"persona"`
}

type ProjectDetailResponse struct {
	ID       string `json:"id"`
	Slug     string `json:"slug"`
	Title    string `json:"title"`
	Summary  string `json:"summary"`
	Category string `json:"category"`
	Year     string `json:"year"`
	Status   string `json:"status"`
	Featured bool   `json:"featured"`
	Persona  string `json:"persona"`
	// Case study long-form body remains frontend-static.
}

type EventResponse struct {
	ID           string  `json:"id"`
	Slug         string  `json:"slug"`
	Title        string  `json:"title"`
	Format       string  `json:"format"`
	Summary      string  `json:"summary"`
	StartsAt     *string `json:"startsAt,omitempty"` // RFC3339 UTC
	EndsAt       *string `json:"endsAt,omitempty"`   // RFC3339 UTC
	LocationText *string `json:"locationText,omitempty"`
}

type CommunityMemberResponse struct {
	ID                string   `json:"id"`
	Slug              string   `json:"slug"`
	DisplayName       string   `json:"displayName"`
	Headline          *string  `json:"headline,omitempty"`
	Bio               *string  `json:"bio,omitempty"`
	ContributionModes []string `json:"contributionModes,omitempty"`
}

type RecruitingStatusResponse struct {
	Status       string  `json:"status"`
	Headline     *string `json:"headline,omitempty"`
	Description  *string `json:"description,omitempty"`
	ContactType  *string `json:"contactType,omitempty"`
	ContactValue *string `json:"contactValue,omitempty"`
}
