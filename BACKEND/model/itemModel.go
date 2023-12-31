// model/item.go
package model

import "gorm.io/gorm"

type Item struct {
	gorm.Model
	ItemName     string `gorm:"type:varchar(100);not null"`
	UnitPrice    string `gorm:"not null"`
	Quantity     string
	ItemCategory string `gorm:"type:varchar(100)"`
	Description  string `gorm:"type:varchar(1000)"`
}
