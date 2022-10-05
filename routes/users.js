const express = require("express");
const router = express.Router();
const userServices = require("../services/users");

router.get("/login", (req, res) => res.render("users/login"));
router.get("/new", (req, res) => res.render("users/new"));

router.post("/new", userServices.signup);

// router.get("/:id", (req, res) => {
//   res.render("users/user");
// });

module.exports = router;
