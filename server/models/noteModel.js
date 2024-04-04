const mongoose = require("mongoose");

const schema = mongoose.Schema;

const notesModel = new schema({
  user: {
    type: schema.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null
  },
});

module.exports = mongoose.model("Notes", notesModel);
