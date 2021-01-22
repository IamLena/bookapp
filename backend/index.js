const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const express = require('express');
const session = require("express-session");
const app = express();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:80"]
    }
  },
  // ['.routes/*.js']
  apis: ["./routes.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
