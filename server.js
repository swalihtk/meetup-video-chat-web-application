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
const server=http.createServer(app);
const io=socketio(server, {cors:{origin:"*"}});

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
