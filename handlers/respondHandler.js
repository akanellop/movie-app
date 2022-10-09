function redirectPage(req, res, page, status) {
  res.redirect(page);
}

function renderView(req, res, view, params) {
  res.render(view, { user: req.user, ...params });
}

module.exports = { redirectPage, renderView };
