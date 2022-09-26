const UserModel = require("../model/user")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const JWT_COOKIE_EXPIRE = process.env.JWT_COOKIE_EXPIRE
const JWT_SECRET = process.env.JWT_SECRET
const USER_COOKIE = process.env.USER_COOKIE
const { Auth } = require("two-step-auth");
const { response } = require("..");

exports.registerUser  = async(req,res)=>{
    const {name,email,phone,password,cPassword} = req.body;
    if(password!=cPassword) return res.status(500).json({message:"password is not matching"})
    else
    UserModel.findOne({email},async(err,user)=>{
        if(user) return res.status(500).json({message:"User is already registered"})
        else
        {
            let payload = {name,email,phone,password}
           let user =  await UserModel.create(payload);
          
        return res.status(200).json({message:"successfully registered",payload})
        }
    })
}

exports.loginUser= (req,res)=>{
    const {email,password} = req.body;
    UserModel.findOne({email},function(err,user){
        if(err) throw err
        else
        if(!user) return res.status(404).json({message:"you are not registered"})
        else {
            bcryptjs.compare(password,user.password,async function(error,isMatched){
                console.log(isMatched)
                if(error) throw error
                else
                if(!isMatched) return res.status(401).json({message:"incorrect password"})
                else {
                    const options = {
                        expires: new Date(Date.now() + JWT_COOKIE_EXPIRE *30 * 1000),
                        httpOnly: true,
                      };
                      req.user=user
                      let token =  user.generateToken(user)
                      user.token.splice(user.token.length,0,token)
                     await user.save() 
                      res
    .status(200)
    .cookie("auth", token, options)
    .json({ message: "successfully logged in", token });
                }
            })
        }
    })
}

exports.logoutUser=async(req,res)=>{
    try {
        req.user.token = req.user.token.filter(token=>token!=req.token)
        await req.user.save()
        res.clearCookie("auth")
        return res.status(200).json({message:"successfully loggedout , particular token is deleted"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

exports.sendOtpToEmail =async(req,res)=>{
    const {email} = req.body;
    UserModel.findOne({email},async(err,user)=>{
        if(!user) return res.status(404).json({message:"email not registered"})
        if(err) throw err
        const token = req.token
        if(!token) return res.status(401).json({message:"please login to generate otp"})
        else{
            const decoded= jwt.verify(token,JWT_SECRET)
            if(decoded.email==email){
            const verify =await Auth(email,"elRED")
            user.otp=verify.OTP
            await user.save()
            return res.status(200).json({verify})
    }
    }
    })
}

exports.verifyEmailOtp = async(req,res)=>{
    const {otp}  = req.body;
    const token = req.token;
    if(!token) 
    return res.status(401).json({message:"token expired"})
    else{
    const decoded= jwt.verify(token,JWT_SECRET)
    UserModel.findOne({email:decoded.email},(err,user)=>{
    if(err) throw err
    else if(user.otp==otp)
    return res.status(301).json({message:"successfully verified your email"})
    else return res.status(401).json({message:"incorrect otp"})
})
}
}

exports.getAllUsers = async (req,res)=>{
    try {
      let users = await UserModel.find({})
     return res.status(200).json({message:"successfully fetched",users})
    } catch (err) {
       return res.status(500).json({message:err.message})
    }
}