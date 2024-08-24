import React from "react"

export default function SubmitButton({title}){
    return(
        <>
            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                >
                    {title}
                </button>
            </div>
        </>
    )
}