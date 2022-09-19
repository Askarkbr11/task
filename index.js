const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT
const DB_URL = process.env.MONGODB_LOCAL_URL
const connectToDb = require("./config/db-config")
const UserRoutes = require("./routes/user")
const TaskRoutes = require("./routes/task")

app.use(express.json())

connectToDb(DB_URL)

app.use("/",UserRoutes)
app.use("/api/",TaskRoutes)

app.listen(PORT,err=>{
    if(err) throw err
    console.log(`server is running on ${PORT}`)
})

module.exports = app
