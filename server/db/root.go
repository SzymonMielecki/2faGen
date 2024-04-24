package db

import (
	"errors"

	"gorm.io/driver/sqlite"
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
	User         User `gorm:"embedded"`
	Is_completed bool
}

func NewRootDB(path string) (*RootDB, error) {
	db, err := gorm.Open(sqlite.Open(path), &gorm.Config{})
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

func (r *RootDB) CreateUser(name, email, password string) (User, error) {
	q := r.db.Create(&User{Name: name, Email: email, Password_hash: utils.HashFunc(password), Is_completed: false})
	if q.Error != nil {
		return User{}, q.Error
	}
	return r.GetUserByEmail(email)
}

func (r *RootDB) CompleteUser(email string) error {
	q := r.db.Where("email = ?", email).Update("is_completed", true)
	if q.Error != nil {
		return q.Error
	}
	return nil
}

func (r *RootDB) GetUserByEmail(email string) (User, error) {
	var user User
	r.db.Where("email = ?", email).First(&user)
	if user == (User{}) {
		return User{}, errors.New("User not found")
	}
	return user, nil
}

func (r *RootDB) CreateToken(user User) (string, string, error) {
	token := utils.GenerateToken()
	code := utils.GenerateCode()
	q := r.db.Create(&Token{Token: token, Code: code, User: user, Is_completed: false})
	if q.Error != nil {
		return "", "", q.Error
	}
	return token, code, nil
}

func (r *RootDB) GetTokenByUser(user User) (Token, error) {
	var token Token
	r.db.Where("user_id = ?", user.ID).First(&token)
	if token == (Token{}) {
		return Token{}, errors.New("Token not found")
	}
	return token, nil
}

func (r *RootDB) CompleteToken(token Token) error {
	q := r.db.Model(&token).Update("is_completed", true)
	if q.Error != nil {
		return q.Error
	}
	return nil
}

func (r *RootDB) VerifyToken(token, code string) (Token, error) {
	var t Token
	r.db.Where("code = ? AND token = ?", code, token).First(&t)
	if t == (Token{}) {
		return Token{}, errors.New("Token not found")
	}
	return t, nil
}
