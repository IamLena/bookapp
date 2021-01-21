const Database = require('./mysqlcon');

module.exports = {
	async getStatusByName(name) {
		const db = new Database();
		try {
			sql = `SELECT * FROM statuses WHERE status = '${name}'`;
			const statuses = await db.query(sql);
			let status = undefined;
			if (statuses.length > 0)
				status = statuses[0];
			await db.close();
			return status;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getUsersBooks (user_id, book_id) {
		const db = new Database();
		try {
			sql = `SELECT * FROM userbookinfo WHERE user_id = '${user_id}' AND book_id = '${book_id}'`;
			const books = await db.query(sql);
			await db.close();
			return books;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getBooksOfStatus(user_id, status_id) {
		const db = new Database();
		try {
			sql = `SELECT * FROM userbookinfo WHERE user_id = '${user_id}' AND status_id = ${status_id}`;
			const books = await db.query(sql);
			await db.close();
			return books;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async addBookStatus(book_id, user_id, status_id) {
		const db = new Database();
		try {
			sql = `INSERT INTO userbookinfo(user_id, book_id, status_id, favorite, rating)
			VALUES (?, ?, ?, 0, 0)`;
			await db.query(sql, [user_id, book_id, status_id]);
			await db.close();
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async updateBookStatus(book_id, user_id, status_id) {
		const db = new Database();
		try {
			sql = `UPDATE userbookinfo SET status_id = ? WHERE user_id = ? AND book_id = ?`;
			await db.query(sql, [status_id, user_id, book_id]);
			await db.close();
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getFavoriteBooks(user_id) {
		const db = new Database();
		try {
			sql = `SELECT * FROM userbookinfo INNER JOIN statuses WHERE user_id = ? AND favorite = 1`;
			const books = await db.query(sql, user_id);
			await db.close();
			return books;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async addFavoriteBook(user_id, book_id) {
		const db = new Database();
		try {
			sql = "INSERT INTO userbookinfo(user_id, book_id, favorite, status_id, rating) VALUES (?, ?, 1, 0, 0)";
			await db.query(sql, [user_id, book_id]);
			await db.close();
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async updateFavoriteBook(user_id, book_id, favorite) {
		const db = new Database();
		try {
			sql = `UPDATE userbookinfo SET favorite = ? WHERE user_id = ? AND book_id = ?`;
			console.log(sql);
			console.log(favorite, user_id, book_id);
			await db.query(sql, [favorite, user_id, book_id]);
			await db.close();
		}
		catch(err) {
			await db.close();
			throw err;
		}
	}
}
