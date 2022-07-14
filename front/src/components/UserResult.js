import React from 'react'
import { NavLink } from 'react-router-dom'

function UserResult({ fname, name, mail, pic, UID }) {

    return (
        <NavLink to={`/account/${UID}`}>
            <div className='user-search' id="user-search-">
                <div className='image-container'>
                    <img src={pic} id="image" alt="profil" />
                </div>
                <div className='info-user'>
                    <p> nom: {name}</p>
                    <p> Prenom: {fname}</p>
                    <p>Contact: {mail}</p>
                </div>
            </div>
        </NavLink>)




}

export default UserResult