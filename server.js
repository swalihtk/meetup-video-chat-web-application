const express=require("express");
const cors=require("cors");
require("dotenv").config();
const socketio=require("socket.io");
const http=require("http");

// app
const app=express();
const PORT= 4000;
const server=http.createServer(app);
const io=socketio(server, {cors:{origin:"*"}});

// middlewares
app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({extended:true}));

app.use((req,res,next)=>{
    req.io=io;
    next();
})


// Socket io connection

// routes
app.get("/", (req,res)=>res.send("Video Server"));

const peerRouter=require("./routers/peerRouter");
app.use("/peer", peerRouter);

// listen
server.listen(PORT, ()=>{
    console.log("Server started on "+PORT);
})