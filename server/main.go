package main

import (
	"fmt"
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
	dbuser := os.Getenv("DBUSER")
	dbpass := os.Getenv("DBPASS")
	dbhost := os.Getenv("DBHOST")
	dbname := os.Getenv("DBNAME")
	dsn := fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?charset=utf8mb4&parseTime=True&loc=Local", dbuser, dbpass, dbhost, dbname)
	fmt.Println(dsn)
	database, err := db.NewRootDB(dsn)
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
	e.POST("/flush", handlers.HandleFlush(*s))

	port := os.Getenv("PORT")
	e.Logger.Fatal(e.Start(":" + port))
}
