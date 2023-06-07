let loginBtn=document.getElementById("loginBtn");
let SignupBtn=document.getElementById("signupBtn");

loginBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href="login.html";
});

SignupBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href="signup.html"
});