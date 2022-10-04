const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/login", (req, res) => {
  res.render("users/login", { user: new User() });
});

router.get("/new", (req, res) => {
  res.render("users/new", { user: new User() });
});

router.post("/new", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  try {
    const newUser = await user.save();
    res.redirect(`/`);
  } catch (err) {
    res.render("users/new", { user, errorMessage: "Error creating the user" });
  }
});

router.get("/:id", (req, res) => {
  res.render("users/user");
});

module.exports = router;
