package handler

import (
	"context"
	"errors"
	"log"
	"net/http"
	"time"

	"ai-community/backend/internal/apperr"
	"ai-community/backend/internal/http/response"
	"ai-community/backend/internal/platform/database"
	"ai-community/backend/internal/service"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type HealthHandler struct {
	db *gorm.DB
}

func NewHealthHandler(db *gorm.DB) *HealthHandler {
	return &HealthHandler{db: db}
}

func (h *HealthHandler) Health(c *gin.Context) {
	response.OK(c, map[string]string{"status": "ok"})
}

func (h *HealthHandler) Ready(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 2*time.Second)
	defer cancel()
	if err := database.Ping(ctx, h.db); err != nil {
		log.Printf("ready check failed: %v", err)
		response.Fail(c, http.StatusServiceUnavailable, "NOT_READY", "Database not ready")
		return
	}
	response.OK(c, map[string]string{"status": "ready", "database": "ok"})
}

type ProjectHandler struct {
	svc *service.ProjectService
}

func NewProjectHandler(svc *service.ProjectService) *ProjectHandler {
	return &ProjectHandler{svc: svc}
}

func (h *ProjectHandler) List(c *gin.Context) {
	items, err := h.svc.List(c.Request.Context(), c.Query("category"))
	if writeServiceError(c, err) {
		return
	}
	response.OK(c, items)
}

func (h *ProjectHandler) GetBySlug(c *gin.Context) {
	item, err := h.svc.GetBySlug(c.Request.Context(), c.Param("slug"))
	if writeServiceError(c, err) {
		return
	}
	response.OK(c, item)
}

type EventHandler struct {
	svc *service.EventService
}

func NewEventHandler(svc *service.EventService) *EventHandler {
	return &EventHandler{svc: svc}
}

func (h *EventHandler) List(c *gin.Context) {
	items, err := h.svc.List(c.Request.Context(), c.Query("scope"))
	if writeServiceError(c, err) {
		return
	}
	response.OK(c, items)
}

type CommunityHandler struct {
	svc *service.CommunityMemberService
}

func NewCommunityHandler(svc *service.CommunityMemberService) *CommunityHandler {
	return &CommunityHandler{svc: svc}
}

func (h *CommunityHandler) ListMembers(c *gin.Context) {
	items, err := h.svc.ListPublic(c.Request.Context())
	if writeServiceError(c, err) {
		return
	}
	response.OK(c, items)
}

type RecruitingHandler struct {
	svc *service.RecruitingService
}

func NewRecruitingHandler(svc *service.RecruitingService) *RecruitingHandler {
	return &RecruitingHandler{svc: svc}
}

func (h *RecruitingHandler) Status(c *gin.Context) {
	item, err := h.svc.GetStatus(c.Request.Context())
	if writeServiceError(c, err) {
		return
	}
	response.OK(c, item)
}

func writeServiceError(c *gin.Context, err error) bool {
	if err == nil {
		return false
	}
	var coded *apperr.CodedError
	if errors.As(err, &coded) {
		if errors.Is(coded.Cause, apperr.ErrNotFound) {
			response.NotFound(c, coded.Code, coded.Message)
			return true
		}
		if errors.Is(coded.Cause, apperr.ErrInvalidInput) {
			response.BadRequest(c, coded.Code, coded.Message)
			return true
		}
	}
	log.Printf("handler error: %v", err)
	response.Internal(c)
	return true
}
