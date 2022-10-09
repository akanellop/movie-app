const User = require("../models/user");

function saveNew(user) {
  const userModel = new User(user);
  return userModel.save();
}

module.exports = { saveNew };
