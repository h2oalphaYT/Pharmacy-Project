import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import styles from "./navigation.module.css";


function Navigation() {
  return (
    <>
      <Navbar id={styles.Container} className="navbar navbar-light fixed-top" style={{ backgroundColor: "#6b3cc9" }} expand="sm">
        
        <Container>
          <Navbar.Brand href="#home" style={{color:"white" , fontWeight:"700"}}>ABC Pharmacy</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.navbarTogglerIcon} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" className={styles.navlink}>HOME</Nav.Link>
              <Nav.Link href="#services" className={styles.navlink}>SERVICES</Nav.Link>
              <Nav.Link href="#aboutus" className={styles.navlink}>ABOUT US</Nav.Link>
              <NavDropdown title="ITEMS"  id="basic-nav-dropdown" className={`${styles.navlink} ${styles.navDropdownToggle}`}>
              <NavDropdown.Item href="/add" >Add Item</NavDropdown.Item>
              <NavDropdown.Item href="/all">View Item</NavDropdown.Item>
            </NavDropdown>
              <Nav.Link href="/invoice-list" className={styles.navlink}>INVOICES</Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
