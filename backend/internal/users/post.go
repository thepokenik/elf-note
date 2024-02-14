package users

import (
	"github.com/gofiber/fiber/v2"
	"github.com/thepokenik/elf-note/internal/auth"
	"github.com/thepokenik/elf-note/internal/db"
)

var service Service

func Configure() {
	service = Service{
		Repository: Repository{
			Conn: db.Conn,
		},
	}
}

func registerUser(c *fiber.Ctx) error {

	var user *User

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

	if err := service.Create(user); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"message": "User created",
		"user":    user,
	})
}

// func getUsers(c *fiber.Ctx) error {
// 	return c.JSON(fiber.Map{
// 		"users": users,
// 	})
// }

// func getUserbyID(c *fiber.Ctx) error {
// 	id := c.Params("id")
// 	userID, err := uuid.Parse(id)

// 	if err != nil {
// 		return c.Status(400).JSON(fiber.Map{
// 			"error":   true,
// 			"message": "Invalid ID",
// 		})
// 	}

// 	if err != nil {
// 		return c.Status(400).JSON(fiber.Map{
// 			"error":   true,
// 			"message": "Invalid ID",
// 		})
// 	}

// 	for _, user := range users {
// 		if user.ID == userID {
// 			return c.JSON(fiber.Map{
// 				"user": user,
// 			})
// 		}
// 	}

// 	return c.Status(404).JSON(fiber.Map{
// 		"error":   true,
// 		"message": "User not found",
// 	})
// }
