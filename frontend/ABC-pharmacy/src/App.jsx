import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./Page/Home";
import { AddItem } from "./components/ItemMenagemant/AddItem/AddItem";
import { AllItem } from "./components/ItemMenagemant/AllItem/AllItem";
import { ViewItem } from "./components/ItemMenagemant/ViewItem/viewItem";
import { UpdateItem } from "./components/ItemMenagemant/updateItem/updateItem";
import { ProductInvoice } from "./components/Invoice/ProductInvoice";
import { InvoiceList } from "./components/InvoiceList/InvoiceList";
import { SingleCustomerInvoice } from "./components/SingleCustomeInvoice/singlecustomer";


function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Toaster
          position="top-center"
          toastOptions={{ duration: 3000 }}
        ></Toaster>
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/all" element={<AllItem />} />
          <Route path="/single-item" element={<ViewItem />} />
          <Route path="/update-item" element={<UpdateItem />} />
          <Route path="/addinvoice" element={<ProductInvoice />} />
          <Route path="/invoice-list" element={<InvoiceList />} />
          <Route path="/customer-details" element={<SingleCustomerInvoice />} />
          
        </Routes>
      </div>
    </Router>
  );
}
export default App;
