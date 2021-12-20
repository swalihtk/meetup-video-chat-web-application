const express=require("express");
const cors=require("cors");
const socketio=require("socket.io");
const http=require("http");
const mongoose=require("mongoose");
const cookieParse=require("cookie-parser");
const {ExpressPeerServer} =require("peer");

require("dotenv").config();

// app
const app=express();
const PORT= process.env.PORT;
const server=http.createServer(app);
const io=socketio(server, {cors:{origin:"*"}});

// setup peerserver
// const peerServer = ExpressPeerServer(server, {
//     debug: true,
//     path: '/meetup'
//   });
// app.use('/peerjs', peerServer);

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
    socket.on("create-room", (peerId, roomId)=>{
        console.log(peerId);
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
