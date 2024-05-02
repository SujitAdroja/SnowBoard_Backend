const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema({
  boardID: { type: String, require: [true] },
  createdAt: {
    required: [true, "must provide a Date and Time "],
    type: String,
    trim: true,
  },
  tabs: {
    type: Object,
    default: {
      notStarted: [],
      inProgress: [],
      blocked: [],
      done: [],
    },
  },
});
module.exports = mongoose.model("Tasks", TasksSchema);
