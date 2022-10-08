const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies");
const { protectRoute } = require("../auth/protect");

router.get("/", moviesController.getAll);
router.get("/:username/posts", moviesController.getSpecificUser);

router.get("/new", protectRoute, (req, res) => {
  res.render("movies/new");
});
router.post("/new", moviesController.createNew);

module.exports = router;
