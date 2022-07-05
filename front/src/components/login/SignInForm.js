import React, { useState } from 'react';
import axios from "axios";
import {emailValidation} from "../../Utils/utils"
//import dotenv from "dotenv";

function SignInForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[emailError, setEmailError] = useState("");



    const handleLogin = (e) => {
       
        e.preventDefault();
       
        if (emailValidation(email) === false) {
			setEmailError("Veuillez entrez un email valide")
		}

        if(emailValidation(email)){
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/login`,
            data: {
                email: email,
                password: password,
            },
        })
        .then((res) => {
            console.log(res);
            
            if (res.data.error) {
                console.log("ici",res.data.errors)
               
            } else {
                console.log("login data", res.data)
                localStorage.token = JSON.stringify(res.data.token);
                localStorage.userId = JSON.stringify(res.data.userId)
                //localStorage.admin = (res.data.admin)
                console.log("tetdeydtweuydtew", localStorage)
                window.location = "/home" //useNavigate
            }
          })
          .catch((err) => {
            console.log(err);
          });

      };
    }


    return (
        <form action="" onSubmit={handleLogin} id="sign-in-form">
            <label htmlFor="email">Email</label>
            <br />
            <input type="text" name="email" id='email' onChange={(e) => setEmail
                (e.target.value)} value={email}></input>
            <div className='email-error'>{emailError}</div>
            <br />
            <label htmlFor='password'>Mot de passe</label>
            <br />
            <input type="password" name='password' id='password' onChange={(e) => setPassword
                (e.target.value)} value={password}></input>
            <div className='password error'></div>
            <br />
            <input type="submit" value="Se connecter"></input>
        </form>
    )
}


export default SignInForm;