const {getStatusByName, getUsersBooks, addBookStatus, updateBookStatus, addFavoriteBook, updateFavoriteBook} = require('../services/statuses');

const addBookToFavorite = async (req, res) => {
	console.log('addBookToFavorite');
	try {
		const user_id = req.session.user_id;
		const book_id = req.body.book_id;
		if (!user_id || !book_id)
		{
			res.status(400).json({msg: "book_id and user_id needed"});
			return;
		}
		const books = await getUsersBooks(user_id, book_id);
		if (books.length == 0)
			await addFavoriteBook(book_id, user_id);
		else if (!books[0].favorite)
			await updateFavoriteBook(book_id, user_id, 1);
		res.status(201).json({"msg": `book added to favorites`});
	}
	catch(err) {
		console.log(err);
		res.status(500).send(err);
	}
}

const removeBookFromFavorite = async (req, res) => {
	try {
		const user_id = req.session.user_id;
		const book_id = req.params.book_id;
		if (!user_id || !book_id)
		{
			res.status(400).json({msg: "book_id and user_id needed"});
			return;
		}
		const books = await getUsersBooks(user_id, book_id);
		if (books.length != 0 && books[0].favorite)
			await updateFavoriteBook(book_id, user_id, 0);
		res.status(201).json({"msg": `book removed from favorites`});
	}
	catch(err) {
		console.log(err);
		res.status(500).send(err);
	}
}

const getStatusId = async (statusname, res) => {
	let status_id;
	if (!statusname)
		res.status(404).json({msg: "not found book status"});
	else
	{
		const status_obj = await getStatusByName(statusname);
		if (!status_obj)
			res.status(404).json({msg: "not found book status"});
		else
			status_id = status_obj.id;
	}
	return (status_id);
}

const addBookToReadStatus = async (req, res) => {
	try {
		const user_id = req.session.user_id;
		const book_id = req.body.book_id;
		if (!user_id || !book_id)
		{
			res.status(400).json({msg: "book_id and user_id needed"});
			return;
		}
		const status_id = await getStatusId(req.params.status, res);
		if (status_id)
		{
			const books = await getUsersBooks(user_id, book_id);
			if (books.length == 0)
				await addBookStatus(book_id, user_id, status_id);
			else if (books[0].status != status_id)
				await updateBookStatus(book_id, user_id, status_id);
			res.status(201).json({"msg": `book added to ${status}`});
		}
	}
	catch(err) {
		console.log(err);
		res.status(500).send(err);
	}
}

const removeBookFromReadStatus = async (req, res) => {
	try {
		const user_id = req.session.user_id;
		const book_id = req.body.book_id;
		if (!user_id || !book_id)
		{
			res.status(400).json({msg: "book_id and user_id needed"});
			return;
		}
		const status_id = await getStatusId(req.params.status, res);
		if (status_id)
		{
			const books = await getUsersBooks(user_id, book_id);
			if (books.length != 0)
				await updateBookStatus(book_id, user_id, 0);
			res.status(201).json({"msg": `book removed from ${status} category`});
		}
	}
	catch(err) {
		console.log(err);
		res.status(500).send(err);
	}
}

exports.addBookToStatus = async (req, res) => {
	if (req.params.status == 'favorite')
		await addBookToFavorite(req, res);
	else
		await addBookToReadStatus(req, res);
}

exports.removeBookFromStatus = async (req, res) => {
	if (req.params.status == 'favorite')
		await removeBookFromFavorite(req, res);
	else
		await removeBookFromReadStatus(req, res);
}
