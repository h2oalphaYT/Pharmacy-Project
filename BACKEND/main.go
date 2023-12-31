package main

import (
	"context"
	"fmt"
	"log"

	"mymodule/config"
	"mymodule/controller"
	"mymodule/model" // Assuming this package contains the Employee and Item models

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v4"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {

	config.InitializeDB()

	dbConfig, err := config.LoadDBConfig()
	if err != nil {
		log.Fatal("Error loading database configuration: ", err)
	}

	// Establish a connection using pgx
	conn, err := pgx.Connect(context.Background(), dbConfig.ConnectionString())
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer conn.Close(context.Background())

	// Test the database connection
	var greeting string
	err = conn.QueryRow(context.Background(), "SELECT 'Database Successfully Connected! 🚀'").Scan(&greeting)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(greeting)

	// Setup GORM connection for ORM operations
	gormDB, err := gorm.Open(postgres.Open(dbConfig.ConnectionString()), &gorm.Config{})
	if err != nil {
		log.Fatal("Error setting up GORM: ", err)
	}

	// Setup database tables only after a successful database connection
	setupDatabase(gormDB)

	// Setup Gin web server
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"}
	config.AllowCredentials = true
	r.Use(cors.New(config))

	//items
	r.POST("/addItems", controller.ItemCreate)
	r.PUT("/item-update/:id", controller.ItemUpdate)

	r.GET("/", controller.ItemsView)
	r.GET("/items/:id", controller.GetOneItem)

	r.DELETE("/:id", controller.ItemDelete)

	//Customer invoice
	r.POST("/addinvoice", controller.InvoiceCreate)
	r.PUT("/invoice-update/:id", controller.InvoiceUpdate)

	r.GET("/allinvoice", controller.InvoiceView)
	r.GET("/invoice/:id", controller.GetOneInvoice)

	r.DELETE("/invoice/delete/:id", controller.InvoiceDelete)

	// Start Gin server and handle any potential error
	if err := r.Run(); err != nil {
		log.Fatal("Error starting Gin server: ", err)
	}
}

func setupDatabase(db *gorm.DB) {
	// AutoMigrate will create or update the tables based on the Employee and Item models
	if err := db.AutoMigrate(&model.Item{}, &model.Customer{},&model.ItemDetail{}); err != nil {
		log.Fatal("Error during database migration: ", err)
	}
}
