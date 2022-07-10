//import logo from './logo.svg';
import React, {useState} from "react";
//import { Switch, Route,  Redirect } from "react-router-dom";
import {
  BrowserRouter,
 // Switch,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

//import Account from "./pages/Account.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Account from "./pages/Account.js";
import Navbar from "./components/Navbar.js";
import UserSearch from "./pages/UserSearch"

//import isLogged from "./utils/utils.js";

//import Messages from "./pages/Messages.js";
import './styles/index.css';


function App() {
  //console.log("app")
  //const [isLoggedIn, setIsLoggedIn] = useState(isLogged())
 // console.log(isLoggedIn)
  
  return (
   
    <div className="Router">
    <BrowserRouter>
    <Navbar />
    {  <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account/:id" element={<Account />} />
        <Route path="/UserSearch/:id" element={<UserSearch />} />
       
       
      </Routes>}
     
    </BrowserRouter>
  </div>
);
}



export default App;
   /*}   <div className="Router">
        <BrowserRouter>
        <Navbar />
        {  <Routes>
           
          
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/account/:id" element={<Account />} />
            <Route path="/" exact> 
          {isLoggedIn ? <redirect to="/home" />  : <redirect to="/login" /> }
          </Route>
           
          </Routes>}
         
        </BrowserRouter>
      </div>
    );
  }*/

  


  

