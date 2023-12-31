import React, { useEffect, useState } from "react";
import Navigation from "../../Nav/navigation";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from "./viewItem.module.css"
import {getImageUrl} from "../../../utils"
import Button from "../../button/button";
import axios from "axios";
import toast from "react-hot-toast";

export const ViewItem = () => {

    
    const id = localStorage.getItem("userID");
    const [item, setItem] = useState("");

    console.log(id)

    
  useEffect(() => {
    function fetchItem() {
      axios
        .get("http://localhost:8080/items/" + id)
        .then((res) => {
          console.log(res.data.items);
          setItem(res.data.items);
          toast.success("Data Fetched!", {
            duration: 3000, // 3 seconds
            position: "top-right", // You can change the position if needed
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchItem();
  }, [id]);

  const date = new Date(item.CreatedAt).toLocaleDateString();
  console.log(date);

    return (
        <div>
            <Navigation/>

<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',overflow:"auto" }}>
            
    <Card style={{ width: '30rem' }} className={styles.card_design}>
      <Card.Img variant="top" src={getImageUrl("Body/drugs.png")} alt="image" />
      <Card.Body>
        <Card.Title>{item.ItemName}</Card.Title>
        <Card.Text>
          {item.Description}
         
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Cetogary : <span style={{fontFamily:"Lato" , fontWeight:"600" , color: "#f28d35"}}>{item.ItemCategory}</span></ListGroup.Item>
        <ListGroup.Item>Quantity : <span style={{fontFamily:"Lato" , fontWeight:"600" , color: "#f28d35"}}>{item.Quantity}</span></ListGroup.Item>
        <ListGroup.Item>Unit Price :<span style={{fontFamily:"Lato" , fontWeight:"800" , color: "red"}}>{item.UnitPrice} Lkr</span></ListGroup.Item>
        <ListGroup.Item>Stoked Date :<span style={{fontFamily:"Lato" , fontWeight:"1000" , color: "#f28d35"}}>{date}</span></ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="/all"><Button className={styles.getFreeConsultation}>Inventory</Button></Card.Link>
        
      </Card.Body>
    </Card>
    </div>
        </div>
    )
}