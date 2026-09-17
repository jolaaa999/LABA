package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
	"time"

	"ai-community/backend/internal/config"
	"ai-community/backend/internal/http/handler"
	"ai-community/backend/internal/http/router"
	"ai-community/backend/internal/platform/database"
	mysqlrepo "ai-community/backend/internal/repository/mysql"
	"ai-community/backend/internal/service"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("config: %v", err)
	}

	db, err := database.Open(cfg.Database)
	if err != nil {
		log.Fatalf("database: %v", err)
	}

	migrationsDir := getenv("MIGRATIONS_DIR", "migrations")
	if abs, err := filepath.Abs(migrationsDir); err == nil {
		migrationsDir = abs
	}
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	if err := database.Migrate(ctx, db, migrationsDir); err != nil {
		cancel()
		log.Fatalf("migrate: %v", err)
	}
	cancel()

	projectRepo := mysqlrepo.NewProjectRepository(db)
	eventRepo := mysqlrepo.NewEventRepository(db)
	memberRepo := mysqlrepo.NewCommunityMemberRepository(db)
	recruitingRepo := mysqlrepo.NewRecruitingStatusRepository(db)

	engine := router.New(router.Deps{
		Config:     cfg,
		Health:     handler.NewHealthHandler(db),
		Projects:   handler.NewProjectHandler(service.NewProjectService(projectRepo)),
		Events:     handler.NewEventHandler(service.NewEventService(eventRepo)),
		Community:  handler.NewCommunityHandler(service.NewCommunityMemberService(memberRepo)),
		Recruiting: handler.NewRecruitingHandler(service.NewRecruitingService(recruitingRepo)),
	})

	srv := &http.Server{
		Addr:         cfg.Server.Addr,
		Handler:      engine,
		ReadTimeout:  cfg.Server.ReadTimeout,
		WriteTimeout: cfg.Server.WriteTimeout,
		IdleTimeout:  cfg.Server.IdleTimeout,
	}

	go func() {
		log.Printf("server listening on %s", cfg.Server.Addr)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("listen: %v", err)
		}
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
	<-stop

	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer shutdownCancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		log.Printf("shutdown: %v", err)
	}
	if err := database.Close(db); err != nil {
		log.Printf("db close: %v", err)
	}
	log.Println("server stopped")
}

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
