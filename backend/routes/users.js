const express = require('express');
const router = express.Router();
const {checkToken, setUser} = require("../services/jwt");
const UserController = require('../controllers/users');

/**
 * @swagger
 * /api/v1/users:
 *  post:
 *    tags:
 *    - unauthorized users
 *    description: "registers the new user"
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *    - in: body
 *      name: User
 *      description: "user info to register"
 *      schema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            example: Vasya Pupkin
 *          email:
 *            type: string
 *            format: email
 *            example: vasya23@gmail.com
 *          password:
 *            type: string
 *            format: password
 *          confirmedpassword:
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
 *        description: "invalid data"
 *      500:
 *        description: "server error"
 */
router.post('/', UserController.addUser);
router.patch('/:id', UserController.updatePassword);

module.exports = router;
