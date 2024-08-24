import { Button, Modal } from 'flowbite-react';
import { useState,useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { HiOutlineEmojiHappy,HiOutlineEmojiSad,HiOutlineExclamationCircle } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function MessagePop({isOpen,message,buttons,clearFields,OTPPage,status}) {
  const navigate=useNavigate();
  const [openModal, setOpenModal] = useState(isOpen);
  const [buttonsModal,setButtonsModal]=useState(buttons);
  const [modalMessage,setMessageModal]=useState(message);
  const [currentStatus,setStatusModal]=useState(status)
  const handleClick=(button)=>{
    if(button.link==="N/A")
    {
        setOpenModal(false);
    }
    else if(button.link==="_close_")
    {
      setOpenModal(false);
      clearFields();
    }
    else if(button.link==="_logout_")
    {
      (async ()=>{
        try{
          const response = await fetch(process.env.REACT_APP_BACKEND_LINK+'log/out',{
            method:'POST',
            credentials:'include',
            headers:{
              'Content-type':'application/json',
            },
          });
          const data=await response.json();
          if (response.ok)
          {
            navigate('/',{relative:"path"})
          }                 
          else throw new Error(data.message)
          setOpenModal(false);
        }
        catch(error)
        {
          setMessageModal(error.message)
          setStatusModal("sad")
          setButtonsModal([{name:"Close",link:"N/A",color:"failure"}])
        }
      })()
    }
    else if(button.link==="_suggestions_")
        window.location.href="https://adityagarg9102.netlify.app/#formContainer"
    else 
    {
      navigate(button.link,{relative:"path"})
      setOpenModal(false)
    }
  }
  function icon(){
    switch(currentStatus)
    {
      case "sad" : return <HiOutlineEmojiSad className="mt-6 mx-auto mb-4 h-14 w-14 text-red-700 dark:text-red-500" />
      case "happy" : return <HiOutlineEmojiHappy className="mt-6 mx-auto mb-4 h-14 w-14 text-green-400 dark:text-green-200" />
      case "wait": return <FontAwesomeIcon icon={faSpinner} className="mt-6 mx-auto mb-4 h-14 w-14 text-blue-700 dark:text-blue-500" 
                            style=
                              {{
                                  animation:"spin 1.5s ease-out infinite", 
                                  '@keyframes spin':{from:{transform:'rotate(0deg)'},to:{transform:'rotate(360deg)'}}
                              }}/>
      default : return <HiOutlineExclamationCircle className="mt-6 mx-auto mb-4 h-14 w-14 text-red-700 dark:text-red-500" />
    }
  }
  useEffect(() => {
    setOpenModal(isOpen);
    setButtonsModal(buttons);
    setMessageModal(message);
    setStatusModal(status);
  }, [isOpen,buttons,message,status]);
  return (
    <>
      <Modal show={openModal} size="sm" popup>
        <Modal.Body>
          <div className="text-center">
            {icon()}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {modalMessage.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </h3>
            <div className="flex flex-col items-center gap-4">
              {buttonsModal.map((button,index)=>(
                <Button className="w-full" color={button.color} onClick={()=>handleClick(button)} key={index}>
                  {button.name}
                </Button>            
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
