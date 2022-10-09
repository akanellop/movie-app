const moviesRepository = require("../repositories/movies");
const ratingsRepository = require("../repositories/ratings");

function addRatingOfUserForMovie(movieId, user, rate) {
  return ratingsRepository.addRating(movieId, user, rate);
}

async function updateMovieRatings(movieId) {
  const [countOfLikes, countOfHates] = await Promise.all([
    ratingsRepository.getCountsOfMovieLikes(movieId),
    ratingsRepository.getCountsOfMovieHates(movieId),
  ]);

  return moviesRepository.updateMovieRatingsCounters(
    movieId,
    countOfLikes,
    countOfHates
  );
}

function retractRating(_id) {
  return ratingsRepository.retractRating();
}

module.exports = { addRatingOfUserForMovie, updateMovieRatings, retractRating };
