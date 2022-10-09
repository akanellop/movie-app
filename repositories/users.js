const User = require("../models/user");

function saveNew(user) {
  return User.save(user);
}

module.exports = { saveNew };
