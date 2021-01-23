const express = require('express');
const router = express.Router();
const {checkToken, setUser} = require("../services/jwt");
const UserController = require('../controllers/users');

router.post('/login', UserController.login);
router.post('/logout', checkToken, UserController.logout);
// post /users
// patch /users/a833229a-5b27-11eb-a89d-a0c58986b5c2
// post /login
// post /logout

module.exports = router;
