const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter offer name."],
    },
    description: {
      type: String,
      reuired: [true, "Plaese enter offer description."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
