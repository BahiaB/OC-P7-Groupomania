import React, { useState } from 'react';
import axios from "axios";
import {emailValidation, nameValidation, firstNameValidation} from "../../Utils/utils"
//import { NavLink } from 'react-router-dom';

const SignUpForm = () => {


	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [lastName, setLastName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [emailError, setEmailError] = useState("")
	const [lastNameError, setLastNameError] = useState("")
	const [firstNameError, setFirstNameError] = useState("")


	const handleSignUp = async (e) => {
		e.preventDefault();
		
		if (emailValidation(email) === false) {
			setEmailError("Veuillez entrez un email valide")
		}
		if (nameValidation(lastName) === false) {
			setLastNameError("Veuillez entrez un nom valide")
		}

		if (firstNameValidation(firstName) === false) {
			setFirstNameError("Veuillez entrez un nom valide")
		}


		if (emailValidation(email) && nameValidation(lastName) && firstNameValidation(firstName) ) {

			await axios({
				method: "post",
				url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
				data: {
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password,
				},
			})
				.then((res) => {
					console.log(res.data);
					console.log(localStorage)
					window.location = "/login"
						
					}
				)
				.catch((err) => console.log(err.message));
		}
	}



	return (
		<form action="" onSubmit={handleSignUp} id="sign-up-form">

			<label htmlFor='first-name'>Prenom</label>
			<br />
			<input type="text" name="first-name" id='first-name' placeholder="Prenom" onChange={(e) => setFirstName
				(e.target.value)} value={firstName}></input>
			<div className='first-name error'>{firstNameError}</div>
			<br />

			<label htmlFor='last-name'> Nom</label>
			<br />
			<input type="text" name="last-name" id='last-name' placeholder="Nom" onChange={(e) => setLastName
				(e.target.value)} value={lastName}></input>
			<div className='last-name error'>{lastNameError}</div>
			<br />

			<label htmlFor="email">Email</label>
			<br />
			<input type="text" name="email" id='email' placeholder="Email"onChange={(e) => setEmail
				(e.target.value)} value={email}></input>
			<div className='emailError'>{emailError}</div>
			<br />

			<label htmlFor='password'>Mot de passe</label>
			<br />
			<input type="password" name='password' id='password' placeholder="Mot de passe" onChange={(e) => setPassword
				(e.target.value)} value={password}></input>
			<div className='password error'></div>
			<br />
			<input type="submit" value="S'inscrire"></input>
		</form>
	)
}


export default SignUpForm;

