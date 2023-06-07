let signup=document.getElementById('SignUp');
signup.addEventListener('click',(e)=>{
    let name=document.getElementById('username');
    let pass=document.getElementById('password-Input');
    let userobj={
        username: name.value,
        password: pass.value
    }
    fetch('/createUser',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(userobj)
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        console.log(json);
        let status = json.success;
        let t='';
        if(status==true){
            t="User Created Sucessfully";
        }
        else{
            t="User-name already exists !"
        }

        let msg = document.createElement('div');
        msg.style='width:500px;heignt:500px;text-align:center;';
        msg.innerHTML=t;
        msg.id="abc";
        let div=document.getElementById('msg');
        div.appendChild(msg); 
        setTimeout(()=>{
            div.removeChild(msg);
        },3000);
    });
    e.preventDefault();
})