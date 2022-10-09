const Rating = require("../models/rating");

function userRatingForMovie(movieId, username) {
  return Rating.findOne({
    movie: movieId,
    username,
  });
}

function addRating(movie, user, rate) {
  return Rating.updateOne(
    { user, movie },
    { $set: { rate } },
    { upsert: true }
  );
}

function getCountsOfMovieLikes(movie) {
  return Rating.count({ movie, rate: "like" });
}

function getCountsOfMovieHates(movie) {
  return Rating.count({ movie, rate: "hate" });
}

function retractRating(_id) {
  return Rating.updateOne({ _id }, { $unset: { rate: 1 } });
}

module.exports = {
  userRatingForMovie,
  addRating,
  getCountsOfMovieLikes,
  getCountsOfMovieHates,
  retractRating,
};
