const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const express = require('express');
const session = require("express-session");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(bodyParser.json())
dotenv.config({path: './.env'});

app.use(session({
	userid: undefined,
	name: process.env.SESS_NAME,
	resave : false,
	secret : process.env.SESS_SECRET,
	saveUninitialized: false,
}));

app.use('/', require('./routes'));

const port = process.env.APP_PORT || 5000;
app.listen(port,  () => {
	console.log(`backend is listening on port ${port}`);
});
