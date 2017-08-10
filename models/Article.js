// I'm a model, you know what I mean? and I do my little turn on the catwalk
// require mongoose
var mongoose = require("mongoose");
// make Schema class
var Schema = mongoose.Schema;
// make the Schema
var ArticleSchema = new Schema({

	title: {
    type: String,
    required: true
  },
    link: {
    type: String,
    required: true
  },
    note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// make a variable for the schema
var Article = mongoose.model("Article", ArticleSchema);
// export Article
module.exports = Article;