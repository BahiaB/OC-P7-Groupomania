import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

function UserResult({ fname, name, mail, pic, UID }) {


    const userId = JSON.parse(localStorage.userId)
    const token = JSON.parse(localStorage.token)
    console.log(UID)
    return (
        <NavLink to={`/account/${UID}`}>
        <div className='user-search' id="user-search-">
            
            <div className='image-container'>
                
                   
                    <img src={pic} id="image" alt="pictur"/>
                
            </div>
            <div className='info-user'>
            <p> nom: {name}</p>
            <p> Prenom: {fname}</p>
            <p>Contact: {mail}</p>
            </div>
            
        </div>
        </NavLink>
    )
}

export default UserResult