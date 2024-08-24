const jwt=require('jsonwebtoken')
const jwtConfig=require('../config/jwt')
const dbUtils=require('../utils/dbUtils');
// const io=require('../app')
exports.create=async (req,res)=>
{
  const encoded_jwtToken=req.cookies[jwtConfig.JWT_COOKIE_NAME];
  const jwtToken=jwt.verify(encoded_jwtToken,jwtConfig.JWT_SECRET_KEY);
  // console.log(jwtToken)
  const {UserID,UserName,RoomID}=jwtToken;
  try
  {
    const createResult = await dbUtils.query('Insert into rooms (RoomID,CreatorID) values(?,?)',[RoomID,UserID] )
    // console.log(createResult)
    if(createResult.affectedRows===1)
    {
      res.status(200).json({message:"room created successfully"});
    }
    else
    {
      res.status(500).json({message:"Internal Server Error"})
    }
  }
  catch(error)
  {
    res.status(500).json({message:error.message});
  }
}

exports.entry=(req,res)=>{
  const encoded_jwtToken=req.cookies[jwtConfig.JWT_COOKIE_NAME];
  const jwtToken=jwt.verify(encoded_jwtToken,jwtConfig.JWT_SECRET_KEY);
  const {UserName,RoomID} = jwtToken;
  res.status(200).json({message:"you can join",userName:UserName,roomID:RoomID,message:"You are in Chatroom "+RoomID});
}

