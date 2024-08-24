import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import MessagePop from "./messagePop";
import { EmailInput,NameInput,OTPInput,PasswordInput,SubmitButton } from "./inputs";
import AuthenticationHeader from "./authenticationHeader";
export default function SignUp() {

  const [userName,setName] =useState("");
  const [userID, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userOTP, setOTP] = useState("");
  const [registrationButton,updateRegistrationStatus]=useState(0);
  const [resendOTPCount,updateCounter]=useState(30);
  
  useEffect(()=>{
    const interval=setInterval(() => {
      updateCounter(resendOTPCount => resendOTPCount - 1);
    }, 1000);
    return ()=>clearInterval(interval);
  },[resendOTPCount])

  
  function clearFields(){
    setName("");
    setEmail("");
    setPassword("");
    setOTP("");
  };
  
  const [modalProps,setShowModal]=useState({modalOpen:false,modalMessage:"",modalButtons:[{name:"",color:"",link:""}],clearFields:clearFields,onOTP:false,modalStatus:""})
  
  // mode 0 - code is yet not sent
  // mode 1 - code is sent successfully
  const handleNameChange= (e) => setName(e.target.value);
  
  const handleEmailChange = (e) => setEmail(e.target.value);
  
  const handlePasswordChange = (e) => setPassword(e.target.value);
  
  const handleOTPChange=(e)=> setOTP(e.target.value);
  
  const handleOTPCount=async (e)=>{
    e.preventDefault()
    updateCounter(30);
    
    try{
      const response = await fetch(process.env.REACT_APP_BACKEND_LINK+'otp/send',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({UserID:userID}),
      });
      const data = await response.json();
      if (response.ok) { 
        //otp is sent, we can proceed
        updateRegistrationStatus(1)
      } else {
        // Failed login, display error message
        setShowModal({modalOpen:true,modalMessage:data.message,modalButtons:[{name:"Retry",color:"failure",link:"N/A"}]})
      }
    }
    catch (error) {
      setShowModal({modalOpen:true,modalMessage:error.message,modalButtons:[{name:"Close",color:"failure",link:"_close_"}]})
    }

  }
  const verify = async (e) => {
    e.preventDefault();
    if(registrationButton===0)
    {
      try
      {
        const response = await fetch(process.env.REACT_APP_BACKEND_LINK+'register/checkUser',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({UserID:userID}), 
        });
        const data=await response.json();
        if(data.message==='User Already Exists')
        {
          setShowModal({modalOpen:true,modalMessage:"User Already Exists",modalButtons:[{name:"Move to Login ?",color:"failure",link:".."},{name:"Use Different Email",color:"gray",link:"_close_"}],modalStatus:"happy"})
          return ;
        }
      }
      catch(error)
      {
        setShowModal({modalOpen:true,modalMessage:error.message,modalButtons:[{name:"Close",color:"failure",link:"_close_"}],modalStatus:"sad"})
      }
      try{
        const response = await fetch(process.env.REACT_APP_BACKEND_LINK+'otp/send',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({UserID:userID}),
        });
        const data = await response.json();
        if (response.ok) { 
          //otp is sent, we can proceed
          updateRegistrationStatus(1)
        } else {
          // Failed login, display error message
          setShowModal({modalOpen:true,modalMessage:data.message,modalButtons:[{name:"Retry",color:"failure",link:"N/A"}],modalStatus:"sad"})
        }
      }
      catch (error) {
        setShowModal({modalOpen:true,modalMessage:error.message,modalButtons:[{name:"Close",color:"failure",link:"_close_"}],modalStatus:"sad"})
      }
    }
    else{
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND_LINK+'otp/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UserID: userID, UserOTP: userOTP}),
        });

        const data = await response.json();
  
        // Handle authentication based on the server response
        if (response.ok) {

            const response2 = await fetch(process.env.REACT_APP_BACKEND_LINK+'register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ UserID: userID, UserPassword:userPassword, UserName:userName}),
          });
          const data2 = await response2.json();
          if(response2.ok)
          {
            setShowModal({modalOpen:true,modalMessage:data2.message,modalButtons:[{name:"Move to Login",color:"failure",link:"/"}],modalStatus:"happy"})
          }
          else{
            setShowModal({modalOpen:true,modalMessage:data2.message,modalButtons:[{name:"Close",color:"failure",link:"_close_"}],modalStatus:"sad"})
          }
        } else {
          setShowModal({modalOpen:true,modalMessage:data.message,modalButtons:[{name:"Try Again",color:"failure",link:"N/A"}],onOTP:true})
        }
      } catch (error) {
        setShowModal({modalOpen:true,modalMessage:error.message,modalButtons:[{name:"Close",color:"failure",link:"_close_"}]})
      }
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <AuthenticationHeader/>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={verify}>
            <NameInput registrationButton={registrationButton} userName={userName} handleNameChange={handleNameChange}/>
            <EmailInput userID={userID} registrationButton={registrationButton} handleEmailChange={handleEmailChange}/>
            <PasswordInput userPassword={userPassword} registrationButton={0} handlePasswordChange={handlePasswordChange} title={"Password"} forgotRequired={false}/>
            <OTPInput userOTP={userOTP} registrationButton={registrationButton} handleOTPChange={handleOTPChange} handleOTPCount={handleOTPCount} resendOTPCount={resendOTPCount} />
            <SubmitButton title={registrationButton===0 ? "Send Verification Code":"Verify The Code"}/>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already Registered?{' '}
            <Link to='/' className="font-semibold leading-6 text-gray-800 hover:text-gray-600">
              Log In
            </Link>
          </p>
        </div>
        <MessagePop message={modalProps.modalMessage} isOpen={modalProps.modalOpen} buttons={modalProps.modalButtons} clearFields={clearFields} OTPPage={modalProps.onOTP} status={modalProps.modalStatus}/>

      </div>
    </>
  );
}
