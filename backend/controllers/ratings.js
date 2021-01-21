const {createRating, updateRating} = require('../services/ratings');
const {getUsersBooks} = require('../services/statuses');

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
	{
		await updateRating(book_id, user_id, rating);
		res.status(201).json({"msg": `rating changed`});
	}
	else
		res.status(400).json({"msg": `no record in base`});
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
		await updateRating(book_id, user_id, 0);
	res.status(201).json({"msg": `rating reseted`});
}
