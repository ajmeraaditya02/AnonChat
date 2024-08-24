// controllers/userController.js
const dbUtils = require('../utils/dbUtils');
const bcrypt = require('bcrypt');
const transporter=require('../utils/mailUtils')

exports.sendOTP=async (req,res)=>{
    const {UserID} = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP =await bcrypt.hash(otp, 10);

    try
    {
        const deleteOldOTP = await dbUtils.query(
            'Delete from emailverification where UserID=?',
            [UserID]
        );
        const insertNewOTP = await dbUtils.query(
            'INSERT INTO emailverification (UserID, otp) VALUES (?, ?)',
            [UserID, hashedOTP]
        );
        try{
          const result = await transporter.sendMail({
              from:"guufg57@gmail.com",
              to: UserID,
              subject: 'Email Verification OTP',
              text: `Your OTP for email verification is: ${otp}`,
          });

          if (result.accepted && result.accepted.length > 0) {
              // Email sent successfully
              res.status(201).json({
                  'status': 'success', 
                  'message': 'OTP sent successfully',
                  'code':'sent',
          });
          } else {
              // Email failed to send
              res.status(500).json({ 'status': 'error', 'message': 'Failed to send OTP' });
          }
        }
        catch(error)
        {
          console.log(error.message);
          res.status(500).json({'status':'error','message':'Failed to send OTP'});
        }
    }
    catch (error) {
        // Handle any errors that occurred during sending the email
        res.status(500).json({ 'status': 'error', 'message': error.message });
    }
}
exports.verifyOTP = async (req, res) => {
    const { UserID, UserOTP } = req.body;
  try {
    const rows = await dbUtils.query('SELECT * FROM emailverification WHERE UserID = ?', [UserID]);

    if (rows.length > 0) {
        const hashedOTP = rows[0].otp;       
        // Compare the provided password with the hashed password in the database
        const isOTPValid = await bcrypt.compare( UserOTP,hashedOTP);
        
        if (isOTPValid) {

            res.status(200).json({ message: 'OTP Verification Successful' });
      } else {
        // Invalid password
        res.status(401).json({ message: 'Invalid OTP' });
      }
    } else {
      // User not found
      res.status(404).json({ message: 'OTP Verification Failure' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


