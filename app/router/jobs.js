const express = require("express");
const router = express.Router();
const jobsController = include("controllers/jobs");

router.post("/create", createJob);
function createJob(req, res, next) {
  res.json(jobsController.createJob(req.user, req.body));
}

router.get("/get", getMyJobs);
function getMyJobs(req, res, next) {
  res.json(jobsController.getMyJobs(req.user));
}

router.delete("/delete", deleteJob);
function deleteJob(req, res, next) {
  res.json(jobsController.deleteJob(req.user, req.body));
}

module.exports = router;
