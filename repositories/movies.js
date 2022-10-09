const Movie = require("../models/movie");

function findById(_id) {
  return Movie.findById(_id);
}
function findMovies(findQuery, sortingQuery) {
  return Movie.find(findQuery).sort(sortingQuery);
}

function saveNew(movie) {
  const movieModel = new Movie(movie);
  return movieModel.save();
}

function updateMovieRatingsCounters(movieId, countOfLikes, countOfHates) {
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

module.exports = { findById, findMovies, saveNew, updateMovieRatingsCounters };
