let btn = document.getElementById("btn");
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    let user = document.getElementById("username");
    let pass= document.getElementById("password");
    let data={
        username: user.value,
        password: pass.value
    }
    fetch('/login',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).then(json=>{
            console.log(json)})   
      console.log("success!")
});