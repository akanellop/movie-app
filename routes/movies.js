const express = require("express");
const router = express.Router();
const movieService = require("../services/movies");

router.get("/", movieService.getAll);
router.get("/:username/posts", movieService.getSpecificUser);

router.get("/new", (req, res) => {
  console.log("dsadsad");
  res.render("movies/new");
});
router.post("/new", movieService.createNew);

module.exports = router;
