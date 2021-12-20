const router=require("express").Router();
const authController=require("../controllers/authController");

// @desc get google auth value
router.get("/googleAuthSecret", (req,res)=>{
    res.json({key:process.env.GOOGLE_AUTH_CODE});
})

// @desc login user
// @params  firstName, lastName, email
router.post("/login", authController.doLogin);

// @desc check user loged in
router.get("/check_login", authController.checkLogedIn);

module.exports=router;