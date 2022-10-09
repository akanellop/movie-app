const Movie = require("../models/movie");
const { errorHandler } = require("../handlers/errorHandler");
const { redirectPage, renderView } = require("../handlers/respondHandler");

async function getAll(req, res) {
  try {
    const moviesArray = await Movie.find({}).populate({
      path: "username",
    });
    if (!moviesArray.length) {
      errorHandler(req, res, "No movies found!", "movies/index");
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
    errorHandler(
      req,
      res,
      "Sorry :( Error in returning movies list",
      "movies/index",
      {
        movies: [],
      }
    );
  }
}

async function getSpecificUser(req, res) {
  const usernameParam = req.params.username;
  try {
    const moviesArray = await Movie.find({
      username: usernameParam,
    });
    if (!moviesArray.length) {
      errorHandler(req, res, "No movies found for this user!", "movies/index");
    }

    renderView(req, res, "movies/userProfile", { movies: moviesArray });
  } catch (error) {
    console.log(`Error occured on`);
    console.log(error);
    errorHandler(
      req,
      res,
      "Sorry :( Error in returning movies list.",
      "movies/index",
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
      errorHandler(req, res, "Please provide title!", "movies/new");
    }
    await movie.save();
    redirectPage(req, res, "/");
  } catch (error) {
    console.log(`Error occured on`);
    console.log(error);
    errorHandler(
      req,
      res,
      "Sorry :( Error creating new movie post",
      "movies/new",
      {
        movies: [],
      }
    );
  }
}

function getPostNewMovieView(req, res) {
  renderView(req, res, "movies/new");
}

module.exports = { getAll, getSpecificUser, createNew, getPostNewMovieView };
