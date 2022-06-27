
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const fs = require("fs");
const crypto = require('crypto');

const dbc = require("../db");
const { userInfo } = require("os");
const db = dbc.getDB();


exports.signup = (req, res, next) => {
	//console.log("req body", req.body);
	const pwd = req.body.password;
	const email = req.body.email;
	const sql = `SELECT email FROM user WHERE email=?`;
	let query = db.query(sql, email, async (err, result) => {
		if (err) throw err;

		if (result.length === 1) {
			return res.status(400).json({ error: "Utilisateur déja existant !" });
		}
		if (pwd.length < 6) {
			return res.status(400).json({
				message: "Le mot de passe doit être de 6 caractéres minimum!",
			});
		} else {
			bcrypt
				.hash(req.body.password, 10)
				.then((hash) => {
					const newUser = {
						lastName: req.body.lastName,
						firstName: req.body.firstName,
						email: req.body.email,
						password: hash,
						UID: crypto.randomUUID(),
					};
					let sql = "INSERT INTO user SET ?";
					let query = db.query(sql, newUser, (err, result) => {
						if (err) throw err;

						//console.log(result);
						res.status(201).json({ message: "Utilisateur créé!" });
					});
				})
				.catch((error) => res.status(500).json({ error }));
		}
	});
};

exports.login = (req, res, next) => {
	const email = req.body.email;
	//console.log(email)
	const sql = `SELECT * FROM user WHERE email=?`;
	db.query(sql, email, async (err, result) => {
		if (err) {
			console.log(err);
			throw err;
		}
		if (result.length === 0) {
			return res.status(401)
				.json({ error: "Identifiant ou mot de passe incorrect" });
		}
	//	console.log(result);
		//console.log(result);
		//console.log(req.body.password);
	//	console.log(result[0].UID);
		bcrypt.compare(req.body.password, result[0].password)
			.then((valid) => {
				if (!valid) {
					return res.status(401).json(
						{ error: "Nom d'utilisateur ou Mot de passe incorrect !" });
				}
				res.status(200).json({
					userId: result[0].UID,
					token: jwt.sign({ userId: result[0].UID }, 'RANDOM_TOKEN_SECRET', { expiresIn: "24h" }),
				})

			})
			.catch((error) => res.status(500).json({ error }));
		console.log("utilisateur connecté");
	})
}

exports.userInfo = (req, res, next) => {
	const userId = req.params.id;

	console.log("userid:", userId);
	const sql = `SELECT * FROM user WHERE UID='${userId}'	 `;

	/*if (userId !== result[0].UID) {
		console.log(userId, result[0].UID)
		return res.status(401).json({ error: " TOKEN invalide, requête non autorisé !" });
	  }else{*/

	db.query(sql, userId, async (err, result) => {
		console.log(result[0])
		if (err) {
			console.log("error:", err)
			throw err;
		}
		if (result.length === 0)
			return res.status(400).json('lol')
	//	console.log(result[0])
		res.status(200).json(result[0])
	})

}

exports.updateUser = (req, res, next) => {
	//console.log(req.auth);
	const userId = req.auth.userId
	//console.log("ici2",userId)
	const pageId = req.params.id;
	const lastName = req.body.lastName;
	const firstName = req.body.firstName;
	const email = req.body.email;
	const file = req.body.file;
	const sqlAdminInfos = `SELECT admin FROM user WHERE UID='${userId}'`;
	const checkAdmin = null;

	//console.log(userId);
	db.query(sqlAdminInfos, (err, result) => {
		admin = result.admin;
		//console.log(result)
		if (err) {
			console.log("error:", err)
			throw err;
		}
	})
	console.log(req.body.imageProfile)
		const new_profil_image_url = `${req.protocol}://${req.get("host")}/images${req.file.filename}`;
			
			
		const newInfoUser = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			imageProfile: new_profil_image_url
		}
		const sql = `UPDATE user SET ? WHERE UID= '${userId}' `
		db.query(sql, newInfoUser, (err, result) => {
			if (err) {
				res.status(500).json({ error: "erreur lors de la modifiation de l'utilisateur" })
				throw err;
			}
			res.status(200).json({ message: "Utilisateur modifié!" });
			console.log("utilisateur modifié");
		})

	}

