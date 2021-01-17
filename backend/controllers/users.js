const bcrypt = require('bcryptjs')
const {sign} = require("jsonwebtoken");
const Database = require('./database');

class UserAbstraction {
	async emailIsTaken(email) {
		const db = new Database();
		let numberOfUsersWithEmail;
		try {
			const users = await db.query(`SELECT * FROM users WHERE email = ?`, email);
			numberOfUsersWithEmail = users.length;
			await db.close();
			return (numberOfUsersWithEmail > 0);
		}
		catch(err) {
			await db.close();
			throw err; // will be catched and passed up if have finally block returning smth? - no!
		}
	};
	async generateUuid() {
		const db = new Database();
		let uuid;
		try {
			const idresults = await db.query("SELECT uuid() as id");
			uuid = idresults[0].id;
			await db.close();
			return uuid;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	};
	async addUserToDatabase(email, name, password) {
		const uuid = await this.generateUuid();
		password = await bcrypt.hash(password, 10);
		const db = new Database();
		try {
			await db.query("INSERT into users SET ?", {
				id: uuid,
				email: email,
				name: name,
				password: password
			});
		}
		catch(err) {
			throw err;
		}
		finally{
			await db.close();
		}
	};
}

exports.post = async (req, res) => {
	let {name, email, password, confirmedpassword} = req.body;
	if (!name || !email || !password || !confirmedpassword)
		res.status(400).json({msg: "not all data provided"});
	else if (password != confirmedpassword)
		res.status(400).json({msg: "passwords do not match"});
	else
	{
		try {
			const userManager = new UserAbstraction();
			if (await userManager.emailIsTaken(email))
				res.status(400).json({msg: "email is already registered"});
			else
			{
				await userManager.addUserToDatabase(email, name, password);
				const jsontoken  = sign({}, process.env.JWTKEY, {
					expiresIn: "1h"
				});
				res.status(200).json({jwt: jsontoken});
			}
		}
		catch(err) {
			console.log(err)
			res.status(500).send(err)
		}
	}
};
