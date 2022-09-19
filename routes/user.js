const express = require("express")
const router = express.Router();
const {registerUser, loginUser, logoutUser,sendOtpToEmail,verifyEmailOtp,getAllUsers} = require("../controllers/user")

router.post("/register",registerUser).post("/login",loginUser).get("/logout",logoutUser).post("/send-otp",sendOtpToEmail).post("/verify-otp",verifyEmailOtp).get("/",getAllUsers)

module.exports = router