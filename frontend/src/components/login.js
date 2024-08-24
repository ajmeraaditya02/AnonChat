import React, { useState ,useEffect,useRef} from "react";
import {Link , useNavigate} from "react-router-dom"
import MessagePop from "./messagePop";
import { PasswordInput,EmailInput, RoomID, SubmitButton } from "./inputs";
import AuthenticationHeader from "./authenticationHeader";


export default function Login() {
  const navigate=useNavigate();
  const roomButtonRef=useRef(null);
  const [userRole,setRole]=useState("creator");
  const [userID, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [roomID,setRoomID]=useState("");
  
  const handleRoomIDChange=(e)=>{
      setRoomID(e.target.value)
  };
  
  const handleEmailChange = (e) => {
      setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  };
  
  function clearFields(){
    setEmail("");
    setPassword("");
    setRoomID("");
    setRole("creator");
  };
  
  const [modalProps,setShowModal]=useState({modalOpen:false,modalMessage:"",modalButtons:[{name:"",color:"",link:""}],clearFields:clearFields,onOTP:false,modalStatus:""})
  
  useEffect(()=>{
    (async()=>{
      try{
        const response=await fetch(process.env.REACT_APP_BACKEND_LINK+'log',{
          method:"GET",
          credentials:"include",
          headers:{
            'Content-Type':'application/json',
          }
        })
        if(response.ok)
          navigate('/home')
      }
      catch(error)
      {
        navigate('/')
      }
    })()
  },[])
  
  const handleSubmit = async (e) => {
    
    e.preventDefault(); 

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_LINK+'log/in', {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserID: userID, UserPassword: userPassword, UserRole:userRole, RoomID:roomID }),
      });
      const data = await response.json();
      
      // Handle authentication based on the server response
      if (response.ok) {
        if(userRole==="creator")
        {
          
          try{
            const createRoomResponse = await fetch(process.env.REACT_APP_BACKEND_LINK+'chat/create',{
              method:'POST',
              credentials:'include',
              headers:{
              'Content-Type':'application/json',
              },
            })
            const createRoomResponseData=await createRoomResponse.json();
            if(createRoomResponse.ok)
              navigate('/home');
            else 
              setShowModal({modalOpen:true,modalMessage:createRoomResponseData.message,modalButtons:[{name:"Move to Login",color:"failure",link:"_logout_"},],modalStatus:"sad"})
            }
          catch(error)
          {
            const LogoutResponse=await fetch(process.env.REACT_APP_BACKEND_LINK+'log/out',{
              method:'POST',
              credentials:'include',
              headers:{
                'Content-Type':'application/json',
              },
            })
            await LogoutResponse
            setShowModal({modalOpen:true,modalMessage:error.message,modalButtons:[{name:"Retry",color:"failure",link:"N/A"},],modalStatus:"sad"})
  
          }
        }
        else if(userRole==="joinee")
          navigate('/home');
      } 
      else if(response.status===404)
        setShowModal({modalOpen:true,modalMessage:data.message,modalButtons:[{name:"Retry With Different Account",color:"failure",link:"_close_"},{name:"Create New User",color:"gray",link:"signup"}],modalStatus:"sad"})

      else if(response.status===401)
        setShowModal({modalOpen:true,modalMessage:data.message,modalButtons:[{name:"Retry",color:"failure",link:"_close_"},{name:"Change Password",color:"gray",link:"reset"}],modalStatus:"sad"}) 
      
      else throw new Error(data.message)
        
    } 
    catch (error) {
      setShowModal({modalOpen:true,modalMessage:error.message,modalButtons:[{name:"Close",color:"failure",link:"_close_"}],modalStatus:"sad"})
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <AuthenticationHeader/>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form 
            className="space-y-6" 
            onSubmit={handleSubmit} 
            onKeyUp={(e)=>{
              if(e.key==='Enter')
              {
                e.preventDefault();
                handleSubmit(e);
              }
            }}>
            <EmailInput userID={userID} registrationButton={0} handleEmailChange={handleEmailChange}/>
            <PasswordInput userPassword={userPassword} registrationButton={0} handlePasswordChange={handlePasswordChange} title={"Password"} forgotRequired={true}/>
            <RoomID userRole={userRole} roomID={roomID} handleRoomIDChange={handleRoomIDChange} ref={roomButtonRef} setRole={setRole}/>
            <SubmitButton title={"Log In"}/>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not Joined Yet?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-gray-800 hover:text-gray-600">
              Sign Up
            </Link>
          </p>
        </div>
        <MessagePop message={modalProps.modalMessage} isOpen={modalProps.modalOpen} buttons={modalProps.modalButtons} clearFields={clearFields} OTPPage={modalProps.onOTP} status={modalProps.modalStatus}/>
      </div>
    </>
  );
}
