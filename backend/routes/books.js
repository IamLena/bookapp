const express = require('express');
const router = express.Router();
const {checkToken, setUser} = require("../services/jwt");
const BookController = require('../controllers/books');
const RatingController = require('../controllers/ratings');
const StatusController = require('../controllers/statuses');

router.get('/', setUser, BookController.getAllBooks);
router.get('/:id', setUser, BookController.getBooksById);
router.post('/', checkToken, BookController.createBook);

// get /books
// get /books/?start=0&stop=25
// get /books/?sort=popular
// get /books/?themes=novel more themes
// get /books/?search=substr
// get /books/?favotire=true -> should be 403?
// get /books/?status=haveread
// get /books/?mineonly=true
// get /books/?theme=novel&search=subsrt
// get /books/d290f1ee-6c54-4b01-90e6-d701748f0851
// post /books

router.post('/:id/rating', setUser, RatingController.addRating);
router.patch('/:id/rating', setUser, RatingController.changeRating);
router.delete('/:id/rating', setUser, RatingController.resetRating);

// post /books/d290f1ee-6c54-4b01-90e6-d701748f0851/rating
// patch /books/d290f1ee-6c54-4b01-90e6-d701748f0851/rating
// delete /books/d290f1ee-6c54-4b01-90e6-d701748f0851/rating

router.post('/:status', setUser, StatusController.addBookToStatus);
router.delete('/:status/:book_id', setUser, StatusController.removeBookFromStatus);

// post /books/haveread
// post /books/wanttoread
// post /books/favorite
// delete /books/haveread/d290f1ee-6c54-4b01-90e6-d701748f0851
module.exports = router;
