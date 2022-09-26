const express = require("express")
const fs = require("fs")
const app = express()
require("dotenv").config()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
const PORT = process.env.PORT||5000
const DB_URL = process.env.MONGODB_CLOUD_URL
const connectToDb = require("./config/db-config")
const UserRoutes = require("./routes/user")
const TaskRoutes = require("./routes/task")
const host ="0.0.0.0";

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

connectToDb(DB_URL)

app.use("/",UserRoutes)
app.use("/api/",TaskRoutes)

app.listen(PORT,host,err=>{
    if(err) throw err
    console.log(`server is running on ${PORT}`)
})

module.exports = app