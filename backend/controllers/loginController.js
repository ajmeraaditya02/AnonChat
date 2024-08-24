// controllers/userController.js
const dbUtils = require('../utils/dbUtils');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const jwtConfig=require('../config/jwt')
const {getRoomID}=require('../utils/chatUtils')

exports.logout= (req, res) => {
  res.clearCookie(jwtConfig.JWT_COOKIE_NAME,{
    httpOnly:true,
    secure: jwtConfig.ENVIRONMENT==="production"?true:false,
    sameSite:'none', //production build must have this set
  });
  res.status(200).json({message:'Successfully Logged Out!!!'});
  
};
//please check production status for the sameSite

exports.validateLogin = async (req, res) => {
  const { UserID, UserPassword, UserRole, RoomID } = req.body;
  try {
    const rows = await dbUtils.query('SELECT * FROM user WHERE UserID = ?', [UserID]);
    if (rows.length > 0) {
        const hashedPassword = rows[0].Password;
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(UserPassword, hashedPassword);
        if (isPasswordValid) {
          const roomID=getRoomID(UserRole,RoomID,rows[0].name);
        const jwtToken=jwt.sign({
          UserID,
          UserRole,
          RoomID:roomID,
          UserName:rows[0].name
        },jwtConfig.JWT_SECRET_KEY,{expiresIn:'2h',});
          res.cookie(jwtConfig.JWT_COOKIE_NAME,jwtToken,{
            httpOnly:true,
            maxAge: 1000*59*60*2, // 1 hour 59 min authentication only
            secure: jwtConfig.ENVIRONMENT==="production"?true:false,
            sameSite:'none', //production build must have this set
            })
            res.status(200).json({ message: 'Login Successful',roomID});
      } else {
        // Invalid password
        res.status(401).json({ message: 'Invalid Password' });
      }
    } else {
      // User not found
      res.status(404).json({ message: 'User Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
