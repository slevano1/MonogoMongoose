// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Require all models
var Note = require('./models/Note.js');
var Article = require('./models/Article.js')

var request = require('request');
var cheerio = require('cheerio');
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nytimes";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

var routes = require("./controllers/controller.js");
app.use("/", routes);
mongoose.connect("");
//mongoose.connect('mongodb://localhost/model-news-scraper');
var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

app.listen(PORT, function() {
    console.log("App running on PORT " + PORT);
});