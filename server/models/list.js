// Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  notes: [{ type: Schema.Types.ObjectId, ref: "Note" }]
})

module.exports = mongoose.model("List", ListSchema);