package main

import (
	"net/http"
	"os"

	"github.com/SzymonMielecki/2faGen/server/db"
	"github.com/SzymonMielecki/2faGen/server/handlers"
	"github.com/SzymonMielecki/2faGen/server/state"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	_ = godotenv.Load()
	api_key := os.Getenv("SENDGRID_API_KEY")
	email := os.Getenv("SENDGRID_EMAIL")
	credentials := state.NewMailCredentials(api_key, email)
	e := echo.New()
	e.Use(middleware.CORS())
	turso_database_url := os.Getenv("TURSO_DATABASE_URL")
	turso_auth_token := os.Getenv("TURSO_AUTH_TOKEN")
	database, err := db.NewTursoDB(turso_database_url, turso_auth_token)
	if err != nil {
		e.Logger.Fatal(err)
	}
	s, err := state.NewState(database, *credentials)
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

	port := os.Getenv("PORT")
	if port == "" {
		port = "1323"
	}
	e.Logger.Fatal(e.Start(":" + port))
}
