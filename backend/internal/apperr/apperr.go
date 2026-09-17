package apperr

import "errors"

var (
	ErrNotFound     = errors.New("not found")
	ErrInvalidInput = errors.New("invalid input")
	ErrInternal     = errors.New("internal")
)

type CodedError struct {
	Code    string
	Message string
	Cause   error
}

func (e *CodedError) Error() string {
	return e.Message
}

func (e *CodedError) Unwrap() error {
	return e.Cause
}

func Invalid(code, message string) *CodedError {
	return &CodedError{Code: code, Message: message, Cause: ErrInvalidInput}
}

func NotFound(code, message string) *CodedError {
	return &CodedError{Code: code, Message: message, Cause: ErrNotFound}
}

func InternalCoded(code, message string) *CodedError {
	return &CodedError{Code: code, Message: message, Cause: ErrInternal}
}
