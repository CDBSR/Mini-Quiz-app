
import { navbar } from "./navbar.js";

navbar();

let loginform = document.getElementById('loginForm');
loginform.addEventListener('submit', async function(){
    event.preventDefault();

    try{
        const email = loginform.email.value;
        const password = loginform.password.value;

        if(email == 'empher@gmail.com' && password == 'empher@123'){
            alert('Login successfull');
            window.location.href = 'quiz.html';
        }
        else{
            alert('Invalid User !');
        }

    } catch(err){
        console.log("Error in Login: ", err);
    }

});