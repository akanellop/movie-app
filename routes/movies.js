const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies");

router.get("/", moviesController.getAll);
router.get("/:username/posts", moviesController.getSpecificUser);

router.get("/new", (req, res) => {
  res.render("movies/new");
});
router.post("/new", moviesController.createNew);

module.exports = router;
