import React from "react"
import { Link } from "react-router-dom"

export default function PasswordInput({userPassword,registrationButton,handlePasswordChange,title,forgotRequired})
{
    return(
        <>
            {
                registrationButton==0?
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            {title}
                        </label>
                        {
                            forgotRequired?
                                <div className="text-sm">
                                    <Link to='/reset' className="font-semibold text-gray-800 hover:text-gray-600">
                                    Forgot Password
                                    </Link>
                                </div>:""
                        }
                    </div>
                    <div className="mt-2">
                        <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={userPassword}
                        onChange={handlePasswordChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>:
                <div />
            }
        </>
    )
}