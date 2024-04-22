package main

import (
	"net/http"

	"github.com/SzymonMielecki/2faGen/server/handlers"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.POST("/register", handlers.HandleRegister)
	e.Logger.Fatal(e.Start(":1323"))
}
