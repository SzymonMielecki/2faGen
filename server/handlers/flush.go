package handlers

import (
	"github.com/SzymonMielecki/2faGen/server/state"
	"github.com/labstack/echo/v4"
)

func HandleFlush(s state.State) echo.HandlerFunc {
	return func(c echo.Context) error {
		return s.Root.Flush()
	}
}
