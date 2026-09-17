package model

// Domain constants (DB / internal). Public JSON uses wire package mappers.

const (
	ProjectCategoryAIEngineering = "AI_ENGINEERING"
	ProjectCategoryResearch      = "RESEARCH"
	ProjectCategoryDeveloperTool = "DEVELOPER_TOOL"
	ProjectCategoryOpenSource    = "OPEN_SOURCE"
	ProjectCategoryCompetition   = "COMPETITION"
)

const (
	ProjectStatusActive   = "ACTIVE"
	ProjectStatusShared   = "SHARED"
	ProjectStatusDraft    = "DRAFT"
	ProjectStatusArchived = "ARCHIVED"
)

const (
	EventFormatWorkshop = "WORKSHOP"
	EventFormatRead     = "READ"
	EventFormatBuild    = "BUILD"
	EventFormatShare    = "SHARE"
)

const (
	ContributionModeBuild    = "BUILD"
	ContributionModeResearch = "RESEARCH"
	ContributionModeExplain  = "EXPLAIN"
	ContributionModeDocument = "DOCUMENT"
	ContributionModeConnect  = "CONNECT"
)

const (
	RecruitingStatusNotPublished = "NOT_PUBLISHED"
	RecruitingStatusPublished    = "PUBLISHED"
)

const (
	EventScopeUpcoming = "upcoming"
	EventScopeAll      = "all"
)

// CaseStudyPersona helps Phase 8E match frontend editorial bodies — not case study content.
const (
	PersonaEngineering = "engineering"
	PersonaResearch    = "research"
	PersonaTool        = "tool"
)
