package mailer

import (
	"fmt"
	"log"

	"github.com/SzymonMielecki/2faGen/server/state"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

func SendMail(to_email, subject, code, body string, credentials state.MailCredentials) {
	from := mail.NewEmail("2faGen", credentials.Email)
	to := mail.NewEmail("Example User", to_email)
	message := mail.NewSingleEmail(from, subject, to, code, body)
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

func Template(code string) string {
	return fmt.Sprintf("Your code is: %s", code)
}
