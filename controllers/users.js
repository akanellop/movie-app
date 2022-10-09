const passport = require("passport");
const bcrypt = require("bcryptjs");
const usersRepository = require("../repositories/users");
const { errorHandler } = require("../handlers/errorHandler");
const {
  redirectPage,
  renderView,
  statusRespond,
} = require("../handlers/respondHandler");

// Render login form
function getLoginView(req, res) {
  renderView(req, res, "users/login");
}

// Render post signup form
function getSignupView(req, res) {
  renderView(req, res, "users/signup");
}

//Handle signup API call and create new user
async function signup(req, res) {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(user.password, salt);
    user.password = passwordHashed;
    await usersRepository.saveNew(user);
    redirectPage(req, res, `./login`);
  } catch (err) {
    console.log(`Error occured on`);
    console.log(err);
    return errorHandler(req, res, "users/signup", "Sorry :( Error in signup");
  }
}

// Handles login API call
// Authentication is completed with passport package and the user is serialised on requests payload for the following requests
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

// Handled Fetch API call
// Logs out user and terminates session
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
