const express = require("express")
const app = express()
const path= require("path");
const { login } = require("../controllers/loginController");
const router = express.Router();

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","index.html"))
})
router.get("/styles/style.css",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","styles","style.css"))
})    
router.get("/scripts.js",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","scripts.js"))
})
router.post("/login",login)
module.exports=router