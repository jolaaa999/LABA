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
	Config          *config.Config
	Health          *handler.HealthHandler
	Projects        *handler.ProjectHandler
	Events          *handler.EventHandler
	Community       *handler.CommunityHandler
	Recruiting      *handler.RecruitingHandler
	AuthDiscussions *handler.AuthDiscussionHandler
}

func New(deps Deps) *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(middleware.RequestID())
	r.Use(middleware.AccessLog())
	r.Use(middleware.MaxBodyBytes(1 << 20)) // 1 MiB

	allowMethods := []string{"GET", "OPTIONS"}
	allowHeaders := []string{"Origin", "Content-Type", "Accept", "X-Request-ID"}
	allowCredentials := false
	if deps.AuthDiscussions != nil && deps.Config.GitHub.Enabled {
		allowMethods = []string{"GET", "POST", "OPTIONS"}
		allowCredentials = true
	}

	corsCfg := cors.Config{
		AllowMethods:     allowMethods,
		AllowHeaders:     allowHeaders,
		ExposeHeaders:    []string{"X-Request-ID"},
		AllowCredentials: allowCredentials,
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

		if deps.AuthDiscussions != nil && deps.Config.GitHub.Enabled {
			v1.GET("/auth/github/login", deps.AuthDiscussions.Login)
			v1.GET("/auth/github/callback", deps.AuthDiscussions.Callback)
			v1.GET("/auth/me", deps.AuthDiscussions.Me)
			v1.POST("/auth/logout", deps.AuthDiscussions.Logout)
			v1.GET("/discussions", deps.AuthDiscussions.ListDiscussions)
			v1.GET("/discussions/:number", deps.AuthDiscussions.GetDiscussion)
			v1.POST("/discussions", deps.AuthDiscussions.CreateDiscussion)
			v1.POST("/discussions/:number/comments", deps.AuthDiscussions.CreateComment)
		}
	}
	return r
}
