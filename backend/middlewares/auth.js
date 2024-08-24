const jwt=require('jsonwebtoken')
const jwtConfig=require('../config/jwt')

exports.authenticate=async (req,res,next)=>{
    const encoded_jwtToken=req.cookies[jwtConfig.JWT_COOKIE_NAME];
    if(!encoded_jwtToken)
        res.status(404).json({message:"Authentication Failure",logged:false});
    else
        next();
}

exports.verify=async(req,res,next)=>{
    const encoded_jwtToken=req.cookies[jwtConfig.JWT_COOKIE_NAME];
    if(!encoded_jwtToken)
        res.status(404).json({message:'Not Already Logged in'})
    else
    {
        res.status(200).json({ message: 'Login Successful'});
    }
}