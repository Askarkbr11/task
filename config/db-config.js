const {connect} = require("mongoose")

const connectToDb = async(url)=>{
    await connect(url)
    console.log("db connected")
}

module.exports = connectToDb