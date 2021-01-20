const {generateUuid} =  require('../services/database');
const {getThemes, getThemeById, getThemeByName, getThemeByNameLike, createTheme, } = require('../services/themes');
const {getAuthors, getAuthorById, getAuthorByName, getAuthorByNameLike, createAuthor} = require('../services/authors');
const {getBooks, getBookById, getBooksByTitle, getBooksByAuthor, getBooksByTheme, createBook} = require('../services/books');
const {getStatusByName, getUsersBooks, getBooksOfStatus, addBookStatus, updateBookStatus, getFavoriteBooks, addFavoriteBook, updateFavoriteBook} = require('../services/statuses');
const {getBookRating, createRating, updateRating, deleteRating} = require('../services/ratings');

exports.createBook = async (req, res) => {
	let {title, author, theme, annotation} = req.body;
	if (!title || !author || !theme)
		res.status(400).json({msg: "not all data provided"});
	else
	{
		try {
			const uuid = await generateUuid();
			const author_obj = await getAuthorByName(author);
			const theme_obj = await getThemeByName(theme);
			let author_id, theme_id;
			if (!author_obj)
			{
				author_id = await generateUuid();
				await createAuthor(author_id, author);
			}
			else
				author_id = author_obj.id;
			if (!theme_obj)
			{
				theme_id = await generateUuid();
				await createTheme(theme_id, theme);
			}
			else
				theme_id = theme_obj.id;
			await createBook(uuid, title, theme_id, author_id, annotation);
			res.status(201).json({msg: "book was added"});
		}
		catch(err) {
			console.log(err);
			res.status(500).send(err);
		}
	}
}

exports.getAllBooks = async (req, res) => {
	try {
		// if (req.session.user_id)
		// {
		// 	const favfilter = req.query.favorites;
		// }
		const books = await getBooks();
		res.status(200).send(books);
	}
	catch(err) {
		console.log(err);
		res.status(500).send(err);
	}
}

exports.getBooksById = async (req, res) => {
	try {
		id = req.params.id;
		if (!id)
		{
			res.status(404).json({msg: "not found book status"});
			return;
		}
		const book = await getBookById(id);
		if (!book)
			res.status(404).json({msg: "book not found"});
		else
			res.status(200).send(book);
	}
	catch(err) {
		console.log(err);
		res.status(500).send(err);
	}
}

exports.addBookToStatus = async (req, res) => {
	try {
		const status = req.params.status;
		if (!status)
		{
			res.status(404).json({msg: "not found book status"});
			return;
		}
		const status_obj = await getStatusByName(status);
		if (!status_obj)
		{
			res.status(404).json({msg: "not found book status"});
			return;
		}
		const user_id = req.session.user_id;
		const book_id = req.body.book_id;
		if (!user_id || !book_id)
		{
			res.status(400).json({msg: "book_id and user_id needed"});
			return;
		}
		const status_id = status_obj.id;
		const books = await getUsersBooks(user_id, book_id);
		if (books.length == 0)
			await addBookStatus(book_id, user_id, status_id);
		else
			await updateBookStatus(book_id, user_id, status_id);
		res.status(201).json({"msg": `book added to ${status}`});
	}
	catch(err) {
		console.log(err);
		res.status(500).send(err);
	}
}

exports.removeBookFromStatus = async (req, res) => {
	try {
		console.log('hey');
		const status = req.params.status;
		if (!status)
		{
			res.status(404).json({msg: "not found book status"});
			return;
		}
		const status_obj = await getStatusByName(status);
		if (!status_obj)
		{
			res.status(404).json({msg: "not found book status"});
			return;
		}
		const user_id = req.session.user_id;
		const book_id = req.params.book_id;
		if (!user_id || !book_id)
		{
			res.status(400).json({msg: "book_id and user_id needed"});
			return;
		}
		const status_id = status_obj.id;
		const books = await getUsersBooks(user_id, book_id);
		if (books.length != 0)
			await updateBookStatus(book_id, user_id, 0);
		res.status(201).json({"msg": `book removed from ${status} category`});
	}
	catch(err) {
		console.log(err);
		res.status(500).send(err);
	}
}

exports.addRating = async (req, res) => {
	const book_id = req.params.id;
	const user_id = req.session.user_id;
	const rating = req.body.rating;
	if (!user_id || !book_id || !rating)
	{
		res.status(400).json({msg: "book_id, user_id and rating needed"});
		return;
	}
	const books = await getUsersBooks(user_id, book_id);
	if (books.length == 0)
		await createRating(book_id, user_id, rating);
	else
		await updateRating(book_id, user_id, rating);
	res.status(201).json({"msg": `rating was set`});
}


exports.changeRating = async (req, res) => {
	const book_id = req.params.id;
	const user_id = req.session.user_id;
	const rating = req.body.rating;
	if (!user_id || !book_id || !rating)
	{
		res.status(400).json({msg: "book_id, user_id and rating needed"});
		return;
	}
	const books = await getUsersBooks(user_id, book_id);
	if (books.length != 0)
		await updateRating(book_id, user_id, rating);
	res.status(201).json({"msg": `rating changed`});
}

exports.resetRating = async (req, res) => {
	const book_id = req.params.id;
	const user_id = req.session.user_id;
	if (!user_id || !book_id)
	{
		res.status(400).json({msg: "book_id, user_id and rating needed"});
		return;
	}
	const books = await getUsersBooks(user_id, book_id);
	if (books.length != 0)
		await deleteRating(book_id, user_id);
	res.status(201).json({"msg": `rating reseted`});
}
