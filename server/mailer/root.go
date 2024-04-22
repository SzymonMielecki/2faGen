package mailer

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"gopkg.in/gomail.v2"
)

func SendMail(to, subject, body string) {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file")
		return
	}
	app_password := os.Getenv("APP_PASSWORD")
	m := gomail.NewMessage()
	m.SetHeader("From", "2.f.a.generator@gmail.com")
	m.SetHeader("To", to)
	m.SetHeader("Subject", subject)
	m.SetBody("text/html", body)

	d := gomail.NewDialer("smtp.gmail.com", 587, "2.f.a.generator@gmail.com", app_password)
	if err := d.DialAndSend(m); err != nil {
		panic(err)
	}
}
