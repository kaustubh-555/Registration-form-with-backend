let loginBtn=document.getElementById("loginBtn");
let SignupBtn=document.getElementById("signupBtn");

if(document.cookie.includes('refreshToken')){
    let allCookies=document.cookie;
    allCookies= decodeURIComponent(allCookies);
    allCookies = allCookies.trim();
    allCookiesList=allCookies.split(';');
    let a,b;
    console.log(allCookiesList)
    allCookiesList.forEach((element)=>{
        element=element.trim();
        let key = element.substring(0,element.indexOf("="));
        let val = element.substring(element.indexOf("=")+1);
        
        if(key=="accessToken"){
            a=val;
        } 
        if(key=="refreshToken"){
            b=val;
        }

    })
    const authcookie = {
        accessToken : a,
        refreshToken: b
    }
    console.log("post data");
    console.log(authcookie);
fetch("/authenticate",{
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
        },
    body : JSON.stringify(authcookie)
}).then((response)=>{
    return response.json();
}).then((json)=>{
    if(json.status){
        window.location.href="welcome.html";
    }
    else{
        document.cookie="";
    }
    console.log(json)
})

}
loginBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href="login.html";
});

SignupBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href="signup.html"
});