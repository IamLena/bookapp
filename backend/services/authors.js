const Database = require('./mysqlcon');

module.exports = {
	async getAuthors() {
		const db = new Database();
		try {
			sql = `SELECT * FROM authors`;
			const authors = await db.query(sql);
			await db.close();
			return authors;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getAuthorById(id) {
		const db = new Database();
		try {
			sql = `SELECT * FROM authors WHERE id = ?`, id;
			const authors = await db.query(sql);
			let author = undefined;
			if (authors.length > 0)
				author = authors[0];
			await db.close();
			return author;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getAuthorByName(name) {
		const db = new Database();
		try {
			sql = `SELECT * FROM authors WHERE name = ?`, name;
			const authors = await db.query(sql);
			let author = undefined;
			if (authors.length > 0)
				author = authors[0];
			await db.close();
			return author;

		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getAuthorByNameLike(name) {
		const db = new Database();
		try {
			sql = `SELECT * FROM authors WHERE name like ?`, name;
			const authors = await db.query(sql);
			await db.close();
			return authors;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async createAuthor(id, name) {
		const db = new Database();
		try {
			await db.query("INSERT into authors SET ?", {
				id : id,
				name : name
			});
		}
		catch(err) {
			throw err;
		}
		finally{
			await db.close();
		}
	}
}
