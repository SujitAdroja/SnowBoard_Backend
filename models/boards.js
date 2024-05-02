const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 character"],
  },
  color: { type: String, required: [true] },
  createdAt: {
    required: [true, "must provide a Date and Time "],
    type: String,
    trim: true,
  },
});
module.exports = mongoose.model("Board", BoardSchema);
