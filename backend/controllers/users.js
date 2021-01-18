const bcrypt = require('bcryptjs')
const {sign} = require("jsonwebtoken");
const {generateUuid} =  require('../services/database');
const {getUserByEmail, createUser} = require('../services/users');

exports.post = async (req, res) => {
	let {name, email, password, confirmedpassword} = req.body;
	if (!name || !email || !password || !confirmedpassword)
		res.status(400).json({msg: "not all data provided"});
	else if (password != confirmedpassword)
		res.status(400).json({msg: "passwords do not match"});
	else
	{
		try {
			const userWithEmail = await getUserByEmail(email);
			if (userWithEmail)
				res.status(400).json({msg: "email is already registered"});
			else
			{
				const uuid = await generateUuid();
				password = await bcrypt.hash(password, 10);
				await createUser(uuid, email, name, password);
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
