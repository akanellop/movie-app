const Movie = require("../models/movie");
const { errorHandler } = require("../handlers/errorHandler");

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
    res.render("movies/index", { movies: moviesChanged, user: req.user });
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
    res.render("movies/userProfile", { movies: moviesArray });
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
    res.redirect(`/`);
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

module.exports = { getAll, getSpecificUser, createNew };
