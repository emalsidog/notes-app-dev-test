// Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    required: true
  },
  list: { type: Schema.Types.ObjectId, ref: "List" }
})

module.exports = mongoose.model("Note", NoteSchema);