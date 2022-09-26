const express = require("express")
const router = express.Router();
const {registerUser, loginUser, logoutUser,sendOtpToEmail,verifyEmailOtp,getAllUsers} = require("../controllers/user");
const { Protected } = require("../middlewares/protected");

router.post("/register",registerUser).post("/login",loginUser).get("/logout",Protected, logoutUser).post("/send-otp",Protected,sendOtpToEmail).post("/verify-otp",Protected,verifyEmailOtp).get("/",Protected,getAllUsers)

module.exports = router