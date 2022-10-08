const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/login", (req, res) => res.render("users/login"));
router.get("/new", (req, res) => res.render("users/register"));

router.post("/new", usersController.register);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);

// router.get("/:id", (req, res) => {
//   res.render("users/user");
// });

module.exports = router;
