const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter banner name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter banner description."],
    },
    images: [
      {
        id: { type: String },
        url: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Banner", bannerSchema);
