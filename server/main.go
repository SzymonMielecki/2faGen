package main

import (
	"net/http"
	"os"

	"github.com/SzymonMielecki/2faGen/server/handlers"
	"github.com/SzymonMielecki/2faGen/server/state"
	"github.com/labstack/echo/v4"
)

func main() {
	api_key := os.Getenv("SENDGRID_API_KEY")
	email := os.Getenv("SENDGRID_EMAIL")
	credentials := state.NewMailCredentials(api_key, email)
	e := echo.New()
	s, err := state.NewState("test.db", *credentials)
	if err != nil {
		e.Logger.Fatal(err)
		return
	}
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.POST("/register", handlers.HandleRegister(*s))
	e.POST("/login", handlers.HandleLogin(*s))
	e.POST("/verify", handlers.HandleVerify(*s))
	e.Logger.Fatal(e.Start(":1323"))
}