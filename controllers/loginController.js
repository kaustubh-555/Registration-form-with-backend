const jwt = require("jsonwebtoken")
const fspromises=require("fs").promises
const path=require("path")
const bcrypt=require("bcrypt")

require("dotenv").config()
let users = {
    userList : require("../models/users.json"),
    setUsers : (data)=>{
        users.userList = data;
    }
}

const login= (req,res)=>{
    let name = req.body.username;
    let pass = req.body.password;
    users.userList.forEach(async (element)=>{
        console.log(element.username);
        console.log(name);
        let userobj={
            username:name,
            password:pass
        }
        if(element.username==name){
            const validPassword= await bcrypt.compare(pass,element.password)
            if(validPassword){
                let token=jwt.sign(userobj,process.env.ACCESS_SECRET_KEY)
                res.cookie('ACCESSTOKEN',token,{httpOnly:true})
                res.json(token)
            }
        }
    });   
}
const createUser=async (req,res)=>{
    let name = req.body.username;
    let pass = req.body.password;
    let unique=true;
    users.userList.forEach((element)=>{
        if(element.username===name){
            unique=false;
            return false;
        }
    })
    if(unique){
        pass=await bcrypt.hash(pass,10);
        let oldUsers = users.userList;
        let newUserObj={
            username:name,
            password:pass
        }
        let newUsersList = [...oldUsers,newUserObj];
        users.setUsers(newUsersList)
        await fspromises.writeFile(path.join(__dirname,"..","models","users.json"),JSON.stringify(newUsersList))
        res.json({"success":"true"})
    }
    else{
        res.json({"success":'false'})
    }
}

module.exports={login,createUser}