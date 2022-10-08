function errorHandler(req, res, view, errorMessage, params) {
  res.render(view, { errorMessage, user: req.user, ...params });
}

module.exports = { errorHandler };
