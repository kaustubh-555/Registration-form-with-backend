const express = require("express")
const app = express()
const path= require("path");
const { login,createUser,verifyToken } = require("../controllers/loginController");
const router = express.Router();

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","index.html"))
})
router.get("/login.html",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","login.html"))
})
router.get("/signup.html",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","signup.html"))
})
router.get("/styles/style.css",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","styles","style.css"))
})    
router.get("/script.js",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","script.js"))
})
router.get("/LoginScript.js",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","LoginScript.js"))
})
router.get("/SignupScript.js",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","SignupScript.js"))
})
router.get("/welcome.html",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","welcome.html"))
})
router.post("/authenticate",verifyToken);

router.post("/login",login)

router.post("/createUser",createUser)

module.exports=router