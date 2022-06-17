//import axios from "axios";
//import { useState } from "react";

function isLogged() {
   // const [loggedIn, setLoggedIn] = useState(false);
   const token = localStorage.getItem("token")
   console.log(`token de utils ${token}`)
    if (token !== null){
      //  setLoggedIn(true);
        return (true)
    }
    else{
        console.log("utilisateur non connecté")
        return(false);
}
}


export function emailValidation(data) {
  const regex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (
    data.match(regex)
  ) {
     console.log("Email valide");
    return true;
  } else {
    console.log("email invalide");
    return false;
  }
}

export function nameValidation(data){
  var nameRegex = /^[a-zA-Z\-]+$/;
  if (
    data.match(nameRegex)
  ) {
     console.log("nom valide");
    return true;
  } else {
    console.log("nom invalide");
    return false;
  }

}

export function firstNameValidation(data){
  var firstNameRegex = /^[a-zA-Z\-]+$/;
  if (
    data.match(firstNameRegex)
  ) {
     console.log("firstnom valide");
    return true;
  } else {
    console.log("firstnom invalide");
    return false;
  }

}


//export default isLogged();
//export default emailValidation;
