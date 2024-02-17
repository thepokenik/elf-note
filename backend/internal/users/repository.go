package users

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v4/pgxpool"
)

type Repository struct {
	Conn *pgxpool.Pool
}

func (r *Repository) CreateUser(user *User) error {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	fmt.Println(r.Conn)

	_, err := r.Conn.Exec(
		ctx,
		"INSERT INTO users (username, email, password, profile_pic) VALUES ($1, $2, $3, $4)",
		user.Username,
		user.Email,
		user.Password,
		user.ProfilePic,
	)

	return err
}

func (r *Repository) GetByEmail(email string) (string, string, error) {
	
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var user User

	var hashedPassword string

	var id string

	row := r.Conn.QueryRow(
		ctx,
		"SELECT email, id, password FROM users WHERE email = $1",
		email,
	)

	err := row.Scan(
		&user.Email,
		&id,
		&hashedPassword,
	)

	return id, hashedPassword, err
}
