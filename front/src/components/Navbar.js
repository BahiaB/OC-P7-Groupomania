
import React from 'react';
import { NavLink } from "react-router-dom";
import Logout from"./login/logout"


function Navbar() {
    console.log(localStorage);

   
   
    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <NavLink exact to="/">
                        <div className='logo'>
                            <img src="./icon-left-font.png" alt='logo groupomania' />
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
                            <img src="./arrow-right-to-bracket-solid.svg" alt='img log out'/>
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