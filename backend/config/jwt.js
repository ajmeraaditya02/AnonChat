require('dotenv').config();

const jwtConfig={
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY||'your-secret-key',
    JWT_COOKIE_NAME:process.env.JWT_COOKIE_NAME||'AnonChatAuthenticator',
    ENVIRONMENT:process.env.ENVIRONMENT||'development',
}
module.exports=jwtConfig;