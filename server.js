// Require packages
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// require models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
// require scraping equipment
var request = require("request");
var cheerio = require("cheerio");
// set Mongoose up for promises
mongoose.Promise = Promise;
// initialize express
var app = express();
// set up morgan & bodyParserapp.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
// make the public directory static
app.use(express.static("public"));
// configure database
mongoose.connect("mongodb://localhost/scraping-mongoose");
var db = mongoose.connection;
// alert if there are any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
// let us know if the mongoose connection is working
db.once("open", function() {
  console.log("Mongoose connection successful.");
});