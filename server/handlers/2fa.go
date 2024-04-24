package handlers

import (
	"net/http"

	"github.com/SzymonMielecki/2faGen/server/state"
	"github.com/labstack/echo/v4"
)

func HandleVerify(s state.State) echo.HandlerFunc {
	return func(c echo.Context) error {
		token := c.FormValue("token")
		code := c.FormValue("code")
		t, err := s.Root.VerifyToken(token, code)
		if err != nil {
			return err
		}
		s.Root.CompleteToken(t)
		s.Root.CompleteUser(t.User.Email)
		return c.String(http.StatusOK, "Token verified")
	}
}
