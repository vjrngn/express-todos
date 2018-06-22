const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  // _id: mongoose.SchemaTypes.ObjectId, -> this is done automatically
  title: String,
  completed: Boolean,
});

module.exports = mongoose.model('Todo', todoSchema)
