import {React, useEffect} from "react";

export default function ChatHeader({children,size}){
    const {lineHeight,height,padding,borderRadius,borderWidth}=size;
    return(
        <>
            <div  style={{
                width:'100%',
                lineHeight:lineHeight,
                height:height,
                backgroundColor:'rgba(0,0,0,0.5)',
                textAlign:"left",
                boxSizing:"border-box",
                padding:padding,
                borderRadius:borderRadius,
                borderColor:"rgba(0,0,0,1)",
                borderWidth:borderWidth,
                color:"black",
                marginBottom:"auto",
            }}>
                {children}
            </div>
        </>
    )
}