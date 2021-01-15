const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(bodyParser.json())
dotenv.config({path: './.env'});

app.use('/', require('./routes'));

app.listen(process.env.APP_PORT,  () => {
	console.log(`backend is listening on port ${process.env.DATABASE_HOST}`);
});
