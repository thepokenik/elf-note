package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func main() {

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	users := []User{}

	app.Post("/api/register", func(c *fiber.Ctx) error {
		var user User
		if err := c.BodyParser(&user); err != nil {
			return c.Status(400).JSON(fiber.Map{
				"error": true,
				"message": "Invalid JSON",
			})
		}
		users = append(users, user)
		return c.JSON(fiber.Map{
			"message": "User created",
			"user": user,
		})
	})

	app.Patch("/api/user/:id", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")

		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"error": true,
				"message": "Invalid ID",
			})
		}

		for i, user := range users {
			if user.ID == id {
				var newUser User
				if err := c.BodyParser(&newUser); err != nil {
					return c.Status(400).JSON(fiber.Map{
						"error": true,
						"message": "Invalid JSON",
					})
				}
				users[i] = newUser
				return c.JSON(fiber.Map{
					"message": "User updated",
					"user": newUser,
				})
			}
		}

		return c.Status(404).JSON(fiber.Map{
			"error": true,
			"message": "User not found",
		})
	})

	app.Get("/api/user/:id", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")

		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"error": true,
				"message": "Invalid ID",
			})
		}

		for _, user := range users {
			if user.ID == id {
				return c.JSON(fiber.Map{
					"user": user,
				})
			}
		}

		return c.Status(404).JSON(fiber.Map{
			"error": true,
			"message": "User not found",
		})
	})

	// return all

	app.Get("/api/users", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"users": users,
		})
	})
	

	log.Fatal(app.Listen(":4000"))

}