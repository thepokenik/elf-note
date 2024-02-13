package users

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/thepokenik/elf-note/internal/auth"
)

var users []User

func registerUser(c *fiber.Ctx) error {

	user := new(User)

	user.ID = uuid.New()

	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid JSON",
		})
	}

	
	hashedPassword, err := auth.HashPassword(user.Password)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   true,
			"message": "Error hashing password",
		})
	}

	user.Password = hashedPassword
	users = append(users, *user)
	return c.JSON(fiber.Map{
		"message": "User created",
		"user":    user,
	})
}

func getUsers(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"users": users,
	})
}

func getUserbyID(c *fiber.Ctx) error {
	id := c.Params("id")
	userID, err := uuid.Parse(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid ID",
		})
	}

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid ID",
		})
	}

	for _, user := range users {
		if user.ID == userID {
			return c.JSON(fiber.Map{
				"user": user,
			})
		}
	}

	return c.Status(404).JSON(fiber.Map{
		"error": true,
		"message": "User not found",
	})
}