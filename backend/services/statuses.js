const Database = require('./mysqlcon');

module.exports = {
	async getBooksOfStatus(user_id, status) {
		const db = new Database();
		try {
			sql = `SELECT * FROM userbookinfo INNER JOIN statuses WHERE user_id = ${user_id} AND status = ${status}`;
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
			VALUES (${user_id}, ${book_id}, ${status_id}, 0, 0)`;
			await db.query(sql);
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
			sql = `UPDATE userbookinfo SET status_id = ${status_id} WHERE user_id = ${user_id} AND book_id = ${book_id}`;
			await db.query(sql);
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
			sql = `SELECT * FROM userbookinfo INNER JOIN statuses WHERE user_id = ${user_id} AND favorite = 1`;
			const books = await db.query(sql);
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
			sql = `INSERT INTO userbookinfo(user_id, book_id, status_id, favorite, rating)
			VALUES (${user_id}, ${book_id}, 0, 1, 0)`;
			await db.query(sql);
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
			sql = `UPDATE userbookinfo SET favorite = ${favorite} WHERE user_id = ${user_id} AND book_id = ${book_id}`;
			await db.query(sql);
			await db.close();
		}
		catch(err) {
			await db.close();
			throw err;
		}
	}
}
