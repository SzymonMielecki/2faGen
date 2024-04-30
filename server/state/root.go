package state

import "github.com/SzymonMielecki/2faGen/server/db"

type State struct {
	Root *db.RootDB
	Mail *MailCredentials
}

type MailCredentials struct {
	Api_key string
	Email   string
}

type Response struct {
	Token string
	Email string
}

func NewMailCredentials(api_key string, email string) *MailCredentials {
	return &MailCredentials{Api_key: api_key, Email: email}
}

func NewState(path string, credentials MailCredentials) (*State, error) {
	db, err := db.NewRootDB(path)
	if err != nil {
		return nil, err
	}
	if err := db.Migrate(); err != nil {
		return nil, err
	}
	return &State{Root: db, Mail: &credentials}, nil
}
