package controller

import (
	"mymodule/config"
	"mymodule/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ItemCreate(c *gin.Context) {
	var body struct {
		ItemName     string `json:"itemName"`
		UnitPrice    string `json:"unitPrice"`
		Quantity     string `json:"quantity"`
		ItemCategory string `json:"itemCategory"`
		Description  string `json:"description"`
	}

	// Bind the request body to the struct
	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create a new item using data from the request body
	items := model.Item{
		ItemName:     body.ItemName,
		UnitPrice:    body.UnitPrice,
		Quantity:     body.Quantity,
		ItemCategory: body.ItemCategory,
		Description:  body.Description,
	}

	// Create the item in the database
	result := config.DB.Create(&items) // pass pointer of data to Create

	// Check for errors during the database operation
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	// Return the created item
	c.JSON(http.StatusOK, gin.H{
		"items": items,
	})
}

func ItemsView(c *gin.Context) {

	var items []model.Item

	// Get all records
	config.DB.Find(&items)

	c.JSON(http.StatusOK, gin.H{
		"items": items,
	})
}

func GetOneItem(c *gin.Context) {

	//Get item offf url
	ID := c.Param("id")

	var item model.Item

	// Check if the item with the given ID exists
	if err := config.DB.First(&item, ID).Error; err != nil {
		// Item not found
		c.JSON(http.StatusNotFound, gin.H{"error": "Item not available"})
		return
	}

	// Get all records
	config.DB.First(&item, ID)

	c.JSON(http.StatusOK, gin.H{
		"items": item,
	})
}

func ItemUpdate(c *gin.Context) {
	//Get item offf url
	ID := c.Param("id")

	//get data from requst body
	var body struct {
		ItemName     string `json:"itemName"`
		UnitPrice    string `json:"unitPrice"`
		Quantity     string `json:"quantity"`
		ItemCategory string `json:"itemCategory"`
		Description  string `json:"description"`
	}

	// Bind the request body to the struct
	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//find the item were updating
	var item model.Item
	config.DB.First(&item, ID)

	config.DB.Model(&item).Updates(model.Item{
		ItemName:     body.ItemName,
		UnitPrice:    body.UnitPrice,
		Quantity:     body.Quantity,
		ItemCategory: body.ItemCategory,
		Description:  body.Description,
	})
	//respose it
	c.JSON(http.StatusOK, gin.H{
		"items": item,
	})
}

func ItemDelete(c *gin.Context) {
	//get id from url
	ID := c.Param("id")

	// Check if the item with the given ID exists
	var item model.Item
	if err := config.DB.First(&item, ID).Error; err != nil {
		// Item not found
		c.JSON(http.StatusNotFound, gin.H{"error": "Item not available"})
		return
	}

	//delete the item
	result := config.DB.Delete(&model.Item{}, ID)

	//respose it
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting item"})
		return
	}

	// Check if any rows were affected
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No item found with given ID"})
		return
	}

	// Respond with a success message
	c.JSON(http.StatusOK, gin.H{"message": "Successfully deleted item"})

}
