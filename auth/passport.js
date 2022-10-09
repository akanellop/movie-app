const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

async function loginAuthentication(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      async (username, password, done) => {
        const userFound = await User.findOne({ username });
        if (!userFound) {
          console.log("wrong username");
          return done();
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (isMatch) {
          return done(null, userFound);
        } else {
          console.log("Wrong password");
          return done();
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });
}

module.exports = {
  loginAuthentication,
};
