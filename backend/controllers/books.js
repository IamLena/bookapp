const {generateUuid} =  require('../services/database');
const {getThemeByName, createTheme} = require('../services/themes');
const {getAuthorByName, createAuthor} = require('../services/authors');
const {getBooks, getBookById, createBook} = require('../services/books');

const getAuthorThemeids = async (author, theme) => {
	const author_obj = await getAuthorByName(author);
	let author_id, theme_id;
	if (!author_obj)
	{
		author_id = await generateUuid();
		await createAuthor(author_id, author);
	}
	else
		author_id = author_obj.id;
	const theme_obj = await getThemeByName(theme);
	if (!theme_obj)
	{
		theme_id = await generateUuid();
		await createTheme(theme_id, theme);
	}
	else
		theme_id = theme_obj.id;
	return {author_id, theme_id};
}

const getfiltersFromQuery = (req) => {
	let filters = {
		start: parseInt(req.query.start),
		stop : parseInt(req.query.stop),
		themes : req.query.themes,
		search : req.query.search,
		status : req.query.status,
		favorite : req.query.favorite,
		mineonly : req.query.mineonly,
		sortby : req.query.sortby
	}
	if (!req.session.user_id) {
		filters.mineonly = undefined;
		filters.status = undefined;
		filters.favorite = undefined;
	}
	if (filters.themes)
		filters.themes = filters.themes.split(',');
	return filters;
}

const sortbook = (sortby, books) => {
	if (sortby == 'alphabetically')
		books = books.sort((a, b) => {return (a.title - b.title);});
	else if (sortby == 'bypopularity')
		books = books.sort((a, b) => {return (b.rating - a.rating);});
	return (books);
}

//doesn't work
const slicebooks = (start, stop, books) => {
	if (start && stop)
		books = books.slice(start, stop);
	else if (start)
		books = books.slice(start);
	else if (stop)
		books = books.slice(0,stop);
	return (books);
}

exports.createBook = async (req, res) => {
	let {title, author, theme, annotation} = req.body;
	if (!title || !author || !theme || !annotation)
		res.status(400).json({msg: "not all data provided"});
	else
	{
		try {
			const uuid = await generateUuid();
			const {author_id, theme_id} = await getAuthorThemeids(author, theme);
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
		let filters = getfiltersFromQuery(req);
		const filterbooksfunc = (book) => {
			if ((filters.mineonly && filters.mineonly != 'false') && !book.user_id)
				return false;
			if ((filters.favorite && filters.favorite != 'false') && !book.favorite)
				return false;
			if (filters.themes && !filters.themes.includes(book.theme))
				return false;
			if (filters.status && book.status != filters.status)
				return false;
			if (filters.search && !(book.title.includes(filters.search) || book.author.includes(filters.search)))
				return false;
			return true;
		};

		let books = await getBooks();
		books = books.filter(filterbooksfunc);
		books = sortbook(filters.sortby, books);
		books = slicebooks(filters.start, filters.start, books);
		res.status(200).send(books);
	}
	catch(err)
	{
		console.log(err);
		res.status(500).json({msg: "internal error"});
	}
}

exports.getBooksById = async (req, res) => {
	const id = req.params.id;
	if (!id)
	{
		res.status(404).json({msg: "not found book status"});
		return;
	}
	try {
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
