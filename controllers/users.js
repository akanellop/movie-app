const User = require("../models/user");

// function loginView(req, res) {
//   res.render("users/login", { user: new User() });
// }

// function signupView(req, res) {
//   res.render("users/new", { user: new User() });
// }

async function register(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  try {
    await user.save();
    res.redirect(`/`);
  } catch (err) {
    res.render("users/new", { user, errorMessage: "Error creating the user" });
  }
}

async function login(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  try {
    await user.save();
    res.redirect(`/`);
  } catch (err) {
    res.render("users/new", { user, errorMessage: "Error creating the user" });
  }
}

module.exports = {
  register,
  login,
};
