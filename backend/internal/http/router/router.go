package router

import (
	"time"

	"ai-community/backend/internal/config"
	"ai-community/backend/internal/http/handler"
	"ai-community/backend/internal/http/middleware"
	"ai-community/backend/internal/http/response"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Deps struct {
	Config     *config.Config
	Health     *handler.HealthHandler
	Projects   *handler.ProjectHandler
	Events     *handler.EventHandler
	Community  *handler.CommunityHandler
	Recruiting *handler.RecruitingHandler
}

func New(deps Deps) *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(middleware.RequestID())
	r.Use(middleware.AccessLog())
	r.Use(middleware.MaxBodyBytes(1 << 20)) // 1 MiB

	corsCfg := cors.Config{
		AllowMethods:     []string{"GET", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "X-Request-ID"},
		ExposeHeaders:    []string{"X-Request-ID"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}
	if len(deps.Config.CORS.AllowedOrigins) == 0 {
		corsCfg.AllowOriginFunc = func(string) bool { return false }
	} else {
		corsCfg.AllowOrigins = deps.Config.CORS.AllowedOrigins
	}
	r.Use(cors.New(corsCfg))

	r.NoRoute(func(c *gin.Context) {
		response.NotFound(c, "NOT_FOUND", "Resource not found")
	})

	v1 := r.Group("/api/v1")
	{
		v1.GET("/health", deps.Health.Health)
		v1.GET("/ready", deps.Health.Ready)
		v1.GET("/projects", deps.Projects.List)
		v1.GET("/projects/:slug", deps.Projects.GetBySlug)
		v1.GET("/events", deps.Events.List)
		v1.GET("/community/members", deps.Community.ListMembers)
		v1.GET("/recruiting/status", deps.Recruiting.Status)
	}
	return r
}
