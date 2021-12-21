const express=require("express");
const cors=require("cors");
const socketio=require("socket.io");
const http=require("http");
const mongoose=require("mongoose");
const cookieParse=require("cookie-parser");
require("dotenv").config();

// app
const app=express();
const PORT= process.env.PORT;

// socketio setup
const server_socket=http.createServer((req,res)=>{
    res.end("http listening for socket");
});
server_socket.listen(4001);
  
const io=socketio(server_socket);

// middlewares
app.use(cors({
    origin:["http://localhost:3000", "https://meetup.swaliht.tech"],
    credentials:true
}));
app.use(express.json({}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParse());
app.use((req,res,next)=>{
    req.io=io;
    next();
})


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
app.listen(PORT, ()=>{
    console.log("Server started on "+PORT);
})
