import React from "react";

export default function NameInput({userName,registrationButton,handleNameChange}){
    return (
        <>
            {
                registrationButton===0?
                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            pattern="[a-z A-Z]{50}"
                            maxLength={50}
                            required
                            value={userName}
                            onChange={handleNameChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>:<div/>
            }
        </>
    )
}