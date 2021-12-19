const User=require("../models/User");
const jwtoken=require("jsonwebtoken");

module.exports={
    doLogin:async function(req,res){
        try{
            let {firstName, lastName, email, profileImage}=req.body;

            // checking user exist or not
            let existingUser=await User.findOne({email:email});
            
            if(existingUser){
                let token=await jwtoken.sign({id:existingUser._id}, process.env.JSON_SECRET);
                res.cookie("utoken", token, {
                    maxAge:10000000
                }).send();
            }else{
                let newUser=await new User({
                    firstName,lastName,email,profileImage
                });
                let saveUser=await newUser.save();
                let token=await jwtoken.sign({id:saveUser._id}, process.env.JSON_SECRET);
                res.cookie("utoken", token, {
                    maxAge:10000000
                }).send();
            }
        }catch(e){
            console.log(e);
            res.json({error:"something went wrong!!"});
        }
    },

    checkLogedIn:async function(req,res){
        try{
            let utoken=req.cookies.utoken;
            if(utoken){
                let {id:userId}=jwtoken.verify(utoken, process.env.JSON_SECRET);
                let user=await User.findOne({_id:userId});
                res.json({login:true, user});
            }else{
                res.json({login:false, user:{}})
            }
            
        }catch(e){
            console.log(e);
            res.json({error:"something went wrong"});
        }
    }
}