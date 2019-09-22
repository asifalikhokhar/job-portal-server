const express = require("express");
const router = express.Router();
const usersController = include("controllers/users");

router.post("/login", login);
function login(req, res, next) {
  res.json(usersController.login(req.body));
}

router.post("/signup", signup);
function signup(req, res, next) {
  res.json(usersController.signup(res, req.body));
}

module.exports = router;
