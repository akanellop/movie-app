// Middleware for user authentication
// If the user is not logged in, the API call is not permitted
function authenticateUser(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("Please log in to continue");
  res.redirect("/users/login");
}

module.exports = {
  authenticateUser,
};
