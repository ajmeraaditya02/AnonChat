import React,{forwardRef} from "react";

const RoomID=forwardRef(({userRole,roomID,handleRoomIDChange,setRole},roomButtonRef)=>{
    return(
        <>
            <div>
                <div className="flex items-center justify-between">
                    <button className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                    ref={roomButtonRef}
                    onClick={(e)=>{
                        e.preventDefault()
                        userRole==="joinee"?setRole("creator"):setRole("joinee")
                    }}>
                        {userRole==="creator"?"Create a Room":"Join a Room"}
                    </button>
                </div>
                {
                    userRole==="joinee"?
                        <div className="mt-6">
                            <input
                                id="roomid"
                                name="roomid"
                                type="text"
                                autoComplete="off"
                                required
                                maxLength={16}
                                value={roomID}
                                onChange={handleRoomIDChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " style={{textAlign:"center"}}
                            />
                        </div>:
                        <div className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-6" style={{textAlign:"center"}}>
                            Random room will be generated
                        </div>
                }
            </div>
        </>
    )
})
export default RoomID;