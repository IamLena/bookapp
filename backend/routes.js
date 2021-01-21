const express = require('express');
const router = express.Router();
const {checkToken} = require("./services/jwt");
const UserController = require('./controllers/users');
const BookController = require('./controllers/books');
const RatingController = require('./controllers/ratings');
const StatusController = require('./controllers/statuses');

router.get('/', (req, res) => {
	res.status(200).send('Hello World!');
});

router.post('/users', UserController.addUser);
router.patch('/users/:id', UserController.updatePassword);
router.post('/login', UserController.login);
router.post('/logout', checkToken, UserController.logout);

// post /users
// patch /users/a833229a-5b27-11eb-a89d-a0c58986b5c2
// post /login
// post /logout

router.get('/books', BookController.getAllBooks);
router.get('/books/:id', BookController.getBooksById);
router.post('/books', BookController.createBook);

// get /books
// get /books/?start=0&stop=25
// get /books/?sort=popular
// get /books/?themes=novel more themes
// get /books/?search=substr
// get /books/?favotire=true
// get /books/?status=haveread
// get /books/?mineonly=true
// get /books/?theme=novel&search=subsrt
// get /books/d290f1ee-6c54-4b01-90e6-d701748f0851
// post /books

router.post('/books/:id/rating', RatingController.addRating);
router.patch('/books/:id/rating', RatingController.changeRating);
router.delete('/books/:id/rating', RatingController.resetRating);

// post /books/d290f1ee-6c54-4b01-90e6-d701748f0851/rating
// patch /books/d290f1ee-6c54-4b01-90e6-d701748f0851/rating
// delete /books/d290f1ee-6c54-4b01-90e6-d701748f0851/rating

router.post('/books/:status', StatusController.addBookToStatus);
router.delete('/books/:status/:book_id', StatusController.removeBookFromStatus);

// post /books/haveread
// post /books/wanttoread
// post /books/favorite
// delete /books/haveread/d290f1ee-6c54-4b01-90e6-d701748f0851

module.exports = router;
