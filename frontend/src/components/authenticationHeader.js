import React from "react";
export default function AuthenticationHeader(){
    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="logo.png"
                    alt="AnonChat"
                />
                {/* image link to anon chat logo */}
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create Your Account
                </h2>
            </div>
        </>
    )
}