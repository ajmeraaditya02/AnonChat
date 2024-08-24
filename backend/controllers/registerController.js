// controllers/userController.js
const dbUtils = require('../utils/dbUtils');
const bcrypt = require('bcrypt');
// Controller function to get all users
exports.addUser = async (req, res) => {
    const { UserID, UserName, UserPassword } = req.body;

  const hashedPassword = await bcrypt.hash(UserPassword, 10);
    try {
        const results = await dbUtils.query(
        'INSERT INTO user (UserID, Password, name) VALUES (?, ?, ?)',
        [UserID, hashedPassword, UserName]
        );
        if(results.affectedRows===1)
            res.status(200).json({ success: true, userId: results.insertId ,message:"User Registered Successfully"});
    } catch (error) {
        if(error.errno==1062)
            res.status(400).json({success:false,message:'User Already Exists'});
        else
            res.status(500).json({ message: error.message });
    }
};
exports.checkUser=async(req,res)=>{
    const {UserID}=req.body;
    try {
        const results = await dbUtils.query('Select name from user where UserID=?',[UserID]);
        if(results.length>0)
            res.json({'message':'User Already Exists'})
        else 
            res.json({'message':'User Does Not Exists'})
    } catch (error) {
        if(error.errno==1062)
            res.json({success:false,error:'User Already Exists'});
        else
            res.status(500).json({ message: error.message });
    }
};
exports.forgotPassword=async(req,res)=>{
    const { UserID, UserPassword } = req.body;
  const hashedPassword = await bcrypt.hash(UserPassword, 10);
    try {
        const results = await dbUtils.query(
        'Update user set Password=? where UserID=?',
        [hashedPassword, UserID ]
        );
        if(results.affectedRows===1)
            res.status(200).json({ success: true,message:"Password Reset Successfully" });
        else res.status(404).json({success:false,message:"User Does Not Exists"})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}