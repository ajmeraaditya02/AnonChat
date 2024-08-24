import {React, useEffect,useRef} from "react"
import ChatBubble from "./chatBubble"

export default function ChatContainer({chats,size}){
    const {lineHeight,height,margin,padding}=size;
    const chatContainerRef=useRef(null);
    useEffect(()=>{
        chatContainerRef.current.scrollTo({
            top:chatContainerRef.current.scrollHeight,
            behavior:"smooth",
        });
    },[chats])
    return (
        <>
            <div 
                ref={chatContainerRef}
                id="chatContainer" style={{
                    padding:padding,
                    lineHeight:lineHeight,
                    boxSizing:"border-box",
                    height:height,
                    border:"none",
                    margin:margin,
                    width:"100%",
                    display:"flex",
                    flexDirection:"column",
                    overflowY:"auto",
                }}
            >
                {chats.map((chat,index)=>(
                    <ChatBubble first={index===0} key={index} message={chat.message} time={chat.time} sent={chat.sent} />
                ))}
            </div>
        </>
    )
}