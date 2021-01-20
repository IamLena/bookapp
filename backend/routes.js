const express = require('express');
const router = express.Router();
const {checkToken} = require("./services/jwt");
const UserController = require('./controllers/users');
const BookController = require('./controllers/books');

router.get('/', (req, res) => {
	res.status(200).send('Hello World!');
});

router.post('/users', UserController.post);
//router.patch('/users/:id', UserController.updatepassword);
router.post('/login', UserController.login);
router.post('/logout', checkToken, UserController.logout);

router.get('/books', BookController.getAllBooks);
// books/
// books/?start=0:stop=25 //limits
// books/?sort=popular
// books/?themes=novel more themes
// books/?search=substr
// books/?favotire=true
// books/?status=haveread
// books/?mineonly=true (filter by user_id)
// books/?theme=novel:search=subsrt

router.get('/books/:id', BookController.getBooksById);
// books/d290f1ee-6c54-4b01-90e6-d701748f0851
// if user authorized add status, favorites
// add rating, myrating to return object

router.post('/books', BookController.createBook); // for admins only
// /books

router.post('/books/:id/rating', BookController.addRating);
router.patch('/books/:id/rating', BookController.changeRating);
router.delete('/books/:id/rating', BookController.resetRating);

router.post('/books/:status', BookController.addBookToStatus);
// books/haveread
// books/wanttoread
router.delete('/books/:status/:book_id', BookController.removeBookFromStatus);
// books/haveread/d290f1ee-6c54-4b01-90e6-d701748f0851

// router.post('books/favorite', BookController.addBookToFavorite); // book_id via body
// router.delete('books/favorite/:book_id', BookController.removeBookFromFavorite);

module.exports = router;
