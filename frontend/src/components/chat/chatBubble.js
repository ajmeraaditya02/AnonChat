import {React,useEffect,useState,useRef} from "react"

export default function Bubble({message,sent,first,time}){
    const bubbleTextRef=useRef(null);
    const [long,setLong]=useState(false)
    const [collapsed,setCollapsed]=useState(true)
    useEffect(()=>{    
        const lineHeight=parseFloat(getComputedStyle(bubbleTextRef.current).getPropertyValue('line-height'));
        const height=parseFloat(getComputedStyle(bubbleTextRef.current).getPropertyValue('height'));
        if(height>5.1*lineHeight)
            setLong(true)
    },[])
    return (
        <>
            <div 
                className="bubbleContainer" 
                style={{
                    marginTop:first?"auto":"",
                    marginBottom:"10px",
                    marginRight:sent?"0px":"auto",
                    marginLeft:sent?"auto":"0",
                    backgroundColor:sent?"rgba(255,255,255,0.4)":"white",
                    padding:"4px 10px",
                    border:`${sent?"white":"black"} solid 2px`,
                    borderRadius:"10px",
                    maxWidth:"80%",
                    wordBreak:"break-word",
                }}
            >
                <pre className="bubble" 
                ref={bubbleTextRef}
                style={{
                        minWidth:"50px",
                        fontSize:"1.1em",
                        padding:"0px",
                        margin:"0px",
                        color:"black",
                        textWrap:"wrap",
                        height:(long&&collapsed?"calc(3*1.5*1.1em)":""),
                        overflowY:"hidden"
                    }}
                >
                    {message}
                </pre>
                <div 
                    style={{
                        display:"flex",
                        justifyContent:(long?"space-between":"flex-end"),
                    }}
                >
                    {long?
                        <div className="collapseButton" 
                            style={{
                                transform:(collapsed?"translateX(calc(0.1*1.5*1.1em)) translateY(calc(0.1*1.5*1.1em))":"translateX(calc(0.2*1.5*1.1em)) translateY(calc(0.2*1.5*1.1em))"),
                                height:"0.6em",
                                width:"0.6em",
                                borderColor:"black",
                                borderWidth:"2px",
                                borderLeft:collapsed?"none":"black solid 2px",
                                borderTop:collapsed?"none":"black solid 2px",
                                borderRight:!collapsed?"none":"black solid 2px",
                                borderBottom:!collapsed?"none":"black solid 2px",
                                rotate:"45deg",
                            }}
                            onClick={()=>setCollapsed(!collapsed)}
                        />:""
                    }
                    <div className="bubble" style={{
                        textAlign:"right",
                        color:"rgba(0,0,0,0.5)",
                        fontSize:"0.9em",
                        paddingLeft:"5px",
                    }}>
                        {time}
                    </div>
                </div>
            </div>
        </>
    )
}