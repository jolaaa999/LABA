package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"
	"time"

	"ai-community/backend/internal/config"
	"ai-community/backend/internal/model"
	"ai-community/backend/internal/platform/database"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// DEV-ONLY fixtures. Never published. Idempotent upsert by stable slug.
func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("config: %v", err)
	}
	if !cfg.IsDevelopment() {
		log.Fatalf("seed-dev refused: APP_ENV=%q (require development/dev/local)", cfg.AppEnv)
	}

	db, err := database.Open(cfg.Database)
	if err != nil {
		log.Fatalf("database: %v", err)
	}
	defer database.Close(db)

	mig := getenv("MIGRATIONS_DIR", "migrations")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if err := database.Migrate(ctx, db, mig); err != nil {
		log.Fatalf("migrate: %v", err)
	}

	if err := seedProjects(ctx, db); err != nil {
		log.Fatalf("projects: %v", err)
	}
	if err := seedEvents(ctx, db); err != nil {
		log.Fatalf("events: %v", err)
	}
	if err := seedMembers(ctx, db); err != nil {
		log.Fatalf("members: %v", err)
	}
	if err := ensureRecruiting(ctx, db); err != nil {
		log.Fatalf("recruiting: %v", err)
	}

	fmt.Println("seed-dev complete (all fixtures unpublished / placeholder; recruiting NOT_PUBLISHED)")
}

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func seedProjects(ctx context.Context, db *gorm.DB) error {
	fixtures := []model.Project{
		devProject("campus-agent-workshop", "Campus Agent Workshop", model.ProjectCategoryAIEngineering, "2026", true, 1),
		devProject("attention-ablation-lab", "Attention Ablation Lab", model.ProjectCategoryResearch, "2026", true, 2),
		devProject("paper-pipeline-cli", "Paper Pipeline CLI", model.ProjectCategoryDeveloperTool, "2025", true, 3),
	}
	for _, p := range fixtures {
		if err := upsertBySlug(ctx, db, &p, "slug", map[string]any{
			"title": p.Title, "summary": p.Summary, "category": p.Category,
			"year": p.Year, "status": p.Status, "featured": p.Featured,
			"published": false, "placeholder": true, "sort_order": p.SortOrder,
		}); err != nil {
			return err
		}
	}
	return nil
}

func devProject(slug, title, category, year string, featured bool, sort int) model.Project {
	return model.Project{
		ID:          uuid.NewString(),
		Slug:        slug,
		Title:       title,
		Summary:     "DEV fixture — illustrative only, not a public community deliverable.",
		Category:    category,
		Year:        year,
		Status:      model.ProjectStatusDraft,
		Featured:    featured,
		Published:   false,
		Placeholder: true,
		SortOrder:   sort,
	}
}

func seedEvents(ctx context.Context, db *gorm.DB) error {
	start := time.Now().UTC().Add(72 * time.Hour)
	end := start.Add(2 * time.Hour)
	loc := "DEV campus room (unpublished)"
	e := model.CommunityEvent{
		ID:           uuid.NewString(),
		Slug:         "dev-workshop-unpublished",
		Title:        "DEV Workshop Fixture",
		Format:       model.EventFormatWorkshop,
		Summary:      "DEV fixture — never published.",
		StartsAt:     &start,
		EndsAt:       &end,
		LocationText: &loc,
		Published:    false,
	}
	return upsertBySlug(ctx, db, &e, "slug", map[string]any{
		"title": e.Title, "format": e.Format, "summary": e.Summary,
		"starts_at": e.StartsAt, "ends_at": e.EndsAt, "location_text": e.LocationText,
		"published": false,
	})
}

func seedMembers(ctx context.Context, db *gorm.DB) error {
	modes, _ := json.Marshal([]string{model.ContributionModeBuild, model.ContributionModeExplain})
	modesStr := string(modes)
	headline := "DEV placeholder member"
	bio := "Not a real community profile."
	m := model.CommunityMember{
		ID:                uuid.NewString(),
		Slug:              "dev-member-placeholder",
		DisplayName:       "Dev Placeholder",
		Headline:          &headline,
		Bio:               &bio,
		PublicProfile:     false,
		Placeholder:       true,
		ContributionModes: &modesStr,
		SortOrder:         99,
	}
	return upsertBySlug(ctx, db, &m, "slug", map[string]any{
		"display_name": m.DisplayName, "headline": m.Headline, "bio": m.Bio,
		"public_profile": false, "placeholder": true,
		"contribution_modes": m.ContributionModes, "sort_order": m.SortOrder,
	})
}

func ensureRecruiting(ctx context.Context, db *gorm.DB) error {
	headline := "Public recruiting details are not published yet."
	desc := "Formal recruiting details will appear when they are ready to be public."
	id := "00000000-0000-4000-8000-000000000001"
	return db.WithContext(ctx).Exec(`
INSERT INTO recruiting_status (id, status, headline, description, contact_type, contact_value, published_at)
VALUES (?, 'NOT_PUBLISHED', ?, ?, NULL, NULL, NULL)
ON DUPLICATE KEY UPDATE
  status='NOT_PUBLISHED',
  headline=VALUES(headline),
  description=VALUES(description),
  contact_type=NULL,
  contact_value=NULL,
  published_at=NULL
`, id, headline, desc).Error
}

func upsertBySlug(ctx context.Context, db *gorm.DB, row any, slugField string, updates map[string]any) error {
	var slug string
	switch v := row.(type) {
	case *model.Project:
		slug = v.Slug
		var existing model.Project
		err := db.WithContext(ctx).Where("slug = ?", slug).First(&existing).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return db.WithContext(ctx).Create(v).Error
		}
		if err != nil {
			return err
		}
		return db.WithContext(ctx).Model(&existing).Updates(updates).Error
	case *model.CommunityEvent:
		slug = v.Slug
		var existing model.CommunityEvent
		err := db.WithContext(ctx).Where("slug = ?", slug).First(&existing).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return db.WithContext(ctx).Create(v).Error
		}
		if err != nil {
			return err
		}
		return db.WithContext(ctx).Model(&existing).Updates(updates).Error
	case *model.CommunityMember:
		slug = v.Slug
		var existing model.CommunityMember
		err := db.WithContext(ctx).Where("slug = ?", slug).First(&existing).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return db.WithContext(ctx).Create(v).Error
		}
		if err != nil {
			return err
		}
		return db.WithContext(ctx).Model(&existing).Updates(updates).Error
	default:
		return fmt.Errorf("unsupported row type for %s", slugField)
	}
}
