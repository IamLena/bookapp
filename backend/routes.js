const express = require('express');
const router = express.Router();
const {checkToken} = require("./services/jwt");
const UserController = require('./controllers/users');
// const BookController = require('./controllers/books');

router.get('/', (req, res) => {
	res.status(200).send('Hello World!');
});

router.post('/users', UserController.post);
router.post('/login', UserController.login);
router.post('/logout', checkToken, UserController.logout);

module.exports = router;
