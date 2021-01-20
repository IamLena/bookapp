const Database = require('./mysqlcon');

module.exports = {
	async getBookRating(book_id) {
		const db = new Database();
		try {
			sql = `SELECT AVG(rating) FROM userbookinfo WHERE book_id = '${book_id}' AND rating != 0`;
			const rating = await db.query(sql);
			await db.close();
			return rating;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async createRating(book_id, user_id, rating) {
		const db = new Database();
		try {
			await db.query("INSERT into userbookinfo SET ?", {
				book_id : book_id,
				user_id : user_id,
				rating: rating
			});
		}
		catch(err) {
			throw err;
		}
		finally{
			await db.close();
		}
	},
	async updateRating(book_id, user_id, rating) {
		const db = new Database();
		try {
			await db.query("UPDATE userbookinfo SET rating = ? WHERE book_id = ? AND user_id = ?",
			[rating, book_id, user_id]);
		}
		catch(err) {
			throw err;
		}
		finally{
			await db.close();
		}
	},
	async deleteRating(book_id, user_id) {
		const db = new Database();
		try {
			await db.query("UPDATE userbookinfo SET rating = ? WHERE book_id = ? AND user_id = ?",
			[0, book_id, user_id]);
		}
		catch(err) {
			throw err;
		}
		finally{
			await db.close();
		}
	}
}
