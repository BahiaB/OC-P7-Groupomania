//import axios from "axios";
//import { useState } from "react";

function isLogged() {
   // const [loggedIn, setLoggedIn] = useState(false);
    if (localStorage.token != null){
      //  setLoggedIn(true);
        return (true)
    }
    else{
        console.log("utilisateur non connecté")
        return(false);
}
}

export default isLogged