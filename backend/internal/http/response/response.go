package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ErrorBody struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

type ErrorEnvelope struct {
	Error ErrorBody `json:"error"`
}

type DataEnvelope struct {
	Data any `json:"data"`
}

func OK(c *gin.Context, data any) {
	c.JSON(http.StatusOK, DataEnvelope{Data: data})
}

func Fail(c *gin.Context, status int, code, message string) {
	c.AbortWithStatusJSON(status, ErrorEnvelope{
		Error: ErrorBody{Code: code, Message: message},
	})
}

func BadRequest(c *gin.Context, code, message string) {
	Fail(c, http.StatusBadRequest, code, message)
}

func NotFound(c *gin.Context, code, message string) {
	Fail(c, http.StatusNotFound, code, message)
}

func Internal(c *gin.Context) {
	Fail(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Internal server error")
}
