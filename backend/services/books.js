const Database = require('./mysqlcon');

module.exports = {
	async getBooks() {
		const db = new Database();
		try {
			sql = "select ratings.rating, id, title, annotation, author, theme, user_id, favorite, status_id\
			from (select book_id, AVG(rating) as rating\
			from userbookinfo\
			where rating != 0\
			group by book_id) as ratings\
			right join\
			(select authors_themes_books.id, title, annotation, author, theme, user_id, favorite, status_id\
			from userbookinfo\
			right join\
			(select themes_books.id, title, annotation, authors.name as author, theme\
			from authors\
			inner join\
			(select books.id, title, annotation, author_id, themes.name as theme\
			from themes\
			inner join books\
			on themes.id = books.theme_id) as themes_books\
			on authors.id = themes_books.author_id) as authors_themes_books\
			on userbookinfo.book_id = authors_themes_books.id) as authors_themes_books_users\
			on ratings.book_id = authors_themes_books_users.id\
			";
			const books = await db.query(sql);
			await db.close();
			return books;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getBookById(id) {
		const db = new Database();
		try {
			sql = "SELECT t.id, title, annotation, author, themes.name as theme FROM \
			(SELECT books.id, title, annotation, authors.name as author, books.theme_id\
			FROM books\
			inner join authors\
			on books.author_id = authors.id\
			where books.id = ?) as t\
			inner join themes on t.theme_id = themes.id";
			const books = await db.query(sql, id);
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
				on books.author_id = authors.id
				WHERE title like ${substr})
			inner join themes
			on books.theme_id = themes.id`
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
				on books.author_id = authors.id
				WHERE author.name like ${substr})
			inner join themes
			on books.theme_id = themes.id`
			const books = await db.query(sql);
			await db.close();
			return books;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getBooksByTheme(theme_id) {
		const db = new Database();
		try {
			const sql = `
			SELECT *
			FROM (SELECT *
				FROM books inner join authors
				on books.author_id = authors.id
				where books.theme_id = '${theme_id}')
			inner join themes
			on books.theme_id = themes.id`
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
				theme_id : themeid,
				author_id : authorid,
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
