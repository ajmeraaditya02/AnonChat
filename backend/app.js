// app.js
const express = require('express');
const app = express();
const appConfig=require('./config/appConfig')
const cors=require('cors');
const loginRoutes=require('./routes/login');
const registerRoutes=require('./routes/register');
const chatRoutes=require('./routes/chat');
const otpRoutes =require('./routes/otp');
const cookieParser=require('cookie-parser');
const socketIO=require('socket.io');
const {getJWT,parseCookies}=require('./utils/jwtUtils')
const {getSize}=require('./utils/chatUtils')
const cron = require('node-cron');



app.use(cors({
    origin: [appConfig.FRONTEND_LINK,appConfig.FRONTEND_LINK+'/'],
    credentials: true,
    allowedHeaders:['Content-Type'],
    headers:{
        'Access-Control-Allow-Origin':[appConfig.FRONTEND_LINK,appConfig.FRONTEND_LINK+'/'],
    }
}));

app.use(cookieParser());

app.use(express.json())


app.use('/log',loginRoutes);
app.use('/register',registerRoutes);
app.use('/otp',otpRoutes);
app.use('/chat',chatRoutes);

const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

cron.schedule('*/1 * * * *', () => {
  console.log('This task runs every 1 minutes as Cron-Job');
});

const io = socketIO(server, {
    pingTimeout: 60000,
    cors: {
        origin: [appConfig.FRONTEND_LINK,appConfig.FRONTEND_LINK+'/'],
        credentials:true,
        allowedHeaders:['Content-Type'],
        headers:{
            'Access-Control-Allow-Origin':[appConfig.FRONTEND_LINK,appConfig.FRONTEND_LINK+'/'],
        }
    },
});

io.on('connection',socket=>{
    const rawCookies=socket.request.headers.cookie;
    const parsedCookies=parseCookies(rawCookies);
    const jwtToken=getJWT(parsedCookies);
    const {authorized,userID,userName,userRole,roomID}=jwtToken;
    socket.on('join',()=>{
        if(!authorized)
        {
            io.to(socket.id).emit('session-expired')
            return ;
        }
        if(userRole==="creator")
            socket.join(roomID);
        else if(userRole==="joinee")
        {
            if(getSize(io,roomID)===0)
                io.to(socket.id).emit('room-unavailable')
            else 
                socket.join(roomID);
        }
        else io.to(socket.id).emit('permission-denied')
    })
    socket.on('leave',()=>{
        socket.leaveAll();
    })
    socket.on('send-message',message=>{
        if(!authorized)
        {
            io.to(socket.id).emit('session-expired')
            socket.leaveAll();
            return ;
        }
        socket.broadcast.to(roomID).emit('receive-message',{message:message});
    })
})