// utils/dbUtils.js
const mailConfig = require('../config/mailer');
const nodemailer = require('nodemailer')
const {google} =require('googleapis')

let transporter;

try{
  const oAuth2Client = new google.auth.OAuth2(mailConfig.CLIENT_ID, mailConfig.CLIENT_SECRET, mailConfig.REDIRECT_URI);
  oAuth2Client.setCredentials({refresh_token: mailConfig.REFRESH_TOKEN,});

  oAuth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      // Store the new refresh token securely
      mailConfig.REFRESH_TOKEN = tokens.refresh_token;
    }
  })

  transporter = nodemailer.createTransport({
      service: mailConfig.service,
      auth: {
        type: 'OAuth2',
        user: mailConfig.auth.user,
        clientId: mailConfig.CLIENT_ID,
        clientSecret: mailConfig.CLIENT_SECRET,
        refreshToken: mailConfig.REFRESH_TOKEN,
        // accessToken: oAuth2Client.getAccessToken(),
      },
  });

}
catch(error)
{
  throw new Error("Mailing Configuration Error")
}
module.exports = transporter;

