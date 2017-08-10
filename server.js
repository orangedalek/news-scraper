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


//*********************************ROUTE TIME!!!!************************************************************

//make the root redirect to the scrape route so users don't have to click a button to load news
app.get("/", function(req, res){
	res.redirect("/scrape");
});

// Scrape Clickhole
app.get("/scrape", function(req, res) {

	request("http://www.clickhole.com/", function(error, response, html){
		var $ = cheerio.load(html);
		$("article").each(function(i, element){
			var result = {};
			result.title = $(this).children("a").text();
      		result.link = $(this).children("a").attr("href");
      		var entry = new Article(result);
      		entry.save(function(err, doc){
      			if(err){
      				console.log(error);
      			}else{
      				console.log(doc);
      			}
      		});

		});
	});
		res.send("Scrape Complete");
});

//get scraped articles
app.get("/articles", function(req, res) {
  Article.find({}, function(error, doc) {
    if (error) {
      console.log(error);
    }else {
      res.json(doc);
    }
  });
});

//grab an acticle by id so we can do stuff to it
app.get("/articles/:id", function(req, res) {
  Article.findOne({ "_id": req.params.id })
  .populate("note")
  .exec(function(error, doc) {
    if (error) {
      console.log(error);
    }else {
    	res.json(doc);
    }
  });
});

//make or edit notes
app.post("/articles/:id", function(req, res) {
  var newNote = new Note(req.body);
  newNote.save(function(error, doc) {
    if (error) {
      console.log(error);
    }else {
      Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        }else {
          res.send(doc);
        }
      });
    }
  });
});



//listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});














