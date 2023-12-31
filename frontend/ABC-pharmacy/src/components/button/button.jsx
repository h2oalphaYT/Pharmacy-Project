import React from "react";

function Button(props)
{
  const {children , style , onclick} = props
    return (

        <div>
            <button style={style ? style : {background: "#F28D35" ,textTransform:"uppercase", color : "#FFFFFF" , padding : "12px 20px" , alignItems : "flex-start" , gap:"8px" , display:"inline-flex" , border:"none" , fontSize:"14px",flexDirection:"row",fontWeight:"600"}} onClick={onclick}>{children}</button>
        </div>

    )
}
export default Button