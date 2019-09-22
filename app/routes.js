"use strict";

var config = include("config");

exports.setup = function(app) {
  var jwt = require("express-jwt");
  app.use(
    "/api/v1",
    jwt({ secret: config.tokenSecret }).unless({
      path: ["/api/v1/users/signup", "/api/v1/users/login"]
    })
  );

  var user = include("router/users");
  var job = include("router/jobs");

  app.use("/api/v1/users", user);
  app.use("/api/v1/jobs", job);
};

module.exports = exports;
