const crypto=require('crypto')

const getSize=(io,roomID)=>{
    return io.sockets.adapter.rooms.get(roomID)?.size||0;
}

const getRoomID=(UserRole,RoomID,UserName)=>{
    if(UserRole==="creator")
    {
        return crypto.randomBytes(8).toString('hex');
    }
    return RoomID;
}

module.exports={getSize,getRoomID}