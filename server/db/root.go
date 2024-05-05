package db

import (
	"errors"
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/SzymonMielecki/2faGen/server/utils"
)

type RootDB struct {
	db *gorm.DB
}

type User struct {
	gorm.Model
	Name          string
	Email         string
	Password_hash string
	Is_completed  bool
}

type Token struct {
	gorm.Model
	Token        string
	Code         string
	User         User
	UserID       uint
	Is_completed bool
}

func NewRootDB(dsn string) (*RootDB, error) {
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return &RootDB{db: db}, nil
}

func (r *RootDB) Migrate() error {
	err := r.db.AutoMigrate(&User{})
	if err != nil {
		return err
	}
	return r.db.AutoMigrate(&Token{})
}

func (r *RootDB) Flush() error {
	err := r.db.Migrator().DropTable(&User{})
	if err != nil {
		return err
	}
	return r.db.Migrator().DropTable(&Token{})
}

func (r *RootDB) CreateUser(name, email, password string) (User, error) {
	user := User{Name: name, Email: email, Password_hash: utils.HashFunc(password), Is_completed: false}
	q := r.db.Create(&user)
	if q.Error != nil {
		return User{}, q.Error
	}
	return user, nil
}

func (r *RootDB) CompleteUser(email string) error {
	user, err := r.GetUserByEmail(email)
	if err != nil {
		return err
	}
	q := r.db.Model(&user).Update("is_completed", true)
	if q.Error != nil {
		fmt.Println(q.Error)
		return q.Error
	}
	return nil
}

func (r *RootDB) GetUserByEmail(email string) (User, error) {
	var users []User
	r.db.Find(&users)
	for _, user := range users {
		if user.Email == email {
			return user, nil
		}
	}
	return User{}, errors.New("User not found")
}

func (r *RootDB) CreateToken(user User) (string, string, error) {
	token := utils.GenerateToken()
	code := utils.GenerateCode()
	record := Token{Token: token, Code: code, User: user, Is_completed: false, UserID: user.ID}
	q := r.db.Create(&record)
	if q.Error != nil {
		return "", "", q.Error
	}
	return token, code, nil
}

func (r *RootDB) CompleteToken(token Token) error {
	q := r.db.Model(&token).Update("is_completed", true)
	if q.Error != nil {
		return q.Error
	}
	return nil
}

func (r *RootDB) GetUserFromToken(token Token) (User, error) {
	var users []User
	r.db.Find(&users)
	for _, user := range users {
		if user.ID == token.UserID {
			return user, nil
		}
	}

	return User{}, errors.New("User not found")
}

func (r *RootDB) VerifyToken(token, code string) (Token, error) {
	var tokens []Token
	r.db.Find(&tokens)
	fmt.Println(tokens)
	for _, t := range tokens {
		if t.Token == token && t.Code == code {
			return t, nil
		}
	}
	return Token{}, errors.New("Token not found")
}
