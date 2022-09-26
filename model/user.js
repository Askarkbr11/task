const {Schema,model} = require("mongoose")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE

const UserModel = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cPassword:{
        type:String
    },
    token:{
        type:[],
        required:true,
        default:[]
    },
    otp:{
        type:Number
    }
},{
    timestamps:true
})

UserModel.pre("save", function(next){
    let user = this
    if (user.isModified(user.password) || user.isNew) {
    bcryptjs.genSalt(12,function(err,salt){
        if(err) return next(err)
        else
        bcryptjs.hash(user.password,salt,function(error,hashed){
            if(error) return next(error)
            else
            user.password = hashed
           next()
        })
    })
}else
return next()
})

UserModel.methods.generateToken = (user)=>{
    return jwt.sign({email:user.email},JWT_SECRET,{expiresIn:JWT_EXPIRE})
}

module.exports= model("users",UserModel)