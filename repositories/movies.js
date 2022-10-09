const Movie = require("../models/movie");
const { updateMovieRatings } = require("../services/ratings");

function findById(_id) {
  return Movie.findById(_id);
}
function findMovies(findQuery, sortingQuery) {
  return Movie.find(findQuery).sort(sortingQuery);
}

function saveNew(movie) {
  return Movie.save(movie);
}

function updateMovieRatingsCounters() {
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
