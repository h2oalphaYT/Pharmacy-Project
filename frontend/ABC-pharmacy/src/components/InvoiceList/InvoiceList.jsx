import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import "boxicons/css/boxicons.min.css";
import Navigation from "../Nav/navigation";
import styles from "./InvoiceList.module.css";
import { getImageUrl } from "../../utils";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const InvoiceList = () => {
  const [invoice, setInvoice] = useState([]);
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    function getInvoice() {
      axios
        .get("http://localhost:8080/allinvoice", getInvoice)
        .then((res) => {
          console.log(res.data.customersInvoice);
          setInvoice(res.data.customersInvoice);
          toast.success("Data Fetched Successfully!", {
            duration: 3000, // 3 seconds
            position: "top-center", // You can change the position if needed
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getInvoice();
  }, []);

    function DeleteItems(id) {
      console.log(id)

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this Item!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete("http://localhost:8080/invoice/delete/" + id);
          window.location.reload();

          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    }

    function ViewItem(id) {
      console.log(id);
      localStorage.setItem("userID", id);
    }


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
                Invoice List...
              </h1>{" "}
            </Link>
            <div className={styles.input_group}>
              <input
                type="search"
                placeholder="Search Item..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Link to="/addinvoice">
              <Button variant="outline-primary" size="lg">
                Add Invoices
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
                  <th>Customer Name </th>
                  <th> Email</th>
                  <th> Address </th>
                  <th> Mobile Number</th>
                  <th> Billing Method </th>
                  <th> Option</th>
                </tr>
              </thead>
              <tbody>
                {invoice
                  .filter((dataobj) => {
                    const lowerCaseSearch = search.toLowerCase();
                    const lowerCaseName = dataobj.Name.toLowerCase();
                    const lowerCaseBillingType =
                      dataobj.BillingType.toLowerCase();
                    const lowerCaseAddress = dataobj.Address.toLowerCase();

                    return (
                      lowerCaseSearch === "" ||
                      lowerCaseName.includes(lowerCaseSearch) ||
                      lowerCaseBillingType.includes(lowerCaseSearch) ||
                      lowerCaseAddress.includes(lowerCaseSearch)
                    );
                  })
                  .map((dataobj) => {
                    return (
                      <tr key={dataobj.ID}>
                        <td>{dataobj.Name}</td>

                        <td>
                        {dataobj.Email}
                        </td>

                        <td>{dataobj.Address}</td>

                        <td>{dataobj.MobileNo}</td>

                        <td>{dataobj.BillingType}</td>

                        <td style={{ marginLeft: "auto" }}>
                          <button
                            className="bx bx-trash bx-lg btn btn-outline-danger"
                            style={{ margin: "10px" }}
                            onClick={() => DeleteItems(dataobj.ID)}
                          ></button>
                          <Link to="/customer-details">
                            <button
                              className="bx bx-info-circle bx-lg btn btn-outline-primary"
                              style={{ margin: "10px" }}
                              onClick={() => ViewItem(dataobj.ID)}
                            ></button>
                          </Link>

                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </section>
        </main>
      </body>
    </div>
  );
};
