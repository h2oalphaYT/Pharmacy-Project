package model

import "gorm.io/gorm"

type Customer struct {
	gorm.Model
	Name        string `gorm:"type:varchar(100);"`
	MobileNo    string
	Email       string       `gorm:"type:varchar(100);"`
	Address     string       `gorm:"type:varchar(100);"`
	BillingType string       `gorm:"type:varchar(100);"`
	ItemDetails []ItemDetail `json:"itemDetails"`
}

type ItemDetail struct {
	gorm.Model
	CustomerID uint  `json:"customerID"`
	Name       string `json:"name"`
	Quantity   string `json:"quantity"`
	Rate       string `json:"rate"`
}
