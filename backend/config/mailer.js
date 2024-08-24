require('dotenv').config();
const mailConfig = {
    CLIENT_ID: process.env.MAIL_CLIENT_ID,
    CLIENT_SECRET: process.env.MAIL_CLIENT_SECRET,
    REDIRECT_URI: process.env.MAIL_REDIRECT_URI,
    REFRESH_TOKEN:process.env.MAIL_REFRESH_TOKEN,
    service:'gmail',
    port: process.env.mailPort,
    secure:true,
    auth: {
      user: process.env.senderMail,
      pass: process.env.senderPassword,
    },
}

module.exports=mailConfig;