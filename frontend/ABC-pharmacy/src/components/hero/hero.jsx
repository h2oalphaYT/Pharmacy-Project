import React from "react";
import { getImageUrl } from "../../utils";
import styles from "./hero.module.css"
import Button from "../button/button";

export const Hero = () => {


    
    return (
        <section className={styles.container}>
            <img className={styles.heroImageIcon} alt="hero image" src={getImageUrl("hero/bg-child.png")} />

            <div className={styles.weCrushYourCompetitorsGoaParent}>
          <b className={styles.weCrushYour}>
          ABC is well known, well qualified, well organized in the health care Industry as a reputed, estimated, trusted and professional team-a designation gained by achieving exceptional business results, consequence and a consistently high degree of customer satisfaction.
          </b>
          <Button className={styles.getFreeConsultation}>Get free consultation</Button>
          
        </div>
        </section>
        
      
      
    )
}