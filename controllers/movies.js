const Movie = require("../models/movie");
const { errorHandler } = require("../handlers/errorHandler");
const {
  redirectPage,
  renderView,
  statusRespond,
} = require("../handlers/respondHandler");
const { getSortingForListing } = require("../utils/moviesUtils");
const ratingsServices = require("../services/ratings");
const rating = require("../models/rating");

async function getAll(req, res) {
  try {
    const sortingValue = req.query.sorting ?? "date";

    const moviesArray = await Movie.find({}).sort(
      getSortingForListing(sortingValue)
    );

    if (!moviesArray.length) {
      return errorHandler(req, res, "movies/index", "No movies found!");
    }
    const moviesChanged = moviesArray.map((movie) => {
      //TODO FIX display somehting else with other way
      if (movie.createdAt)
        movie.createdDate = `${movie.createdAt.getDate()}/${movie.createdAt.getMonth()}/${movie.createdAt.getYear()}`;
      return movie;
    });
    renderView(req, res, "movies/index", { movies: moviesChanged });
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

async function getSpecificUser(req, res) {
  const usernameParam = req.params.username;
  try {
    const sortingValue = req.query.sorting ?? "date";

    const moviesArray = await Movie.find({ username: usernameParam }).sort(
      getSortingForListing(sortingValue)
    );

    if (!moviesArray.length) {
      return errorHandler(
        req,
        res,
        "No movies found for this user!",
        "movies/index"
      );
    }

    renderView(req, res, "movies/userProfile", { movies: moviesArray });
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

async function createNew(req, res) {
  try {
    const movie = new Movie({
      username: req.user.username,
      title: req.body.title,
      description: req.body.description,
    });
    if (!movie.title) {
      return errorHandler(req, res, "movies/new", "Please provide title!");
    }
    await movie.save();
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

function getPostNewMovieView(req, res) {
  renderView(req, res, "movies/new");
}

async function rateMovie(req, res) {
  try {
    const movieId = req.params.id;
    const user = req.user?.username;
    const rateParsed = JSON.stringify(Object.keys(req.body)[0]);
    const rate = rateParsed.slice(1, rateParsed.length - 1);

    if (!user) {
      console.log("Please login to rate a movie!");
      return statusRespond(req, res, 400, {
        error: "Please login to rate a movie!",
      });
    }

    const movie = await Movie.findOne({ _id: movieId, username: user });
    if (movie) {
      console.log("You cannot rate your post!");
      return statusRespond(req, res, 400, {
        error: "You cannot rate your post!",
      });
    }

    const existingRating = await rating.findOne({ movieId, username: user });
    if (existingRating && existingRating.rate === rate) {
      await ratingsServices.removeRating(existingRating._id);
    } else {
      await ratingsServices.addRating(movieId, user, rate);
    }
    await ratingsServices.updateMovieRatings(movieId);
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
