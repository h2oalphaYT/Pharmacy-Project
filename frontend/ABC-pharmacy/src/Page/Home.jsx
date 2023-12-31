import React from "react";
import { Hero } from "../components/hero/hero";
import Navigation from "../components/Nav/navigation"
import { RightBody } from "../components/Bodyright/bodyright";
import {LeftBody} from "../components/Bodyleft/bodyleft"
import { FooterContent } from "../components/fotter/fotter";



export const Home = () => {

return (
<div>
    
        <Navigation/>
        <Hero/>
        <LeftBody/>
        <RightBody/>
        <FooterContent/>
    
    </div>
    )
 
} 