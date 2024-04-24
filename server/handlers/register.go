package handlers

import (
	"fmt"
	"net/http"

	"github.com/SzymonMielecki/2faGen/server/mailer"
	"github.com/SzymonMielecki/2faGen/server/state"
	"github.com/labstack/echo/v4"
)

func HandleRegister(s state.State) echo.HandlerFunc {
	return func(c echo.Context) error {
		name := c.FormValue("name")
		email := c.FormValue("email")
		password := c.FormValue("password")
		user, err := s.Root.CreateUser(name, email, password)
		if err != nil {
			fmt.Println(err)
			return err
		}
		fmt.Println(user)
		token, code, err := s.Root.CreateToken(user)
		if err != nil {
			fmt.Println(err)
			return err
		}
		fmt.Println(token, code)
		mailer.SendMail(email, "test subject", code, code, *s.Mail)

		return c.String(http.StatusOK, token)
	}
}
