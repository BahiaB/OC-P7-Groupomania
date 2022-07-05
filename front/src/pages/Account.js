import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { NavLink, useLocation, useParams } from "react-router-dom";
import ChangeProfil from '../components/changeProfil';
//import avatar from "../image/avatar.png"


const Account = () => {
	//console.log(localStorage)
	useEffect(() => {
		getUser();
		//getUser3();

	});
	const [lastName, setLastName] = useState('')
	const [firstName, setFirstName] = useState('')
	const [email, setEmail] = useState('')
	const [imageProfile, setImageProfile] = useState()
	const [admin, setAdmin] = useState(0);
	//const [admin2, setAdmin2] = useState(0);
	const [profile, setProfile] = useState([]);


	const [profilModal, setProfilModal] = useState(false);
	let { id } = useParams();
	const userId = JSON.parse(localStorage.userId)
	const token = JSON.parse(localStorage.token)
	console.log(userId)
	console.log(id)

	const handleProfil = (e) => {
		setProfilModal(true)
	}

	const getUser = () => {
		console.log("edef")
		axios({
			method: "GET",
			url: `${process.env.REACT_APP_API_URL}api/auth/${id} `,

			headers: {
				authorization: `Bearer ${token}`
			}
		}).then((res) => {
			console.log(res.data);
			if (res.data.lastName)
				setLastName(res.data.lastName);
			if (res.data.firstName)
				setFirstName(res.data.firstName);
			if (res.data.email)
				setEmail(res.data.email);
			if (res.data.imageProfile === "") {

			}
			setImageProfile(res.data.imageProfile)
			getUser3();
			if (res.data.error) {
				console.log("ici", res.data.errors)

			}
		})
			.catch((err) => {
				console.log(err);
			});

	};

	const getUser3 = () => {
		console.log("edef")
		axios({
			method: "GET",
			url: `${process.env.REACT_APP_API_URL}api/auth/${userId} `,

			headers: {
				authorization: `Bearer ${token}`
			}
		}).then((res) => {
			console.log(res.data);
			
			//setImageProfile(res.data.imageProfile)
			setAdmin(res.data.admin);
			//if ( res.data.admin === 1)
			//	setAdmin2(1)
			console.log("admin account getuser2 ",admin)
			if (res.data.error) {
				console.log("ici", res.data.errors)

			}
		})
			.catch((err) => {
				console.log(err);
			});

	};



	//useEffect(getUser);
	const deleteProfile = () => {
		axios({
			method: "DELETE",
			url: `${process.env.REACT_APP_API_URL}api/auth/${id}`,

			headers: {
				authorization: `Bearer ${token}`
			}
		}).then((res) => {
			console.log("res", res);
			setProfile(res.data);
			window.location = "/login";
			if (res.data.error) {
				console.log("ici222", res.data.errors)

			}
		})
			.catch((err) => {
				console.log(err);
			});
	}


	return (
		<section>
			<div className='account-container'>
				<div className='image-container'>
					<img src={imageProfile} id="image-profile-account" alt='profile' ></img>
				</div>

				{userId === id  || admin === 1 ? (
					<div className='user-prentation'>
						<p>nom: {lastName}</p>
						<p> Prenom: {firstName}</p>
						<p>Contact : {email}</p>
						<li onClick={handleProfil} id="show-profil" className="active-btn">Modifier</li>

						{profilModal && <ChangeProfil userId={userId}
							admin={admin} />}

						{userId === id || admin === 1 ? (
							<li onClick={deleteProfile} id="delete_profile" className='active-btn'>Supprimer ce profile</li>
							
						)
							: ("")
						}
						<br />
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

//{handleProfil}