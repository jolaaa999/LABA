package middleware

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func RequestID() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.GetHeader("X-Request-ID")
		if id == "" {
			id = uuid.NewString()
		}
		c.Set("request_id", id)
		c.Writer.Header().Set("X-Request-ID", id)
		c.Next()
	}
}

func AccessLog() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		c.Next()
		rid, _ := c.Get("request_id")
		log.Printf(
			"request_id=%v method=%s path=%s status=%d latency_ms=%d",
			rid,
			c.Request.Method,
			c.Request.URL.Path,
			c.Writer.Status(),
			time.Since(start).Milliseconds(),
		)
	}
}

func MaxBodyBytes(n int64) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, n)
		c.Next()
	}
}
