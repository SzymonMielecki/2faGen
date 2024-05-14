package mailer

import (
	"bytes"
	"fmt"
	"html/template"
	"log"

	"github.com/SzymonMielecki/2faGen/server/state"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

func SendMail(to_email, subject, code string, credentials state.MailCredentials) {
	t, err := template.ParseFiles("template.html")
	if err != nil {
		log.Println(err)
	}
	var body bytes.Buffer
	t.Execute(&body, struct {
		Code string
	}{Code: code})

	from := mail.NewEmail("2faGen", credentials.Email)
	to := mail.NewEmail("User", to_email)
	message := mail.NewSingleEmail(from, subject, to, code, body.String())
	client := sendgrid.NewSendClient(credentials.Api_key)
	response, err := client.Send(message)
	if err != nil {
		log.Println(err)
	} else {
		fmt.Println(response.StatusCode)
		fmt.Println(response.Body)
		fmt.Println(response.Headers)
	}
}