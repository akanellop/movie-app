function redirectPage(req, res, page, status) {
  res.redirect(page);
}

function renderView(req, res, view, params) {
  res.render(view, { user: req.user, ...params });
}

function statusRespond(req, res, status, body) {
  res.status(status).json(body);
}

module.exports = { redirectPage, renderView, statusRespond };
