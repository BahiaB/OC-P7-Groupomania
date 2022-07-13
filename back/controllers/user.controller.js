
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
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
		if (err)
			throw err;

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
						if (err)
							throw err;
						res.status(201).json({ message: "Utilisateur créé!" });
					});
				})
				.catch((error) => res.status(500).json({ error }));
		}
	});
};

exports.login = (req, res, next) => {
	const email = req.body.email;
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
	const sql = `SELECT * FROM user WHERE UID=?;`;

	db.query(sql, userId, async (err, result) => {
		if (err) {
			console.log("error:", err)
			throw err;
		}
		if (result.length === 0)
			return res.status(400).json('lol')
		console.log(result[0])
		res.status(200).json(result[0])
	})

}

exports.updateUser = (req, res, next) => {

	const userId = req.auth.userId
	const pageId = req.params.id;
	const lastName = req.body.lastName;
	const firstName = req.body.firstName;
	const email = req.body.email;
	const file = req.body.file;
	const new_profil_image_url = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
	//const sqlCheck = "SELECT admin, UID from user WHERE UID = ?"
	const SqlOldFile = "SELECT imageProfile, admin, UID FROM user WHERE UID =?;"

	//console.log("req file", req.file)
	if (req.file) {
		console.log("req file", req.file)
		db.query(SqlOldFile, userId, async (err, result) => {
			if (userId === result[0].UID || result[0].admin === 1) {
				const oldFileName = result[0].imageProfile.split("/images/")[1];
				console.log("delete file result", oldFileName)
				if (oldFileName !== "avatar.png") {
					fs.unlink(`images/${oldFileName}`, () => {
						if (err) console.log("err delete image ", err);
						else {
							console.log("Ancienne image de profile supprimée");
						}
					})
				}
				const newInfoUser = {
					firstName: firstName,
					lastName: lastName,
					email: email,
					imageProfile: new_profil_image_url
				}
				console.log("new profil img url", new_profil_image_url)
				const sql = `UPDATE user SET ? WHERE UID= ? `
				db.query(sql, [newInfoUser, userId], async (err, result) => {
					if (err) {
						res.status(500).json({
							error: "Erreur lors de la modification de l'utilisateur",
						});
						throw err
					}
					else
						res.status(200).json(result)
				})
			}
			else{
				return(res.status(400).json({error:"Utilisateur non autorisé"}))
			}
		})

	}

}

exports.deleteUser = (req, res, next) => {
	const sqlFile = "SELECT imageProfile FROM user WHERE UID =?"
	const sqlCheck = "SELECT admin, UID from user WHERE UID = ?"
	const userId = req.auth.userId;

	db.query(sqlCheck, userId, async (err, result) => {
		if (result[0].UID === req.params.id || result[0].admin === 1) {
			console.log("result admin:", result[0])
			db.query(sqlFile, req.params.id, async (err, result) => {
				if (result[0].imageProfile) {
					const file = result[0].imageProfile.split("/images/")[1];
					if (file && file !== "avatar.png") {
						fs.unlink(`images/${file}`, () => {
							if (err) console.log("err delete image ", err);
							else {
								console.log("Ancienne image de posts supprimée");
							}
						})
					}
				}
				const sql = `DELETE  FROM user WHERE user.UID = ?;`;
				db.query(sql, req.params.id, (err, result) => {
					if (err) {
						res.status(404).json({ err });
						throw err;
					}
					else {
						return res.status(200).json("compte suprimé");
					}
				})
			})
		}
		else {
			res.status(400).json({ error: "Utilisateur non autorisé" })
		}
	})
}



exports.searchUser = (req, res, next) => {
	console.log("par ici search user")
	console.log("req params", req.query)
	const sql = `SELECT lastName, firstName, email, imageProfile, UID FROM user WHERE lastName=? OR firstName=?`
	db.query(sql, [req.query.user, req.query.user], async (err, result) => {
		if (err)
			throw err
		if (result.length === 0)
			return res.status(400).json({ error: "Utilisateur non trouvé" })
		else {
			console.log(result)
			res.status(200).json(result)
		}
	})
}
