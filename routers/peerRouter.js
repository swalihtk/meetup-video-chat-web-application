const router=require("express").Router();
const shortId=require("shortid");

router.get("/roomId", (req,res)=>{ 
    console.log("roomId generated");
    let videoId=shortId.generate();
    res.json({videoId});
})

module.exports=router;