const express=require("express");
const cors=require("cors");
const socketio=require("socket.io");
const http=require("http");
const mongoose=require("mongoose");
const cookieParse=require("cookie-parser");
const path = require("path");
var ExpressPeerServer = require('peer').ExpressPeerServer;

require("dotenv").config();

// app
const app=express();
const PORT= process.env.PORT;
const server=http.createServer(app);
const io=socketio(server, {
    path: '/websockets', // path to make requests to [http://host/websockets]
    pingInterval: 60 * 1000, // 1 minute
    pingTimeout: 4 * 60 * 1000, // 4 minutes
});

// middlewares
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}));
app.use(express.json({}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParse());
app.use((req,res,next)=>{
    req.io=io;
    next();
})

// peerjs setup
// let expressPeerServer=ExpressPeerServer(server, {
//     debug:true
// })
// app.use("/peerjs", expressPeerServer);

// mongoose connection
mongoose.connect(process.env.MONGO_URL, (err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Database Connected");
})


// Socket io connection
io.on("connection", (socket)=>{
    console.log("User Connected");
    socket.on("create-room", (peerId, roomId)=>{
        console.log("Room Joined");
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("join-user", peerId);

    })

    socket.on("user-chat", (roomId,userName, chat)=>{
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("recive-chat", userName, chat);
    })

    socket.on("call-end", (peerId, roomId)=>{
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-disconnected", peerId);
    })
})

// routes
app.get("/", (req,res)=>res.send("Video Server"));

const peerRouter=require("./routers/peerRouter");
app.use("/peer", peerRouter);

const authRoute=require("./routers/auth");
const cookieParser = require("cookie-parser");
app.use("/auth", authRoute);

// listen
server.listen(PORT, ()=>{
    console.log("Server started on "+PORT);
})
