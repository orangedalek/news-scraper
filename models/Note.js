// Right Said Fred is totally stuck in your head now
// require mongoose
var mongoose = require("mongoose");
// make Schema class
var Schema = mongoose.Schema;
// make the Schema
var NoteSchema = new Schema({
	title: {
    type: String
  },
    body: {
    type: String
  }

});

// make a variable to hold the note Schema
var Note = mongoose.model("Note", NoteSchema);
// export Note
module.exports = Note;
