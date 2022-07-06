
import React from 'react';
import { NavLink } from "react-router-dom";
import Logout from"./login/logout";
import logo from "../image/logo/icon-left-font-monochrome-white.png";
import logout from "../image/icons/arrow-right-to-bracket-solid.svg";
import profil from "../image/user-solid.svg";

function Navbar() {
    console.log(localStorage);

   
   
    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <NavLink to="/home">
                        <div className='logo' id="logo-Nav">
                             <img src={logo} alt='logo groupomania' />
                        </div>
                    </NavLink>
                </div>
                
                {localStorage.token ? (
                    <ul>
                        
                        <li className='welcome'>
                            <NavLink to={`/account/${ JSON.parse(localStorage.userId) } `}>
                                <img src={profil} id="profil-icon" alt="Profil icon"/>
                            </NavLink>

                        </li>
                        <li onClick={Logout}>
                            <NavLink to="/login">
                            <img src={logout} className="logout-icon" alt='img log out'/>
                            </NavLink>
                        </li>
                        
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li >
                        <NavLink exact to="/login">
                            <img src={logout} className="logout-icon" alt='img log out'/>
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