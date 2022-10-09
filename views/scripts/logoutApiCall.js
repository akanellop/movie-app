function callLogoutApi() {
  fetch("/users/logout", {
    method: "POST",
  });
}

module.exports = { callLogoutApi };
