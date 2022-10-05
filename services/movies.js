const Movie = require("../models/movie");

async function getAll(req, res) {
  try {
    const moviesArray = await Movie.find({}).populate({
      path: "username",
    });
    res.render("movies/index", { movies: moviesArray });
  } catch (error) {
    res.render("movies/index", {
      errorMessage: "Error in returning movies list",
    });
  }
}

async function getSpecificUser(req, res) {
  const usernameParam = req.params.username;
  try {
    const moviesArray = await Movie.find({
      username: usernameParam,
    });

    res.render("movies/userProfile", { movies: moviesArray });
  } catch (error) {
    res.render("movies/index", {
      errorMessage: "Error in returning movies list",
    });
  }
}

async function createNew(req, res) {
  try {
    const movie = new Movie({
      username: req.body.username,
      title: req.body.title,
      description: req.body.description,
    });
    await movie.save();
    res.redirect(`/`);
  } catch (error) {
    console.log(error);
    res.render("movies/new", {
      errorMessage: "Error creating new movie post",
    });
  }
}

module.exports = { getAll, getSpecificUser, createNew };
