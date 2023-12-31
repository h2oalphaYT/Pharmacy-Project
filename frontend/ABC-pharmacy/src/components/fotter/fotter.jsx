import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./fotter.module.css"


export const FooterContent = () => {
  return (
    <footer id="fotter" className={styles.container}>
      <Container className="py-5">
        <Row className={styles.rowline}>
          <Col className="footer-col">
            <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
              <h2 className={styles.iconname}>ABC Pharmacy</h2>
              
            </a>
            <br/>
            <p className="my-3 text-white" id='testline' style={{ fontSize: "16px",textTransform:'capitalize' ,fontFamily:'Lato', fontWeight : 400 , lineHeight:"normal" , inlineSize:"max-content" , maxWidth:"447px" }}>
            We continue to strive and endeavor on our development with new Initiatives, enterprise to further provide our valued customers with new features to address future trends and technology advancement.
            </p>
          </Col>



          <Col className={styles.technologies}>
          <a href="/" className="d-flex fs-5 align-items-center text-white text-decoration-none " style={{ fontSize: "21px",textTransform:'capitalize' , fontWeight : 600 }}>
          CONTACT US </a>
          <ul className="list-unstyled text-white my-3" style={{ fontSize: "14px",textTransform:'capitalize' , fontWeight : 500 , fontFamily:'Inter' }}>
              <li className={styles.list}>#186 Level 1</li>
              <li className={styles.list}>Hill Street, Dehiwala</li>
              <li className={styles.list}>Sri Lanka</li>
              <li className={styles.list}>Phone: +94 112 710 740/ +94 773 735 747</li>
              <li className={styles.list}>mail: info@systolic.biz</li>
              <a href='https://chanuka-devin-info-portfolio.netlify.app' style={{color:"white"}}><li className={styles.list}>my.info</li></a>
              
            </ul>
          </Col>
         

          <Col className={styles.services}>
          <a href="/" className="d-flex fs-5 align-items-center text-white text-decoration-none " style={{ fontSize: "21px",textTransform:'capitalize' , fontWeight : 600 }}>
          Our Services </a>
          <ul className="list-unstyled text-white my-3" style={{ fontSize: "14px",textTransform:'capitalize' , fontWeight : 500 , fontFamily:'Inter' }}>
              <li className={styles.list}>Cosmetic & Fragrances</li>
              <li className={styles.list}>Grugs Delivering</li>
              <li className={styles.list}>Helthcare Servise</li>
              <li className={styles.list}>Google Marketing solutions</li>
              <li className={styles.list}>Inventory Manegemant</li>
             
              
            </ul>
          </Col>
        </Row>
        
        <Row>
       
          <Col className="text-center mt-5">
          <hr className="line" style={{ borderTop:"2px solid white"}}/>
            <small className='text-white'>Privacy Policy | Terms & Conditions.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
