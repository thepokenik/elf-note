package users

import (
	"errors"
)

var ErrUserNotFound = errors.New("User not found")

type Service struct {
	Repository Repository
}

func (p Service) Create(user *User) error {
	return p.Repository.CreateUser(user)
}
