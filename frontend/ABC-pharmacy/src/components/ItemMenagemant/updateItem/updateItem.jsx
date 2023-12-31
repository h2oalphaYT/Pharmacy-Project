import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Navigation from "../../Nav/navigation";
import { Form, Container } from "react-bootstrap";
import styles from "./updateItem.module.css";
import Button from "../../button/button";
import { Link } from "react-router-dom";

export const UpdateItem = () => {
  const id = localStorage.getItem("userID");
  console.log(id);
  const Navigate = useNavigate();

  const [item, setItem] = useState({
    ItemName: "",
    UnitPrice: "",
    Quantity: "",
    ItemCategory: "",
    Description: "",
  });

  useEffect(() => {
    const fetchItem = () => {
      axios
        .get("http://localhost:8080/items/" + id)
        .then((res) => {
          toast.success("Data Fetched!", {
            duration: 3000, // 3 seconds
            position: "top-right", // You can change the position if needed
          });
          console.log(res.data.items);
          setItem(res.data.items);
        })
        .catch((err) => {
          alert(err.message);
        });
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItems) => ({
      ...prevItems,
      [name]: value,
    }));
  };

  const updateData = () => {
    axios
      .put("http://localhost:8080/item-update/" + id, item)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "SuccessFully Updated!",
          showConfirmButton: false,
          timer: 150,
        });

        
      })
      .catch((err) => {
        alert("Error updating data: " + err.message);
      });
  };

  return (
    <div>
      <Navigation />

      <div>
        <Container
          className={styles.form_container}
          style={{ width: "800px", height: "100%" }}
        >
          <Form onSubmit={updateData}>
            <h3 className="mb-4 title text" style={{ fontWeight: "600" }}>
              Update Item Details Here...
            </h3>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                id="ItemName"
                name="ItemName"
                value={item.ItemName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUnitPrice">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter unit price"
                id="UnitPrice"
                name="UnitPrice"
                value={item.UnitPrice}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min="0"
                id="Quantity"
                name="Quantity"
                value={item.Quantity}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                id="Description"
                name="Description"
                value={item.Description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formItemCategory">
              <Form.Label>Item Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter quantity"
                min="0"
                id="ItemCategory"
                name="ItemCategory"
                value={item.ItemCategory}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>

            <div className={styles.buttonContainer}>
            <Button className={styles.getFreeConsultation}>
              Update Item Details
            </Button>
            <Link to="/all">
            <Button className={styles.Inventorybtn}>
              Inventory
            </Button>
            </Link>

            </div>

            
          </Form>
        </Container>
      </div>
    </div>
  );
};
