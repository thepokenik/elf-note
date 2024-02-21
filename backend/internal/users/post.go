package users

import (
	"encoding/json"
	"fmt"
	"io"

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

	var user User

	userData := c.FormValue("user")
	if err := json.Unmarshal([]byte(userData), &user); err != nil {
		fmt.Println("Error parsing user data", err)
		return c.Status(400).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid user data",
		})
	}

	// Get the profile picture file
	file, err := c.FormFile("profilePic")
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error":   true,
			"message": "Error getting profile picture",
		})
	}

	// Open the file
	profilePic, err := file.Open()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   true,
			"message": "Error opening profile picture",
		})
	}
	defer profilePic.Close()

	// Read the file into a byte array
	profilePicBytes, err := io.ReadAll(profilePic)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   true,
			"message": "Error reading profile picture",
		})
	}

	user.ProfilePic = profilePicBytes

	hashedPassword, err := auth.HashPassword(user.Password)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   true,
			"message": "Error hashing password",
		})
	}

	user.Password = hashedPassword

	if err := service.Create(&user); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"message": "User created",
		"user":    user,
	})
}

func login(c *fiber.Ctx) error {

	var user *User

	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid JSON",
		})
	}

	id, hashedPassword, err := service.GetByEmail(user.Email)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid email or password",
		})
	}

	if !auth.CheckPassword(user.Password, hashedPassword) {
		return c.Status(400).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid email or password",
		})
		
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "User logged in",
		"user": id,
	})
}
