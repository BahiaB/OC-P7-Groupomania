import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { NavLink, useLocation, useParams } from "react-router-dom";
import ChangeProfil from '../components/changeProfil';


const Account = () =>{
	//console.log(localStorage)
	const [lastName, setLastName]= useState('')
	const [firstName, setFirstName]= useState('')
	const[email, setEmail] = useState('')
	const [imageProfile, setImageProfile ]= useState('')
	

	const[profilModal, setProfilModal]= useState(false);
	let { id } = useParams();
	const userId = JSON.parse(localStorage.userId)
	const token = JSON.parse(localStorage.token)
	console.log(userId)
	console.log(id)

	const handleProfil = (e) =>{
		setProfilModal(true)
	}
                  
	const getUser = () =>{
		axios ({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/${id} `,
            
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);
			if (res.data.lastName)
				setLastName(res.data.lastName);
			if (res.data.firstName )
				setFirstName(res.data.firstName);
			if (res.data.email)
				setEmail(res.data.email);
			setImageProfile(res.data.imageprofile)
            
            if (res.data.error) {
                console.log("ici",res.data.errors)
               
            } 
          })
          .catch((err) => {
            console.log(err);
          });

      };
	
	useEffect(getUser);
  

	return(
		<section>
            <div className='account-container'>
				<div className='image-container'>
                	<p>image avatar</p>
				</div>
            
                {userId === id ? (
					<div className='user-prentation'>
					<p >nom: {lastName}</p>
					<p> Prenom {firstName}:</p>
					<p>Contact : {email}</p>
					<li onClick={handleProfil} id="showProfil" className="active-btn">Modifier</li>
					{profilModal && <ChangeProfil />}
					</div>

					
                 
                ) : (
                    <div className='user-prentation'>
					<p> nom: {lastName}</p>
					<p> Prenom: {firstName}</p>
					<p>Contact: {email}</p>
					</div>
                )}
				
				</div>  
    </section>
	)
}

export default Account;
