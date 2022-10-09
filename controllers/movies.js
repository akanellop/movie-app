const { errorHandler } = require("../handlers/errorHandler");
const {
  redirectPage,
  renderView,
  statusRespond,
} = require("../handlers/respondHandler");
const { formatDateOfCreation } = require("../utils/moviesUtils");
const moviesService = require("../services/movies");
const moviesRepository = require("../repositories/movies");
const { parseRate } = require("../utils/ratingsUtils");
const ratingsService = require("../services/ratings");
const ratingsRepository = require("../repositories/ratings");

// Get generic list of all posted movies
async function getAll(req, res) {
  try {
    const sortingValue = req.query.sorting ?? "date";
    const movies = await moviesService.getMoviesList(sortingValue);
    if (!movies.length) {
      return errorHandler(req, res, "movies/index", "No movies found!");
    }

    const moviesForRendering = movies.map((movie) => {
      movie.createdDate = formatDateOfCreation(movie.createdAt);
      return movie;
    });

    renderView(req, res, "movies/index", { movies: moviesForRendering });
  } catch (error) {
    console.log(`Error occured on`);
    console.log(error);
    return errorHandler(
      req,
      res,
      "movies/index",
      "Sorry :( Error in returning movies list",
      {
        movies: [],
      }
    );
  }
}

// Get movies posted by a specific user
async function getSpecificUser(req, res) {
  try {
    const username = req.params.username;
    const sortingValue = req.query.sorting ?? "date";

    const movies = await moviesService.getMoviesList(sortingValue, username);

    if (!movies.length) {
      return errorHandler(
        req,
        res,
        "No movies found for this user!",
        "movies/index"
      );
    }
    const moviesForRendering = movies.map((movie) => {
      movie.createdDate = formatDateOfCreation(movie.createdAt);
      return movie;
    });

    renderView(req, res, "movies/userProfile", { movies: moviesForRendering });
  } catch (error) {
    console.log(`Error occured on`);
    console.log(error);
    return errorHandler(
      req,
      res,
      "movies/index",
      "Sorry :( Error in returning movies list.",
      {
        movies: [],
      }
    );
  }
}

// Post new movie
async function createNew(req, res) {
  try {
    const newMovie = {
      username: req.user.username,
      title: req.body.title,
      description: req.body.description,
    };
    if (!newMovie.title) {
      return errorHandler(req, res, "movies/new", "Please provide title!");
    }
    await moviesRepository.saveNew(newMovie);
    redirectPage(req, res, "/");
  } catch (error) {
    console.log(`Error occured on`);
    console.log(error);
    return errorHandler(
      req,
      res,
      "movies/new",
      "Sorry :( Error creating new movie post",
      {
        movies: [],
      }
    );
  }
}

// Render post new movie form
function getPostNewMovieView(req, res) {
  renderView(req, res, "movies/new");
}

// Handled Fetch API call
// Handles new rate of user.
// A user can like or hate a movie, he/she can retract a previous rate and he/she cannot rate his/her own posts
async function rateMovie(req, res) {
  try {
    const movieId = req.params.id;
    const user = req.user?.username;
    const rate = parseRate(req.body);
    if (!user) {
      console.log("Please login to rate a movie!");
      return statusRespond(req, res, 400, {
        error: "Please login to rate a movie!",
      });
    }

    const movie = await moviesRepository.findById(movieId);
    if (movie && movie.username === user) {
      console.log("You cannot rate your post!");
      return statusRespond(req, res, 400, {
        error: "You cannot rate your post!",
      });
    }

    const existingRating = await ratingsRepository.userRatingForMovie(
      movieId,
      user
    );
    if (existingRating && existingRating.rate === rate) {
      await ratingsService.retractRating(existingRating._id);
    } else {
      await ratingsService.addRatingOfUserForMovie(movieId, user, rate);
    }

    await ratingsService.updateMovieRatings(movieId);
    return statusRespond(req, res, 200, {});
  } catch (error) {
    console.log(`Error occured on`);
    console.log(error);
    return statusRespond(req, res, 500, {
      error: "Sorry :( Error in rating movie",
    });
  }
}

module.exports = {
  getAll,
  getSpecificUser,
  createNew,
  getPostNewMovieView,
  rateMovie,
};
