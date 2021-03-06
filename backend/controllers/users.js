const bcrypt  = require('bcryptjs')
const {getToken} = require("../services/jwt");
const {generateUuid} =  require('../services/database');
const {getUserById, getUserByEmail, createUser, updateUser} = require('../services/users');

exports.addUser = async (req, res) => {
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
				req.session.user_id = uuid;
				const jsontoken  = getToken(uuid);
				res.status(200).json({jwt: jsontoken});
			}
		}
		catch(err) {
			console.log(err)
			res.status(500).send(err)
		}
	}
};

exports.updatePassword = async (req, res) => {
	let user_id = req.params.id;
	let {password, confirmedpassword} = req.body;
	if (!password || !confirmedpassword)
		res.status(400).json({msg: "not all data provided"});
	else if (password != confirmedpassword)
		res.status(400).json({msg: "passwords do not match"});
	else
	{
		try {
			const userWithId = await getUserById(user_id);
			if (!userWithId)
				res.status(400).json({msg: "user not found"});
			else
			{
				password = await bcrypt.hash(password, 10);
				await updateUser(user_id, password);
				res.status(201).json({msg: "password updated"});
			}
		}
		catch(err) {
			console.log(err)
			res.status(500).send(err)
		}
	}
}

exports.login = async (req, res) => {
	try {
		const {email, password} = req.body;
		if (!email || !password)
			res.status(400).json({msg: "not all data provided"});
		else
		{
			let userWithEmail = await getUserByEmail(email);
			if (!userWithEmail)
			res.status(400).json({msg: "no user with this email"});
			else
			{
				const validpassword = bcrypt.compareSync(password, userWithEmail.password);
				if (validpassword)
				{
					req.session.user_id = userWithEmail.id;
					const jsontoken  = getToken(userWithEmail.id);
					res.status(200).json({jwt: jsontoken});
				}
				else
					res.status(400).json({msg: "invalid password"});
			}
		}
	}
	catch(err) {
		console.log(err)
		res.status(500).send(err)
	}
}

exports.logout = async (req, res) => {
	res.status(201);
}
