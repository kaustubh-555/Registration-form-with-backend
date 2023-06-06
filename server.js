const path = require('path')
const express = require('express')
const app = express()
require("dotenv").config()
const middleware = require("./middleware/mid")
const route= require("./routes/route")
app.use(express.json())
app.use(middleware);

app.use(route)
                    
app.listen(3500,()=>{
    console.log("Server is running !")
})