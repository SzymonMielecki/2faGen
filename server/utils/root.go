package utils

import (
	"crypto/sha256"
	"fmt"
	"math/rand"

	"github.com/google/uuid"
)

func HashFunc(password string) string {
	h := sha256.New()
	h.Write([]byte(password))
	return fmt.Sprintf("%x", h.Sum(nil))
}

func GenerateCode() string {
	min := 100000 // Minimum 6-digit number
	max := 999999 // Maximum 6-digit number
	randomNumber := rand.Intn(max-min+1) + min
	return fmt.Sprintf("%d", randomNumber)
}

func CompareHashAndPassword(hash, password string) bool {
	return hash == HashFunc(password)
}

func GenerateToken() string {
	return uuid.NewString()
}
