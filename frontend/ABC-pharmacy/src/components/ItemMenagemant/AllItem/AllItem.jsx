import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import "boxicons/css/boxicons.min.css";
import Navigation from "../../Nav/navigation";
import styles from "./AllItem.module.css";
import { getImageUrl } from "../../../utils";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const AllItem = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    function getItems() {
      axios
        .get("http://localhost:8080/", getItems)
        .then((res) => {
          console.log(res.data.items);
          setItems(res.data.items);
          toast.success("Data Fetched Successfully!", {
            duration: 3000, // 3 seconds
            position: "top-center", // You can change the position if needed
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getItems();
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
        axios.delete("http://localhost:8080/" + id);
        window.location.reload();

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  function ViewItem(id) {
    console.log(id);
    localStorage.setItem("userID", id);
  }

  function UpdateItem(id) {
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
              to="/admin"
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
                Item's Inventory...
              </h1>{" "}
            </Link>
            <div className={styles.input_group}>
              <input
                type="search"
                placeholder="Search Item..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Link to="/add">
              <Button variant="outline-primary" size="lg">
                Add Items
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
                  <th> Item View </th>
                  <th> UnitPrice </th>
                  <th> Quantity</th>
                  <th> ItemCategory </th>
                  <th> Option</th>
                </tr>
              </thead>
              <tbody>
                {items
                  .filter((dataobj) => {
                    const lowerCaseSearch = search.toLowerCase();
                    const lowerCaseName = dataobj.ItemName.toLowerCase();
                    const lowerCaseItemCategory =
                      dataobj.ItemCategory.toLowerCase();

                    return (
                      lowerCaseSearch === "" ||
                      lowerCaseName.includes(lowerCaseSearch) ||
                      lowerCaseItemCategory.includes(lowerCaseSearch)
                    );
                  })
                  .map((dataobj) => {
                    return (
                      <tr key={dataobj.ID}>
                        <td>{dataobj.ItemName}</td>

                        <td>
                          <img src={getImageUrl("Body/drugs.png")} alt="" />
                        </td>

                        <td>{dataobj.UnitPrice}</td>

                        <td>{dataobj.Quantity}</td>

                        <td>{dataobj.ItemCategory}</td>

                        <td style={{ marginLeft: "auto" }}>
                          <button
                            className="bx bx-trash bx-lg btn btn-outline-danger"
                            style={{ margin: "10px" }}
                            onClick={() => DeleteItems(dataobj.ID)}
                          ></button>
                          <Link to="/single-item">
                            <button
                              className="bx bx-info-circle bx-lg btn btn-outline-primary"
                              style={{ margin: "10px" }}
                              onClick={() => ViewItem(dataobj.ID)}
                            ></button>
                          </Link>

                          <Link to="/update-item">
                            <button
                              className="bx bx-pencil bx-lg btn btn-outline-warning"
                              style={{ margin: "10px" }}
                              onClick={() => UpdateItem(dataobj.ID)}
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
