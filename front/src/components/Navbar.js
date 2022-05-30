
import React from 'react';
import { NavLink } from "react-router-dom";
import Logout from"./login/logout";
import logo from "../image/logo/icon-left-font-monochrome-white.png";
import logout from "../image/icons/arrow-right-to-bracket-solid.svg"

function Navbar() {
    console.log(localStorage);

   
   
    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <NavLink exact to="/">
                        <div className='logo' id="logo-Nav">
                             <img src={logo} alt='logo groupomania' />
                        </div>
                    </NavLink>
                </div>
                
                {localStorage.token ? (
                    <ul>
                        <li></li>
                        <li className='welcome'>
                            <NavLink exact to={`/account/${ JSON.parse(localStorage.userId) } `}>
                                <h5>Profile </h5>
                            </NavLink>

                        </li>
                        <li onClick={Logout}>
                            <NavLink exact to="/login">
                            <img src={logout} id="logout-icon" alt='img log out'/>
                            </NavLink>
                        </li>
                        
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li >
                        <NavLink exact to="/login">
                            <img src="./arrow-right-to-bracket-solid.svg" alt='img log out'/>
                        </NavLink>
                        </li>
                    </ul>
                )}
            </div>

        </nav>
    )
}

export default Navbar;

//icon-left-font.png