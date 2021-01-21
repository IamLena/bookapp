const Database = require('./mysqlcon');

//user_rating doesn't work
// userbookinfo problem may be
module.exports = {
	async getBooks(user_id) {
		const db = new Database();
		try {
			sql = "SELECT DISTINCT ratings.rating, id, title, annotation, author, theme, user_id, favorite, status_id, user_rating\
			FROM (SELECT book_id, AVG(rating) as rating\
			FROM userbookinfo\
			WHERE rating != 0\
			GROUP BY book_id) as ratings\
			RIGHT JOIN\
			(SELECT authors_themes_books.id, title, annotation, author, theme, user_id, favorite, status_id, rating as user_rating\
			FROM\
			(SELECT *\
			FROM userbookinfo\
			WHERE user_id = ?) as curentuserbookinfo\
			RIGHT JOIN\
			(SELECT themes_books.id, title, annotation, authors.name as author, theme\
			FROM authors\
			INNER JOIN\
			(SELECT books.id, title, annotation, author_id, themes.name as theme\
			FROM themes\
			INNER JOIN books\
			on themes.id = books.theme_id) as themes_books\
			on authors.id = themes_books.author_id) as authors_themes_books\
			on curentuserbookinfo.book_id = authors_themes_books.id) as authors_themes_books_users\
			on ratings.book_id = authors_themes_books_users.id";
			if (!user_id)
				user_id = '';
			const books = await db.query(sql, user_id);
			await db.close();
			return books;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getBookById(book_id, user_id) {
		const db = new Database();
		try {
			sql = "SELECT DISTINCT ratings.rating, id, title, annotation, author, theme, user_id, favorite, status_id, user_rating\
			FROM (SELECT book_id, AVG(rating) as rating\
			FROM userbookinfo\
			WHERE rating != 0\
			GROUP BY book_id) as ratings\
			RIGHT JOIN\
			(SELECT authors_themes_books.id, title, annotation, author, theme, user_id, favorite, status_id, rating as user_rating\
			FROM\
			(SELECT *\
			FROM userbookinfo\
			WHERE user_id = ?) as curentuserbookinfo\
			RIGHT JOIN\
			(SELECT themes_books.id, title, annotation, authors.name as author, theme\
			FROM authors\
			INNER JOIN\
			(SELECT books.id, title, annotation, author_id, themes.name as theme\
			FROM themes\
			INNER JOIN books\
			on themes.id = books.theme_id\
			WHERE books.id = ?) as themes_books\
			on authors.id = themes_books.author_id) as authors_themes_books\
			on curentuserbookinfo.book_id = authors_themes_books.id) as authors_themes_books_users\
			on ratings.book_id = authors_themes_books_users.id";
			if (!user_id)
				user_id = '';
			const books = await db.query(sql, [user_id, book_id]);
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
