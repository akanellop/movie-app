const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/login", usersController.getLoginView);
router.get("/new", usersController.getSignupView);

router.post("/new", usersController.signup);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);

module.exports = router;
