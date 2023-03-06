const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter size name."],
      trim: true,
      unique: [true, "This size is exists."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Size", sizeSchema);
