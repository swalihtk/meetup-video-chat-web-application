const router=require("express").Router();
const authController=require("../controllers/authController");

// @desc login user
// @params  firstName, lastName, email
router.post("/login", authController.doLogin);

// @desc check user loged in
router.get("/check_login", authController.checkLogedIn);

module.exports=router;