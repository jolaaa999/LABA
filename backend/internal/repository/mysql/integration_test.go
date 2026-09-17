//go:build integration

package mysql_test

import (
	"context"
	"path/filepath"
	"testing"
	"time"

	"ai-community/backend/internal/config"
	"ai-community/backend/internal/model"
	"ai-community/backend/internal/platform/database"
	"ai-community/backend/internal/repository"
	mysqlrepo "ai-community/backend/internal/repository/mysql"

	"github.com/google/uuid"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

func openDB(t *testing.T) *gorm.DB {
	t.Helper()
	_ = godotenv.Load(filepath.Join("..", "..", "..", ".env"))
	_ = godotenv.Load()
	cfg, err := config.Load()
	if err != nil {
		t.Skipf("skip integration: %v", err)
	}
	db, err := database.Open(cfg.Database)
	if err != nil {
		t.Skipf("skip integration: %v", err)
	}
	mig, err := filepath.Abs(filepath.Join("..", "..", "..", "migrations"))
	if err != nil {
		t.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if err := database.Migrate(ctx, db, mig); err != nil {
		t.Fatalf("migrate: %v", err)
	}
	t.Cleanup(func() { _ = database.Close(db) })
	return db
}

func TestProjectRepository_PublicFilters(t *testing.T) {
	db := openDB(t)
	ctx := context.Background()

	slugPub := "it-pub-" + uuid.NewString()[:8]
	slugDraft := "it-draft-" + uuid.NewString()[:8]
	slugPh := "it-ph-" + uuid.NewString()[:8]

	rows := []model.Project{
		{ID: uuid.NewString(), Slug: slugPub, Title: "Pub", Summary: "s", Category: model.ProjectCategoryResearch, Year: "2026", Status: model.ProjectStatusActive, Published: true, Featured: true, SortOrder: 1},
		{ID: uuid.NewString(), Slug: slugDraft, Title: "Draft", Summary: "s", Category: model.ProjectCategoryResearch, Year: "2026", Status: model.ProjectStatusDraft, Published: false, SortOrder: 2},
		{ID: uuid.NewString(), Slug: slugPh, Title: "PH", Summary: "s", Category: model.ProjectCategoryResearch, Year: "2026", Status: model.ProjectStatusActive, Published: true, Placeholder: true, SortOrder: 3},
	}
	for i := range rows {
		if err := db.Create(&rows[i]).Error; err != nil {
			t.Fatal(err)
		}
		id := rows[i].ID
		t.Cleanup(func() { db.Where("id = ?", id).Delete(&model.Project{}) })
	}

	repo := mysqlrepo.NewProjectRepository(db)
	list, err := repo.ListPublic(ctx, repository.ProjectListFilter{})
	if err != nil {
		t.Fatal(err)
	}
	found := false
	for _, p := range list {
		if p.Slug == slugDraft || p.Slug == slugPh {
			t.Fatalf("leaked %s", p.Slug)
		}
		if p.Slug == slugPub {
			found = true
		}
	}
	if !found {
		t.Fatal("published project missing")
	}
	got, err := repo.GetPublicBySlug(ctx, slugDraft)
	if err != nil || got != nil {
		t.Fatalf("draft hidden expected, got %#v", got)
	}
	got, err = repo.GetPublicBySlug(ctx, slugPh)
	if err != nil || got != nil {
		t.Fatalf("placeholder hidden expected")
	}
}

func TestEventRepository_Upcoming(t *testing.T) {
	db := openDB(t)
	ctx := context.Background()
	past := time.Now().UTC().Add(-72 * time.Hour)
	future := time.Now().UTC().Add(72 * time.Hour)

	pubPast := model.CommunityEvent{ID: uuid.NewString(), Slug: "it-past-" + uuid.NewString()[:8], Title: "Past", Format: model.EventFormatShare, Summary: "s", StartsAt: &past, EndsAt: &past, Published: true}
	pubFuture := model.CommunityEvent{ID: uuid.NewString(), Slug: "it-fut-" + uuid.NewString()[:8], Title: "Fut", Format: model.EventFormatWorkshop, Summary: "s", StartsAt: &future, Published: true}
	draft := model.CommunityEvent{ID: uuid.NewString(), Slug: "it-draft-ev-" + uuid.NewString()[:8], Title: "Draft", Format: model.EventFormatRead, Summary: "s", StartsAt: &future, Published: false}
	for _, e := range []model.CommunityEvent{pubPast, pubFuture, draft} {
		ev := e
		if err := db.Create(&ev).Error; err != nil {
			t.Fatal(err)
		}
		id := ev.ID
		t.Cleanup(func() { db.Where("id = ?", id).Delete(&model.CommunityEvent{}) })
	}

	repo := mysqlrepo.NewEventRepository(db)
	list, err := repo.ListPublic(ctx, repository.EventListFilter{Scope: model.EventScopeUpcoming, Now: time.Now().UTC()})
	if err != nil {
		t.Fatal(err)
	}
	sawFuture := false
	for _, e := range list {
		if e.Slug == pubPast.Slug || e.Slug == draft.Slug {
			t.Fatalf("unexpected %s", e.Slug)
		}
		if e.Slug == pubFuture.Slug {
			sawFuture = true
		}
	}
	if !sawFuture {
		t.Fatal("upcoming event missing")
	}
}

func TestMemberAndRecruitingRepositories(t *testing.T) {
	db := openDB(t)
	ctx := context.Background()
	modes := `["BUILD","CONNECT"]`
	ok := model.CommunityMember{ID: uuid.NewString(), Slug: "it-mem-" + uuid.NewString()[:8], DisplayName: "OK", PublicProfile: true, Placeholder: false, ContributionModes: &modes, SortOrder: 1}
	priv := model.CommunityMember{ID: uuid.NewString(), Slug: "it-priv-" + uuid.NewString()[:8], DisplayName: "Priv", PublicProfile: false, Placeholder: false, SortOrder: 2}
	for _, m := range []model.CommunityMember{ok, priv} {
		row := m
		if err := db.Create(&row).Error; err != nil {
			t.Fatal(err)
		}
		id := row.ID
		t.Cleanup(func() { db.Where("id = ?", id).Delete(&model.CommunityMember{}) })
	}

	members, err := mysqlrepo.NewCommunityMemberRepository(db).ListPublic(ctx)
	if err != nil {
		t.Fatal(err)
	}
	for _, m := range members {
		if m.Slug == priv.Slug {
			t.Fatal("private leaked")
		}
	}

	row, err := mysqlrepo.NewRecruitingStatusRepository(db).GetCurrent(ctx)
	if err != nil {
		t.Fatal(err)
	}
	if row == nil || row.Status != model.RecruitingStatusNotPublished {
		t.Fatalf("recruiting=%#v", row)
	}
}
