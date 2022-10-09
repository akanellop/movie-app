const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { redirectPage, renderView } = require("../handlers/respondHandler");

function getLoginView(req, res) {
  renderView(req, res, "users/login");
}
function getSignupView(req, res) {
  renderView(req, res, "users/new");
}

async function signup(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(user.password, salt);

    user.password = passwordHashed;
    await user.save();
    redirectPage(req, res, `/login`);
  } catch (err) {
    res.render("users/signup", {
      user,
      errorMessage: "Error creating the user",
    });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error("missing fields");
    }

    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "./login",
      failureFlash: true,
    })(req, res);
  } catch (err) {
    console.log(err);
    res.render("users/login", {
      errorMessage: "Error in login",
    });
  }
}

function logout(req, res) {
  req.logOut((err) => {
    if (err) next(err);
    redirectPage(req, res, "/login");
  });
}

module.exports = {
  signup,
  login,
  logout,
  getLoginView,
  getSignupView,
};
