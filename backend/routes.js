const express = require('express');
const router = express.Router();
const UserController = require('./controllers/users');
// const BookController = require('./controllers/books');

router.get('/', (req, res) => {
	res.status(200).send('Hello World!');
});

router.post('/users', UserController.post);

module.exports = router;
