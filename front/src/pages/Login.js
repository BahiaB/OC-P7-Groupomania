import React, { useState } from "react";
//import axios from "axios";
import Log from "../components/login/index.log";
/*import { Helmet } from "react-helmet";
import {
  emailValidation,
  lettersAndNumbersCheck,
  lettersAndSpaceCheck,
} from "../utils";*/



function Login() {
    return(
    <div className="login-page">
        <div className="log-container">
            <Log />
        </div>
    </div>
    )
}

export default Login;