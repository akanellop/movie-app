const Rating = require("../models/rating");
const Movie = require("../models/movie");

function addRating(movieId, user, rate) {
  return Rating.updateOne(
    { user, movie: movieId },
    { $set: { rate } },
    { upsert: true }
  );
}

async function updateMovieRatings(movieId) {
  const [countOfLikes, countOfHates] = await Promise.all([
    Rating.count({ movie: movieId, rate: "like" }),
    Rating.count({ movie: movieId, rate: "hate" }),
  ]);

  return Movie.updateOne(
    { _id: movieId },
    {
      $set: {
        countOfLikes,
        countOfHates,
      },
    }
  );
}

function removeRating(_id) {
  return Rating.updateOne({ _id }, { $unset: { rate: 1 } });
}

module.exports = { addRating, updateMovieRatings, removeRating };
