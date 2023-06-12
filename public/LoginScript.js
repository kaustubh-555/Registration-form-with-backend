let btn = document.getElementById("btn");
let accessToken,refreshToken;
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
        if(response.status===200){
            // let cookies = response.headers.get('Set-Cookie');
            // console.log(cookies);
            var responseCookies = response.headers.get("Set-Cookie")
            console.log(responseCookies);
        }
        return response.json();
    }).then(json=>{
            console.log(json)
            if(json.success===true){
                accessToken=json.ACCESSTOKEN;
                refreshToken=json.REFRESHTOKEN;
                console.log("%s \n %s",accessToken,refreshToken)
                document.cookie=`accessToken=${accessToken}; expires=Mon, 12 Jun 2023 23:59:59 UTC `
                document.cookie=`refreshToken=${refreshToken}; expires=Mon, 12 Jun 2023 23:59:59 UTC `
                document.location.href="welcome.html"
            }
            
            else{
                alert("Incorrect name or Password !")
            }
        })   
      console.log("success!")
});