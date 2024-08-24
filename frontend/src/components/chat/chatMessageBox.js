import {React,useState,useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function ChatMessageBox({getMessage,size}){
    const {buttonPadding,borderRadius,borderWidth,marginBottom,height,lineHeight}=size
    const [sendHover,setSendHover]=useState(false);
    const inputRef=useRef(null)
    return (
        <>
            <div  style={{
                    lineHeight:lineHeight,
                    height:height,
                    display:"flex",
                    width:"100%",
                    marginBottom:marginBottom,
                    border:`rgba(0,0,0,0.5) solid ${borderWidth}`,
                    borderRadius:borderRadius,
                    overflow:"hidden"
            }}>
                <textarea
                    ref={inputRef} 
                    style={{
                        whiteSpace:"pre",
                        flexGrow:"1",
                        width:"auto",
                        border:"none",
                        resize:"none",
                    }}
                >
                </textarea>
                <button 
                    style={{
                        border:"none",
                        backgroundColor:(sendHover?"rgba(0,0,0,0.5)":"black"),
                        padding:buttonPadding,
                    }}
                    onClick={(e)=>{
                        e.preventDefault()
                        if(inputRef.current.value.trim()==="")
                        {
                            inputRef.current.value="";
                            return ;
                        }
                        getMessage(inputRef.current.value)
                        inputRef.current.value="";
                    }}
                    onMouseEnter={()=>setSendHover(true)}
                    onMouseLeave={()=>setSendHover(false)}
                >
                    <FontAwesomeIcon icon={faPaperPlane} style={{
                        color:(sendHover?"black":"white"), 
                        opacity:"1",
                    }}/>
                </button>
            </div>
        </>
    )
}