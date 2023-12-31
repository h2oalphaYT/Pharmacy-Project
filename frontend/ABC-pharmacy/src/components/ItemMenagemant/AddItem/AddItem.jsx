import React, { useState } from "react";
import Navigation from "../../Nav/navigation";
import { Form, Container } from "react-bootstrap";
import styles from "./AddItem.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../../button/button";

export const AddItem = () => {
  const [ItemName, setName] = useState("");
  const [UnitPrice, setprice] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [ItemCategory, setCetegory] = useState("");
  const [Description, setDescription] = useState("");

  const Navigate = useNavigate();

  const hendleSubmit = async (e) => {
    e.preventDefault();

   

    try {
     
     
      const newItem = {
        ItemName,
        UnitPrice,
        Quantity,
        ItemCategory,
        Description,
      };
      const userResponce = await axios.post(
        "http://localhost:8080/addItems",
        newItem,
        { withCredintials: true }
      );

      console.log(userResponce);
      console.log("hello vade hari");

      setName("");
      setprice("");
      setQuantity("");
      setCetegory("");
      setDescription("");

      toast.success("Successfully Registered!", {
        duration: 3000,
        position: "top-right",
      });

      Navigate("/all");
    } catch (error) {
      toast.error("Failed To Register", {
        duration: 3000,
        position: "top-right",
      });

      console.log(error);
    }
  };

  return (
    <div>
      <Navigation />
      <div>
        <Container
          className={styles.form_container}
          style={{ width: "800px", height: "600px" }}
        >
          <Form onSubmit={hendleSubmit}>
            <h3 className="mb-4 title text" style={{ fontWeight: "600" }}>
              Add Item Here...
            </h3>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                id="ItemName"
                value={ItemName}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUnitPrice">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter unit price"
                id="UnitPrice"
                value={UnitPrice}
                onChange={(e) => {
                  setprice(e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                min="0"
                id="Quantity"
                value={Quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Enter Item Description"
                id="ItemName"
                value={Description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formItemCategory">
              <Form.Label>Item Category</Form.Label>
              <Form.Select
                defaultValue="Helth"
                id="ItemCategory"
                value={ItemCategory}
                onChange={(e) => {
                  setCetegory(e.target.value);
                }}
                required
              >
                <option>Select category</option>
                <option value="Helth">Helth</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Hair Care">Hair Care</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Mothers & Baby">Mothers & Baby</option>
                <option value="Men's">Men's</option>
                <option value="Cosmetics & Fragrances">Cosmetics & Fragrances</option>
              </Form.Select>
            </Form.Group>

           
            <Button variant="primary" type="submit">
              Add Item
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};
