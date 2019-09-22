var mongoose = require("mongoose");
var config = include("config");
var fs = require("fs");
var join = require("path").join;
var ca = fs.readFileSync(join(__dirname, "rds-combined-ca-bundle.pem"));

mongoose.connect(config.db, {
  useNewUrlParser: true
});

connect();

function connect() {
  var db = mongoose.connection;
  db.on("error", console.error.bind("connection error"));
  db.once("open", function() {
    console.log("db connected");
  });
}

// var fs = require("fs");

var models = join(__dirname, "models");
fs.readdirSync(models)
  .filter(file => file.indexOf(".js"))
  .forEach(file => require(join(models, file)));
