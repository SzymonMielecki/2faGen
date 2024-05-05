package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/SzymonMielecki/2faGen/server/db"
	"github.com/SzymonMielecki/2faGen/server/handlers"
	"github.com/SzymonMielecki/2faGen/server/state"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	api_key := os.Getenv("SENDGRID_API_KEY")
	email := os.Getenv("SENDGRID_EMAIL")
	credentials := state.NewMailCredentials(api_key, email)
	e := echo.New()
	e.Use(middleware.CORS())
	host := os.Getenv("PGHOST")
	user := os.Getenv("PGUSER")
	password := os.Getenv("PGPASSWORD")
	dbname := os.Getenv("PGDATABASE")
	dbport := os.Getenv("PGPORT")
	var database *db.RootDB
	var err error
	if host == "" || user == "" || password == "" || dbname == "" || dbport == "" {
		database, err = db.NewRootDB("test.db", true)
	} else {
		dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Europe/Warsaw", host, user, password, dbname, dbport)
		database, err = db.NewRootDB(dsn, false)
	}
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
	e.Logger.Fatal(e.Start(":" + port))
}
