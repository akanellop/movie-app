const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

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
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(user.password, salt);

    user.password = passwordHashed;
    await user.save();
    res.redirect(`/login`);
  } catch (err) {
    res.render("users/register", {
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
    res.redirect("login");
  });
}

module.exports = {
  register,
  login,
  logout,
};
