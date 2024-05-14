package handlers

import (
	"encoding/base64"
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
		user, err := s.Root.GetUserFromToken(t)
		if err != nil {
			return err
		}
		s.Root.CompleteUser(user.Email)
		data := base64.StdEncoding.EncodeToString([]byte(token + code))
		response := state.Response{Token: data, Email: user.Email}
		return c.JSON(http.StatusOK, response)
	}
}
