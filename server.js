if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const passport = require("passport");
const { loginAuthentication } = require("./auth/passport");
loginAuthentication(passport);

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use(
  session({
    secret: process.env.APP_SESSION_SECRET || "movieramaSecret234adas!@!",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// Separate app's domains routing
const moviesRouter = require("./routes/movies");
const userRouter = require("./routes/users");
app.use("/", moviesRouter);
app.use("/users", userRouter);

app.listen(process.env.PORT || 3000);
