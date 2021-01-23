const express = require('express');
const router = express.Router();
const {checkToken, setUser} = require("../services/jwt");
const UserController = require('../controllers/users');


/**
 * @swagger
 * /api/v1/sessions/login:
 *  post:
 *    tags:
 *    - unauthorized users
 *    description: "logins the user"
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *    - in: body
 *      name: User
 *      description: "email and password of the user"
 *      schema:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *            example: vasya23@gmail.com
 *          password:
 *            type: string
 *            format: password
 *    responses:
 *      200:
 *        description: "user is authorized"
 *        schema:
 *          type: object
 *          properties:
 *            jwt:
 *              type: string
 *      400:
 *        description: "invalid data or taken email"
 *      500:
 *        description: "server error"
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /api/v1/sessions/logout:
 *  post:
 *    tags:
 *    - authorized users
 *    description: "logouts the user"
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *    - in: header
 *      name: authorization
 *      type: string
 *    responses:
 *      201:
 *        description: "user is loged out"
 *      401:
 *        description: "not authorized"
 *      500:
 *        description: "server error"
 */
router.post('/logout', checkToken, UserController.logout);

module.exports = router;
