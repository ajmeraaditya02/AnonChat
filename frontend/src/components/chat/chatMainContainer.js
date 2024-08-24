import {React, useEffect} from "react"
export default function ChatMainContainer({children,size}){
    const {width,height,padding,borderRadius,borderWidth,boxShadow}=size;
    return (
        <>
            <div  id="mainContainer" style={{
                display:"flex",
                justifyContent:"flex-end",
                backgroundColor:"rgba(0,0,0,0.2)",
                width:width,
                height:height,
                // margin:"0px auto",
                flexDirection:"column",
                padding:padding,
                alignItems:"baseline",
                border:`black solid ${borderWidth}`,
                borderRadius:borderRadius,
                boxShadow:`${boxShadow.x} ${boxShadow.y} ${boxShadow.b} ${boxShadow.s} ${boxShadow.color}`,
            }}>
                {children}
            </div>
        </>
    )
}