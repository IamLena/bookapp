const express = require('express');
const router = express.Router();
const {checkToken} = require("./services/jwt");
const UserController = require('./controllers/users');
const BookController = require('./controllers/books');

router.get('/', (req, res) => {
	res.status(200).send('Hello World!');
});

router.post('/users', UserController.post);
router.post('/login', UserController.login);
router.post('/logout', checkToken, UserController.logout);

router.post('/books', BookController.createBook);
router.get('/books', BookController.getAllBooks);
router.get('/books/:id', BookController.getBooksById);
// router.patch('/books/:id');
router.post('/books/:status', BookController.addBookToStatus);
router.delete('/books/:status/:book_id', BookController.removeBookFromStatus);

//some problems here
router.post('/books/:id/rating', BookController.addRating);
router.patch('/books/:id/rating', BookController.changeRating);
router.delete('/books/:id/rating', BookController.resetRating);


module.exports = router;
