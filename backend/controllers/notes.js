const {generateUuid} =  require('../services/database');
const {getUserByEmail, createUser} = require('../services/users');
const {getThemes, getThemeById, getThemeByName, getThemeByNameLike, createTheme, } = require('../services/themes');
const {getAuthors, getAuthorById, getAuthorByName, getAuthorByNameLike, createAuthor} = require('../services/authors');
const {getBooks, getBooksById, getBooksByTitle, getBooksByAuthor, getBooksByTheme, createBook} = require('../services/books');
const {getStatusByName, getBooksOfStatus, addBookStatus, updateBookStatus, getFavoriteBooks, addFavoriteBook, updateFavoriteBook} = require('../services/statuses');
const {getBookRating, createRating, updateRating, deleteRating} = require('../services/ratings');
