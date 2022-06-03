import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import getUser from "../pages/Account"



function ChangeProfil() {
    useEffect(() => {
        //getUser();
        handleProfile()
        
    }, );
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageProfileUpload, setImageProfileUpload] = useState();

    let { id } = useParams();
    const token = JSON.parse(localStorage.token)

   const handleProfile= (e) => {
       
       // e.preventDefault();
        axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API_URL}api/auth/${id} `,
            data: {
                
                email: email,
                firstName: firstName,
                lastName: lastName,
                imageProfile: imageProfileUpload,
            },
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res);
            
            if (res.data.error) {
                console.log("ici",res.data.errors)
               
            }

    })
    };

    return(
        <form action="" onSubmit={handleProfile} id="profil-form">
            <label htmlFor="email">Email</label>
            <br />
            <input type="text" name="email" id='email' onChange={(e) => setEmail
                (e.target.value)} value={email}></input>
            <div className='email-error'></div>
            <br />

            <label htmlFor='first-name'>Prenom</label>
            <br />
            <input type="text" name='first-name' id='first-name' onChange={(e) => setFirstName
                (e.target.value)} value={firstName}></input>
            <div className='password error'></div>
            <br />

            <label htmlFor="text">Nom de famille</label>
            <br />
            <input type="text" name="last-name" id='last-name' onChange={(e) => setLastName
                (e.target.value)} value={lastName}></input>
            <div className='email-error'></div>
            <br />

            <input type="submit" value="modifier mon profil"></input>
            
           

        </form>
    )

}

export default ChangeProfil;