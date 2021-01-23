const express = require('express');
const router = express.Router();
const {checkToken, setUser} = require("../services/jwt");
const BookController = require('../controllers/books');
const RatingController = require('../controllers/ratings');
const StatusController = require('../controllers/statuses');

/**
 * @swagger
 * /api/v1/books:
 *  get:
 *    tags:
 *    - unauthorized users
 *    - authorized users
 *    description: "get all books"
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *    - in: query
 *      name: start
 *      type: integer
 *      description: "left book index from return list"
 *      example: 0
 *    - in: query
 *      name: stop
 *      type: integer
 *      description: "right book index from return list"
 *      example: 2
 *    - in: query
 *      name: search
 *      type: string
 *      description: "substring to be included in title or author search in books"
 *      example: Harper
 *    - in: query
 *      name: sortby
 *      type: string
 *      description: "bypopularity first or alphabetically"
 *      example: bypopularity
 *    - in: query
 *      name: themes
 *      type: string
 *      description: "theme titles comma separated"
 *      example: novel
 *    - in: query
 *      name: favorite
 *      type: string
 *      description: "in favorites or not"
 *      example: true
 *    - in: query
 *      name: status
 *      type: integer
 *      description: "status for book: 1 - haveread, 2 - wanttoread"
 *      example: 1
 *    - in: query
 *      name: mineonly
 *      type: string
 *      description: "books for authorized user"
 *      example: true
 *    - in: header
 *      name: authorization
 *      type: string
 *    responses:
 *      200:
 *        description: "returns a list of books "
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                format: uuid
 *                example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *              title:
 *                type: string
 *                example: Eugene Onegin
 *              author:
 *                type: string
 *                example: Alexander Pushkin
 *              theme:
 *                type: string
 *                example: novel
 *              rating:
 *                type: number
 *                format: float
 *                example: 4.7
 *              annotation:
 *                type: string
 *              user_id:
 *                type: string
 *              user_rating:
 *                type: integer
 *              favorite:
 *                type: integer
 *              status_id:
 *                type: integer
 *      500:
 *        description: "internal error"
 */
router.get('/', setUser, BookController.getAllBooks);

/**
 * @swagger
 * /api/v1/books/{id}:
 *  get:
 *    tags:
 *    - unauthorized users
 *    - authorized users
 *    description: "get specific books"
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *    - in: path
 *      name: id
 *      description: "id of book"
 *      type: string
 *      format: uuid
 *    responses:
 *      200:
 *        description: "returns a book"
 *        schema:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *              format: uuid
 *              example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *            title:
 *              type: string
 *              example: Eugene Onegin
 *            author:
 *              type: string
 *              example: Alexander Pushkin
 *            theme:
 *              type: string
 *              example: novel
 *            rating:
 *              type: number
 *              format: float
 *              example: 4.7
 *            annotation:
 *              type: string
 *            user_id:
 *              type: string
 *            user_rating:
 *              type: integer
 *            favorite:
 *              type:
 *            status_id:
 *              type: integer
 *      500:
 *        description: "internal error"
 *      404:
 *        description: "book not found"
 */
router.get('/:id', setUser, BookController.getBooksById);

/**
 * @swagger
 * /api/v1/books:
 *  post:
 *    tags:
 *    - admins
 *    description: "add new book"
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *    - in: header
 *      name: authorization
 *      type: string
 *    - in: body
 *      name: Book
 *      description: "new book info"
 *      schema:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *            example: Eugene Onegin
 *          author:
 *            type: string
 *            example: Alexander Pushkin
 *          theme:
 *            type: string
 *            example: novel
 *          annotation:
 *            type: string
 *    responses:
 *      201:
 *        description: "new book was created"
 *      400:
 *        description: "not all data provided"
 *      401:
 *        description: "not authorized"
 *      403:
 *        description: "not an admin"
 *      500:
 *        description: "internal error"
 *
 */
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

/**
 * @swagger
 * /api/v1/books/{id}/rating:
 *  post:
 *    tags:
 *    - authorized users
 *    description: "set rating to the book"
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *    - in: header
 *      name: authorization
 *      type: string
 *    - in: path
 *      name: id
 *      type: string
 *      format: uuid
 *      required: true
 *    - in: body
 *      name: rating
 *      type: object
 *      properties:
 *        rating:
 *          type: integer
 *    responses:
 *      201:
 *        description: "rating was set"
 *      401:
 *        description: "unathorized user"
 *      400:
 *        description: "invalid infromation"
 *      500:
 *        description: "internal error"
 */
router.post('/:id/rating', checkToken, RatingController.addRating);
/**
 * @swagger
 * /api/v1/books/{id}/rating:
 *  patch:
 *    tags:
 *    - authorized users
 *    description: "change rating to the book"
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *    - in: header
 *      name: authorization
 *      type: string
 *    - in: path
 *      name: id
 *      type: string
 *      format: uuid
 *      required: true
 *    - in: body
 *      name: rating
 *      type: object
 *      properties:
 *        rating:
 *          type: integer
 *    responses:
 *      201:
 *        description: "rating was changed"
 *      401:
 *        description: "unathorized user"
 *      400:
 *        description: "invalid infromation"
 *      500:
 *        description: "internal error"
 */
router.patch('/:id/rating', checkToken, RatingController.changeRating);

/**
 * @swagger
 * /api/v1/books/{id}/rating:
 *  delete:
 *    tags:
 *    - authorized users
 *    description: "reset rating of the book"
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *    - in: header
 *      name: authorization
 *      type: string
 *    - in: path
 *      name: id
 *      type: string
 *      format: uuid
 *      required: true
 *    responses:
 *      201:
 *        description: "rating was reset"
 *      401:
 *        description: "unathorized user"
 *      400:
 *        description: "invalid infromation"
 *      500:
 *        description: "internal error"
 */
router.delete('/:id/rating', checkToken, RatingController.resetRating);

// post /books/d290f1ee-6c54-4b01-90e6-d701748f0851/rating
// patch /books/d290f1ee-6c54-4b01-90e6-d701748f0851/rating
// delete /books/d290f1ee-6c54-4b01-90e6-d701748f0851/rating

/**
 * @swagger
 * /api/v1/books/{status}:
 *  post:
 *    tags:
 *    - authorized users
 *    description: "get books of certain status: habveread, wanttoread, favorite"
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *    - in: header
 *      name: authorization
 *      type: string
 *    - in: path
 *      name: status
 *      type: string
 *      required: true
 *    - in: body
 *      name: book_id
 *      type: object
 *      properties:
 *        book_id:
 *          type: string
 *          fromat: uuid
 *    responses:
 *      201:
 *        description: "book was added to status"
 *      401:
 *        description: "unathorized user"
 *      400:
 *        description: "book_id needed"
 *      500:
 *        description: "internal error"
 */
router.post('/:status', checkToken, StatusController.addBookToStatus);

/**
 * @swagger
 * /api/v1/books/{status}/{id}:
 *  delete:
 *    tags:
 *    - authorized users
 *    description: "removes book from status: habveread, wanttoread, favorite"
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *    - in: header
 *      name: authorization
 *      type: string
 *    - in: path
 *      name: status
 *      type: string
 *      required: true
 *    - in: path
 *      name: book_id
 *      type: string
 *      format: uuid
 *      required: true
 *    responses:
 *      201:
 *        description: "book was added to status"
 *      401:
 *        description: "unathorized user"
 *      500:
 *        description: "internal error"
 */
router.delete('/:status/:book_id', checkToken, StatusController.removeBookFromStatus);

// post /books/haveread
// post /books/wanttoread
// post /books/favorite
// delete /books/haveread/d290f1ee-6c54-4b01-90e6-d701748f0851
module.exports = router;
