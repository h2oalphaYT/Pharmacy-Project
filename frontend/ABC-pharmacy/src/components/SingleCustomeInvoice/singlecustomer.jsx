import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import "boxicons/css/boxicons.min.css";
import Navigation from "../Nav/navigation";
import styles from "./singlecustomer.module.css";
import { getImageUrl } from "../../utils";
import axios from "axios";
import toast from "react-hot-toast";


export const SingleCustomerInvoice = () => {
  const [invoiceCustomer, setCustomerInvoice] = useState("");

  const[invoice , setInvoices] = useState([])


  const [search, setSearch] = useState("");

  const id = localStorage.getItem("userID");
  console.log(search);

  useEffect(() => {
    function fetchItem() {
      axios
        .get("http://localhost:8080/invoice/" + id)
        .then((res) => {
          console.log(res.data.customersInvoice);
          setCustomerInvoice(res.data.customersInvoice);

          console.log(res.data.customersInvoice.itemDetails)
          if (res.data.customersInvoice && Array.isArray(res.data.customersInvoice.itemDetails)) {
            setInvoices(res.data.customersInvoice.itemDetails);
          } else {
            // If ItemDetails is not an array or does not exist, setInvoices to an empty array
            setInvoices([]);
          }
          
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
  return (
    <div>
      <Navigation />
      <body className={styles.AllItem}>
        <main className={styles.table}>
          <section className={styles.table__header}>
            <Link
              to=""
              style={{
                textDecoration: "none",
                backgroundColor: "transparent !important",
              }}
            >
              <h1
                style={{
                  backgroundColor: "transparent !important",
                  fontWeight: "700",
                }}
              >
                {invoiceCustomer.Name} Invoices...
              </h1>{" "}
            </Link>
           
            <Link to="/invoice-list">
              <Button variant="outline-primary" size="lg" >
                All Customers
              </Button>
            </Link>
            <div className={styles.export__file}>
              <label
                htmlFor="export-file"
                className={styles.export__file_btn}
                title="Export File"
              >
                <i className="bx bx-menu"></i>
              </label>
              <input type="checkbox" id="export-file" />
              <div className={styles.export__file_options}>
                <label>Export As &nbsp; &#10140;</label>
                <label htmlFor="export-file" id="toPDF">
                  PDF <img src={getImageUrl("Body/pdf.png")} alt="pdf" />
                </label>
              </div>
            </div>
          </section>
          <section className={styles.table__body}>
            <table id="stock-table">
              <thead>
                <tr style={{ color: "white" }}>
                  <th>Item Name </th>
                  <th> Quantity</th>
                  <th> Unit Price </th>
                  <th> Total</th>
                  
                </tr>
              </thead>
              <tbody>
  {invoice.map((invoice, index) => (
    <tr key={index}>
      <td>{invoice.name}</td>
      <td>{invoice.quantity}</td>
      <td>$ {invoice.rate}</td>
      <td style={{fontWeight:"800"}}>$ {invoice.quantity * invoice.rate}</td> 
    </tr>
  ))}
</tbody>
            </table>
          </section>
        </main>
      </body>
    </div>
  );
};
