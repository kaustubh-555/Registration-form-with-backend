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

const verifyToken=(req,res)=>{
    let refreshToken=req.body.refreshToken;
    let accessToken=req.body.accessToken;
    let valid = jwt.verify(accessToken,process.env.ACCESS_SECRET_KEY);
    let validity={
        status: false,
        newAccessToken: null
    };
    if(valid){
    validity.status=true;
      
    }
    // else{
    //     valid=jwt.verify(refreshToken,process.env.REFRESH_SECRET_KEY);
    //     if(valid){
    //         validity.newAccessToken=jwt.sign()
    //     }
    // }
    res.json(validity)
}

const login= (req,res)=>{
    let name = req.body.username;
    let pass = req.body.password;
    users.userList.forEach(async (element)=>{
        // console.log(element.username);
        // console.log(name);
        let userobj={
            username:name,
            password:pass
        }
        if(element.username==name){
            const validPassword= await bcrypt.compare(pass,element.password)
            if(validPassword){
                let Atoken=jwt.sign(userobj,process.env.ACCESS_SECRET_KEY)
                let Rtoken=jwt.sign(userobj,process.env.REFRESH_SECRET_KEY)
                // res.cookie('ACCESSTOKEN',token,{ maxAge: 900000, httpOnly: false })
                // res.cookie('refreshToken', accessToken);
                // res.cookie('ACCESSTOKEN',token)
                const status={
                    success: true,
                    ACCESSTOKEN: Atoken,
                    REFRESHTOKEN: Rtoken,
                }
                res.status(200).json(status);
            }
            else{
                res.status(401).json({success: false})
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
        res.json({"success":true})
    }
    else{
        res.json({"success":false})
    }
}

module.exports={login,createUser,verifyToken}