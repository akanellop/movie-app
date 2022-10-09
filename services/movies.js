const { getSortingForListing } = require("../utils/moviesUtils");
const moviesRepository = require("../repositories/movies");

async function getMoviesList(sortingValue, username) {
  const findQuery = username ? { username } : {};
  const sortingQuery = getSortingForListing(sortingValue);
  if (!sortingQuery) {
    throw new Error("No sorting value was given");
  }
  return moviesRepository.findMovies(findQuery, sortingQuery);
}

module.exports = { getMoviesList };
