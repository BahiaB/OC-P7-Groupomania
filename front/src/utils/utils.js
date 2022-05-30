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

export default isLogged