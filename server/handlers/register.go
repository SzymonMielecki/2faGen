package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func HandleRegister(c echo.Context) error {
	return c.String(http.StatusOK, "Register")
}
