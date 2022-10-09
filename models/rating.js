const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema(
  {
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    user: { type: String },
    rate: { type: String, enum: ["like", "hate", null] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rating", ratingSchema);
