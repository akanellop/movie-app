const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    username: { type: String },
    countOfLikes: { type: Number, default: 0 },
    countOfHates: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
