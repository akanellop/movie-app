const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies");
const { authenticateUser } = require("../auth/protect");

router.get("/", moviesController.getAll);
router.get("/:username/posts", moviesController.getSpecificUser);
router.get("/new", authenticateUser, moviesController.getPostNewMovieView);

router.post("/new", moviesController.createNew);
router.put("/:id/rate", moviesController.rateMovie);

module.exports = router;
