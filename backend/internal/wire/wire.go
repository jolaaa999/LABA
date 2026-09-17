package wire

import (
	"strings"

	"ai-community/backend/internal/model"
)

// Stable public JSON values (kebab / lowercase). Domain constants stay UPPER_SNAKE in DB.

var projectCategoryToWire = map[string]string{
	model.ProjectCategoryAIEngineering: "ai-engineering",
	model.ProjectCategoryResearch:      "research",
	model.ProjectCategoryDeveloperTool: "developer-tool",
	model.ProjectCategoryOpenSource:    "open-source",
	model.ProjectCategoryCompetition:   "competition",
}

var projectCategoryFromWire = map[string]string{
	"ai-engineering": model.ProjectCategoryAIEngineering,
	"research":       model.ProjectCategoryResearch,
	"developer-tool": model.ProjectCategoryDeveloperTool,
	"open-source":    model.ProjectCategoryOpenSource,
	"competition":    model.ProjectCategoryCompetition,
	// Archive filter alias (frontend "tools"): matches developer-tool + open-source via multi filter.
	"tool":  "TOOL_FILTER",
	"tools": "TOOL_FILTER",
}

var projectStatusToWire = map[string]string{
	model.ProjectStatusActive:   "active",
	model.ProjectStatusShared:   "shared",
	model.ProjectStatusDraft:    "draft",
	model.ProjectStatusArchived: "archived",
}

var eventFormatToWire = map[string]string{
	model.EventFormatWorkshop: "workshop",
	model.EventFormatRead:     "read",
	model.EventFormatBuild:    "build",
	model.EventFormatShare:    "share",
}

var contributionToWire = map[string]string{
	model.ContributionModeBuild:    "build",
	model.ContributionModeResearch: "research",
	model.ContributionModeExplain:  "explain",
	model.ContributionModeDocument: "document",
	model.ContributionModeConnect:  "connect",
}

var contributionFromWireOrDomain = map[string]string{
	"build":                        model.ContributionModeBuild,
	"research":                     model.ContributionModeResearch,
	"explain":                      model.ContributionModeExplain,
	"document":                     model.ContributionModeDocument,
	"connect":                      model.ContributionModeConnect,
	model.ContributionModeBuild:    model.ContributionModeBuild,
	model.ContributionModeResearch: model.ContributionModeResearch,
	model.ContributionModeExplain:  model.ContributionModeExplain,
	model.ContributionModeDocument: model.ContributionModeDocument,
	model.ContributionModeConnect:  model.ContributionModeConnect,
}

var recruitingToWire = map[string]string{
	model.RecruitingStatusNotPublished: "not-published",
	model.RecruitingStatusPublished:    "published",
}

// ParseProjectCategoryQuery returns domain category, or toolFilter=true for archive tools bucket.
func ParseProjectCategoryQuery(raw string) (domain string, toolFilter bool, ok bool) {
	raw = strings.TrimSpace(raw)
	if raw == "" {
		return "", false, true
	}
	v, found := projectCategoryFromWire[raw]
	if !found {
		return "", false, false
	}
	if v == "TOOL_FILTER" {
		return "", true, true
	}
	return v, false, true
}

func ProjectCategoryWire(domain string) (string, bool) {
	w, ok := projectCategoryToWire[domain]
	return w, ok
}

func ProjectStatusWire(domain string) (string, bool) {
	w, ok := projectStatusToWire[domain]
	return w, ok
}

func EventFormatWire(domain string) (string, bool) {
	w, ok := eventFormatToWire[domain]
	return w, ok
}

func ContributionModesWire(domainModes []string) ([]string, error) {
	if len(domainModes) == 0 {
		return nil, nil
	}
	out := make([]string, 0, len(domainModes))
	for _, m := range domainModes {
		m = strings.TrimSpace(m)
		dom, ok := contributionFromWireOrDomain[m]
		if !ok {
			return nil, errUnknownContribution(m)
		}
		out = append(out, contributionToWire[dom])
	}
	return out, nil
}

func RecruitingStatusWire(domain string) string {
	if w, ok := recruitingToWire[domain]; ok {
		return w
	}
	return recruitingToWire[model.RecruitingStatusNotPublished]
}

func PersonaForCategory(domainCategory string) string {
	switch domainCategory {
	case model.ProjectCategoryResearch:
		return model.PersonaResearch
	case model.ProjectCategoryDeveloperTool, model.ProjectCategoryOpenSource:
		return model.PersonaTool
	default:
		return model.PersonaEngineering
	}
}

func ParseEventScope(raw string) (string, bool) {
	raw = strings.TrimSpace(raw)
	if raw == "" {
		return model.EventScopeUpcoming, true
	}
	switch raw {
	case model.EventScopeUpcoming, model.EventScopeAll:
		return raw, true
	default:
		return "", false
	}
}

type unknownContributionError struct{ v string }

func (e unknownContributionError) Error() string {
	return "unknown contribution mode: " + e.v
}

func errUnknownContribution(v string) error {
	return unknownContributionError{v: v}
}
