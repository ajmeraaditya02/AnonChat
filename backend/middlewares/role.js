const jwt=require('jsonwebtoken')
const jwtConfig=require('../config/jwt')

exports.role=async (req,res,next)=>{
    const encoded_jwtToken=req.cookies[jwtConfig.JWT_COOKIE_NAME];
    const jwtToken=jwt.verify(encoded_jwtToken,jwtConfig.JWT_SECRET_KEY);
    if(req.role.includes(jwtToken.UserRole))
        next();
    else
        res.status(403).json({message:"Permission Denied"});
        // res.json({UserName:jwtToken.UserName,message:"You have successfully joined chatroom #"+jwtToken.RoomID});
}