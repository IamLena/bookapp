const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const express = require('express');
const session = require("express-session");
const app = express();
const expressSwagger = require('express-swagger-generator')(app);
const options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:5000',
        basePath: '/',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes.js'] //Path to the API handle folder
};

expressSwagger(options);
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
