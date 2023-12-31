package controller

import (
	"mymodule/config"
	"mymodule/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func InvoiceCreate(c *gin.Context) {
	var body struct {
		Name        string             `json:"name"`
		MobileNo    string             `json:"mobileNo"`
		Email       string             `json:"email"`
		Address     string             `json:"address"`
		BillingType string             `json:"billingType"`
		ItemDetails []model.ItemDetail `json:"itemDetails"`
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	customersInvoice := model.Customer{
		Name:        body.Name,
		MobileNo:    body.MobileNo,
		Email:       body.Email,
		Address:     body.Address,
		BillingType: body.BillingType,
		ItemDetails: body.ItemDetails,
	}

	result := config.DB.Create(&customersInvoice)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"customersInvoice": customersInvoice})
}

func InvoiceView(c *gin.Context) {

	var customersInvoice []model.Customer

	// Get all records
	config.DB.Preload("ItemDetails").Find(&customersInvoice)

	c.JSON(http.StatusOK, gin.H{
		"customersInvoice": customersInvoice,
	})
}

func GetOneInvoice(c *gin.Context) {
	ID := c.Param("id")

	var customersInvoice model.Customer

	if err := config.DB.Preload("ItemDetails").First(&customersInvoice, ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Invoice not available"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"customersInvoice": customersInvoice})
}

func InvoiceUpdate(c *gin.Context) {
	//Get item offf url
	ID := c.Param("id")

	//get data from requst body
	var body struct {
		Name        string             `json:"Name"`
		MobileNo    string             `json:"mobileNo"`
		Email       string             `json:"email"`
		Address     string             `json:"address"`
		BillingType string             `json:"billingType"`
		ItemDetails []model.ItemDetail `json:"itemDetails"`
	}

	// Bind the request body to the struct
	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//find the item were updating
	var customersInvoice model.Customer
	config.DB.First(&customersInvoice, ID)

	config.DB.Model(&customersInvoice).Updates(model.Customer{
		Name:        body.Name,
		MobileNo:    body.MobileNo,
		Email:       body.Email,
		Address:     body.Address,
		BillingType: body.BillingType,
		ItemDetails: body.ItemDetails,
	})
	//respose it
	c.JSON(http.StatusOK, gin.H{
		"customersInvoice": customersInvoice,
	})
}

func InvoiceDelete(c *gin.Context) {
	//get id from url
	ID := c.Param("id")

	// Check if the item with the given ID exists
	var customersInvoice model.Customer
	if err := config.DB.First(&customersInvoice, ID).Error; err != nil {
		// Item not found
		c.JSON(http.StatusNotFound, gin.H{"error": "Item not available"})
		return
	}

	//delete the item
	result := config.DB.Delete(&model.Customer{}, ID)

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
