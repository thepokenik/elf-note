package users

import "github.com/gofiber/fiber/v2"

func SetRoutes(r fiber.Router) {
	users := r.Group("/users")

	// Create an user
	users.Post("/register", registerUser)

	// Login
	users.Post("/login", login)

	// // Get all users
	// users.Get("/", getUsers)

	// // Get user by ID
	// users.Get("/:id", getUserbyID)

}
