require('dotenv').config();

const sessionConfig={
    SESSION_KEY:process.env.SESSION_KEY||'09-01-2023',
    SESSION_COOKIE_NAME:process.env.SESSION_COOKIE_NAME||'My Cookie',
    ENVIRONMENT:process.env.ENVIRONMENT||'development',
}
module.exports=sessionConfig;