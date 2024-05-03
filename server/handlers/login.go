package handlers

import (
	"fmt"
	"net/http"

	"github.com/SzymonMielecki/2faGen/server/mailer"
	"github.com/SzymonMielecki/2faGen/server/state"
	"github.com/SzymonMielecki/2faGen/server/utils"
	"github.com/labstack/echo/v4"
)

func HandleLogin(s state.State) echo.HandlerFunc {
	return func(c echo.Context) error {
		email := c.FormValue("email")
		password := c.FormValue("password")
		user, err := s.Root.GetUserByEmail(email)
		if err != nil {
			return err
		}
		if !utils.CompareHashAndPassword(user.Password_hash, password) {
			return echo.NewHTTPError(401, "Invalid password")
		}
		if !user.Is_completed {
			return echo.NewHTTPError(401, "Complete registration first")
		}
		token, code, err := s.Root.CreateToken(user)
		if err != nil {
			return err
		}
		fmt.Println(token, code)
		mailer.SendMail(email, "", code, code, *s.Mail)
		return c.String(http.StatusOK, token)
	}
}
