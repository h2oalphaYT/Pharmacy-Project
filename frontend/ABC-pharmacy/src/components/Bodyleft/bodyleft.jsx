import React from "react";
import styles from "./bodyleft.module.css"
import { getImageUrl } from "../../utils";
import Button from "../button/button";


export const  LeftBody = () => {

    return (
       <section className={styles.image2Parent}>
    
        <img className={styles.image2Icon} style={{marginRight:"40px"}} alt="pc image" src={getImageUrl("Body/pc.png")} />
        <div className={styles.frameParent}>
          <div className={styles.webMobileAppDevelopmentWrapper}>
            <div
              className={styles.webMobile}
            >{`Inventory, Sales & Other Drugs`}</div>
          </div>
          <div className={styles.yourWebAnd}>
         ABC Pharmacy Limited a 100% subsidiary of Sunshine Healthcare is one of the 1st branded retail Pharmaceutical Chains in Sri Lanka that has entered the market with a view of creating a difference in the retail pharmaceutical trade. Headed by a team of professionals, Healthguard has introduced an innovative concept centered on superior customer care, latest technology in data management, a wide product assortment, affordable prices and a host of value additions.
          </div>
          <div className={styles.button1}>
           <Button>Lern More</Button>
          </div>
        </div>
     
       </section>
    )
}