import {React} from "react"

export default function Bubble({message,sent,first}){
    return (
        <>
            <div className="bubbleContainer" style={{
                marginTop:first?"auto":"",
                marginBottom:"10px",
                marginRight:sent?"0":"auto",
                marginLeft:sent?"auto":"0",
                backgroundColor:"white",
                padding:"4px 10px",
                border:"green solid 2px",
                borderRadius:"10px",
                maxWidth:"80%",
                wordBreak:"break-word",
            }}>
                <div className="bubble" style={{
                    padding:"0px",
                    margin:"0px",
                    color:sent===true?"purple":"green",
                    textWrap:"wrap",
                }}>
                    {message}
                </div>
            </div>
        </>
    )
}