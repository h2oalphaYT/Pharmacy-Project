import React from "react";
import styles from "./bodyright.module.css"
import { getImageUrl } from "../../utils";
import Button from "../button/button";

export const  RightBody = () => {

    return (
       <section>
        <div className={styles.frameGroup}>
        <div className={styles.frameParent}>
          <div className={styles.webMobileAppDevelopmentWrapper}>
            <div className={styles.webMobile}>Invoice Menagemant & Drug Riception</div>
          </div>
          <div className={styles.yourWebAnd}>
          Managing invoices can be a challenging & time-consuming task, especially if you are procuring, storing, processing & approving thousands of invoices every month. Misfiled Invoices can get lost, and even filed invoices can get stuck at specific steps in the approval pipeline & nobody would come to know who or what is causing the delay.
          </div>
          <div className={styles.button1}>
           <Button>Lern More</Button>
          </div>
        </div>
        <img className={styles.image1Icon} style={{marginLeft:"40px"}}  alt="" src={getImageUrl("Body/search.png")} />
      </div>
       </section>
    )
}