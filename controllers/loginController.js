const jwt = require("jsonwebtoken")
let users = {
    userList : require("../models/users.json"),
    setUsers : (data)=>{
        this.userList = data;
    }
}

const login=(req,res)=>{
    let name = req.body.username;
    let pass = req.body.password;
    users.userList.forEach((element)=>{
        console.log(element.username);
        console.log(name);
        if(element.username==name){
            if(element.password==pass){
                res.json({message:`login successfull !  username: ${name}   password : ${pass}`})
                console.log(`login successfull !  username: ${name}   password : ${pass}`)
            }
        }
    });
    
}

module.exports={login}