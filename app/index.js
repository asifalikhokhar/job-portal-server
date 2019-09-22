global.include = function(name) {
  return require(__dirname + "/" + name);
};
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var logger = require("morgan");

var database = require("./database");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "5mb" }));

app.use(express.static(path.join(__dirname, "../public")));
app.use(require("express-promise")());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

function setupRoutes() {
  const routes = require("./routes");
  routes.setup(app);

  app.use(function(err, req, res, next) {
    res.status(err.headerStatus || err.status || 403);
    res.send({
      status: err.status || 403,
      message: err.message || err,
      data: err.data || {}
    });
  });
}
setupRoutes();
module.exports = app;
