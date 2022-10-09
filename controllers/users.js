const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { errorHandler } = require("../handlers/errorHandler");
const {
  redirectPage,
  renderView,
  statusRespond,
} = require("../handlers/respondHandler");

function getLoginView(req, res) {
  renderView(req, res, "users/login");
}
function getSignupView(req, res) {
  renderView(req, res, "users/signup");
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
    redirectPage(req, res, `./login`);
  } catch (err) {
    console.log(`Error occured on`);
    console.log(err);
    return errorHandler(req, res, "users/signup", "Sorry :( Error in signup");
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return errorHandler(req, res, "users/login", "Μissing fields");
    }

    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "./login",
      failureFlash: true,
    })(req, res);
  } catch (err) {
    console.log(`Error occured on`);
    console.log(err);
    return errorHandler(req, res, "users/login", "Sorry :( Error in login");
  }
}

function logout(req, res) {
  req.logOut((err) => {
    if (err) {
      statusRespond(req, res, 500, {});
    }
    statusRespond(req, res, 200, {});
  });
}

module.exports = {
  signup,
  login,
  logout,
  getLoginView,
  getSignupView,
};
