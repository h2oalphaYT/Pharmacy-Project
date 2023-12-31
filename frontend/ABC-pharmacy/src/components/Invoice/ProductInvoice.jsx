import React, { useEffect, useState } from "react";
import styles from "./ProductInvoice.module.css";
import Navigation from "../Nav/navigation";
import "boxicons";
import Button from "../button/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

// Adjust import path as needed

export const ProductInvoice = () => {
  const [itemsName, setItemsName] = useState([]);

  const [itemDetails, setSavedItems] = useState([]);

  const [Name, setName] = useState("");
  const [MobileNo, setMobileNo] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [BillingType, setBillingType] = useState("");

  const Navigate = useNavigate();

  useEffect(() => {
    function getItems() {
      axios
        .get("http://localhost:8080/", getItems)
        .then((res) => {
          console.log(res.data.items);
          const itemDetails = res.data.items.map((items) => ({
            name: items.ItemName,
            price: items.UnitPrice, // Assuming the price field is named 'ItemPrice'
          }));

          console.log(itemDetails);
          setItemsName(itemDetails);
          toast.success("Data Fetched Successfully!", {
            duration: 3000, // 3 seconds
            position: "top-right", // You can change the position if needed
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getItems();
  }, []);

  const [items, setItems] = useState([{ name: "", rate: 0, quantity: 1 }]);

  const handleItemChange = (index, field, value) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value };

        if (field === "name") {
          const selectedItem = itemsName.find((i) => i.name === value);
          updatedItem.rate = selectedItem ? selectedItem.price : 0;
        }

        return updatedItem;
      }
      return item;
    });

    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", rate: 0, quantity: 1 }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const saveItem = (index) => {
    const itemToSave = items[index];
    const formattedItem = {
      // Assuming your ItemDetail model has these fields
      Name: itemToSave.name,
      Quantity: itemToSave.quantity,
      Rate: itemToSave.rate,
    };
    
    setSavedItems([...itemDetails, formattedItem]);
    toast.success("Item added successfully", {
      duration: 3000,
      position: "top-right",
    });
  };

  console.log(itemDetails);

  const hendleSubmit = async (e) => {

    e.preventDefault();

    if (!Name && !MobileNo && !Email && !Address && !BillingType) {
      toast.error("Please fill in all customer details.", {
        duration: 3000,
        position: "top-right",
      });
      return; // Stop the function if customer details are missing
    }

    if (itemDetails.length === 0) {
      toast.error("Please add at least one item to the invoice.", {
        duration: 3000,
        position: "top-right",
      });
      return; // Stop the function if no items are added
    }

    try {
      const newInvoice = {
        Name,
        MobileNo,
        Email,
        Address,
        BillingType,
        ItemDetails : itemDetails,
      };
      const userResponce = await axios.post(
        "http://localhost:8080/addinvoice",
        newInvoice,
        { withCredintials: true }
      );

      console.log(userResponce.data);

      setName("");
      setMobileNo("");
      setEmail("");
      setBillingType("");
      setAddress("");
      setSavedItems("")

      toast.success("Successfully Registered!", {
        duration: 3000,
        position: "top-right",
      });

      Navigate("/invoice");
    } catch (error) {
      console.error("Error sending invoice data:", error.response);
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
      <div className={styles.invoiceContainer}>
        <header>
          <h1>Invoice</h1>
          <address>
            <p>
              Jonathan Neal <br />
              101 E. Chapman Ave
              <br />
              Orange, CA 92866
              <br />
              (800) 555-1234{" "}
            </p>
          </address>

          <span style={{ fontSize: "20px", fontWeight: "600" ,color:"gray"}}>
            ABC Pharmacy
          </span>
        </header>
        <br />
        <article>
          <h4 style={{ fontWeight: "600" }}>Recipient</h4>
          <address className={styles.addressContainer}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Customer Name"
                className={styles.input}
                value={Name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="address" className={styles.label}>
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Customer Address"
                className={styles.input}
                value={Address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Customer Phone"
                className={styles.input}
                value={MobileNo}
                onChange={(e) => {
                  setMobileNo(e.target.value);
                }}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Customer Email"
                className={styles.input}
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
          </address>
          <table className={styles.meta}>
            <tr>
              <th>
                <span>Invoice #</span>
              </th>
              <td>
                <span>101138</span>
              </td>
            </tr>
            <tr>
              <th>
                <span>Date</span>
              </th>
              <td>
                <span>January 1, 2022</span>
              </td>
            </tr>
            <tr>
              <th>
                <span>Amount Due</span>
              </th>
              <td>
                <span id="prefix">$</span>
                <span>600.00</span>
              </td>
            </tr>
          </table>
          <br />
          <Form.Group className="mb-3" controlId="formItemCategory">
            <Form.Label>Item Category</Form.Label>
            <Form.Select
              defaultValue="CASH"
              id="ItemCategory"
              value={BillingType}
              onChange={(e) => {
                setBillingType(e.target.value);
              }}
              style={{ backgroundColor: "white" , border:"2px solid #6b3cc9" }}
              required
            >
              <option>Select category</option>
              <option value="CASH">CASH</option>
              <option value="DEBIT">DEBIT</option>
              <option value="CREDIT">CREDIT</option>
            </Form.Select>
          </Form.Group>
          <table className={styles.inventory}>
            <thead>
              <tr>
                <th>
                  <span>Item Name</span>
                </th>
                <th>
                  <span>Rate</span>
                </th>
                <th>
                  <span>Quantity</span>
                </th>

                <th>
                  <span>Price</span>
                </th>

                <th>
                  <span>Option</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <button
                      onClick={() => removeItem(index)}
                      style={{
                        margin: "10px",
                        color: "red",
                        background: "white",
                      }}
                    >
                      <i className="bx bx-minus bx-sm"></i>
                    </button>

                    <select
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                      required
                      style={{width:"70%" , padding:"5px"}}
                    >
                      <option value="" className="select">
                        Select Item
                      </option>
                      {itemsName.map((itemsName, idx) => (
                        <option key={idx} value={itemsName.name}>
                          {itemsName.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        handleItemChange(index, "rate", e.target.value)
                      }
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                      required
                    />
                  </td>

                  <td>$ {item.rate * item.quantity}</td>

                  <td>
                    <button
                      onClick={() => saveItem(index)}
                      style={{
                        margin: "10px",
                        color: "white",
                        background: "orange",
                        border: "none",
                        padding: "10px",
                        fontWeight: "600",
                      }}
                    >
                      ADD
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={addItem}
            style={{ margin: "10px", color: "green", background: "white" }}
          >
            <i className="bx bx-plus bx-sm"></i>
          </button>

          <table className={styles.balance}>
            <tr>
              <th>
                <span>Total</span>
              </th>
              <td>
                <span data-prefix="$"></span>
                <span>
                  {items
                    .reduce((acc, item) => acc + item.rate * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </td>
            </tr>
            <tr>
              <th>
                <span>Amount Paid</span>
              </th>
              <td>
                <span data-prefix="$"></span>
                <span>0.00</span>
              </td>
            </tr>
            <tr>
              <th>
                <span>Balance Due</span>
              </th>
              <td>
                <span data-prefix="$"></span>
                <span>
                  {items
                    .reduce((acc, item) => acc + item.rate * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </td>
            </tr>
          </table>
          <div className={styles.buttonContainer}>
            <Button onclick={hendleSubmit}>Save Invoice</Button>
            <Button>Print Invoice</Button>
          </div>
        </article>
        <aside>
          <h1>
            <span style={{ justifyContent: "center" }}>Additional Notes</span>
          </h1>

          <div>
            <hr />
            <p>
              A finance charge of 1.5% will be made on unpaid balances after 30
              days.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProductInvoice;
