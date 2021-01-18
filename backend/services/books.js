const Database = require('./mysqlcon');

module.exports = {
	async getBooks() {
		const db = new Database();
		try {
			sql = `
			SELECT *
			FROM (SELECT *
				FROM books inner join authors
				by books.author_id = authors.id)
			inner join themes
			by books.theme_id = themes.id`;
			const books = await db.query(sql);
			await db.close();
			return books;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getBooksById(id) {
		const db = new Database();
		try {
			sql = `
				SELECT *
				FROM (SELECT *
					FROM books inner join authors
					by books.author_id = authors.id
					where book.id = ${id})
				inner join themes
				by books.theme_id = themes.id`;
			const books = await db.query(sql);
			await db.close();
			let book = undefined;
			if (books.length > 0)
				book = books[0];
			return book;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getBooksByTitle(substr) {
		const db = new Database();
		try {
			const sql = `
			SELECT *
			FROM (SELECT *
				FROM books inner join authors
				by books.author_id = authors.id
				WHERE title like ${substr})
			inner join themes
			by books.theme_id = themes.id`
			const books = await db.query(sql);
			await db.close();
			return books;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getBooksByAuthor(substr) {
		const db = new Database();
		try {
			const sql = `
			SELECT *
			FROM (SELECT *
				FROM books inner join authors
				by books.author_id = authors.id
				WHERE author.name like ${substr})
			inner join themes
			by books.theme_id = themes.id`
			const books = await db.query(sql);
			await db.close();
			return books;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getBooksByTheme(substr) {
		const db = new Database();
		try {
			const sql = `
			SELECT *
			FROM (SELECT *
				FROM books inner join authors
				by books.author_id = authors.id)
			inner join themes
			by books.theme_id = themes.id
			WHERE theme.name like ${substr}`
			const books = await db.query(sql);
			await db.close();
			return books;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async createBook(id, title, themeid, authorid, annotation) {
		const db = new Database();
		try {
			await db.query("INSERT into books SET ?", {
				id : id,
				title : title,
				themeid : themeid,
				authorid : authorid,
				annotation : annotation
			});
		}
		catch(err) {
			throw err;
		}
		finally{
			await db.close();
		}
	}
};
