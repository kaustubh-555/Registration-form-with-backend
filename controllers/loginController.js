const jwt = require("jsonwebtoken")
const fspromises=require("fs").promises
const path=require("path")
require("dotenv").config()
var users = {
    userList : require("../models/users.json"),
    setUsers : (data)=>{
        users.userList = data;
    }
}

const login=(req,res)=>{
    let name = req.body.username;
    let pass = req.body.password;
    users.userList.forEach((element)=>{
        console.log(element.username);
        console.log(name);
        let userobj={
            username:name,
            password:pass
        }
        if(element.username==name){
            if(element.password==pass){
                let token=jwt.sign(userobj,process.env.ACCESS_SECRET_KEY)
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