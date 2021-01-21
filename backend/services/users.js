const Database = require('./mysqlcon');

module.exports = {
	async getUserByEmail(email) {
		const db = new Database();
		try {
			const users = await db.query(`SELECT * FROM users WHERE email = ?`, email);
			await db.close();
			let user = undefined;
			if (users.length > 0)
				user = users[0];
			return user;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getUserById(id)
	{
		const db = new Database();
		try {
			const users = await db.query(`SELECT * FROM users WHERE id = ?`, id);
			await db.close();
			let user = undefined;
			if (users.length > 0)
				user = users[0];
			return user;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async createUser(id, email, name, password) {
		const db = new Database();
		try {
			await db.query("INSERT into users SET ?", {
				id: id,
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
	},
	async updateUser(id, password) {
		const db = new Database();
		try {
			await db.query("UPDATE users SET password = ? WHERE id = ?", [password, id]);
		}
		catch(err) {
			throw err;
		}
		finally{
			await db.close();
		}
	}
};
