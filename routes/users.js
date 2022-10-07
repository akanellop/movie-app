const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/login", (req, res) => res.render("users/login"));
router.get("/new", (req, res) => res.render("users/register"));

router.post("/", usersController.register);
router.put("/", usersController.login);

// router.get("/:id", (req, res) => {
//   res.render("users/user");
// });

module.exports = router;
