import React from "react";

export default function OTPInput({registrationButton,userOTP,handleOTPChange,handleOTPCount,resendOTPCount}){
    return(
        <>
            {
                registrationButton==1?
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="OTP" className="block text-sm font-medium leading-6 text-gray-900">
                        OTP
                        </label>
                        <div className="text-sm">
                            <div 
                                className='font-semibold text-gray-800 hover:text-gray-600'  
                                onClick={handleOTPCount}
                                style={{ 
                                    pointerEvents: resendOTPCount > 0 ? 'none' : 'auto',
                                    color:resendOTPCount>0?'gray':'',
                                    opacity:resendOTPCount>0?'0.5':'',
                                    cursor:resendOTPCount>0?'not-allowed':'pointer',
                                }}
                            >
                                Resend OTP {resendOTPCount>0 && `in ${resendOTPCount}s`}
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                            id="OTP"
                            name="OTP"
                            maxLength={6}
                            type="text"
                            pattern="[0-9]{6}"
                            autoComplete="off"
                            required
                            value={userOTP}
                            onChange={handleOTPChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>:
                <div/>
            }
   
        </>
    )
}