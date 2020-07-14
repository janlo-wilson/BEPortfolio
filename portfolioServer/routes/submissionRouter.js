const express = require("express");
const bodyParser = require("body-parser");
const Submission = require("../models/submission");
const { response } = require("express");

const submissionRouter = express.Router();

submissionRouter.use(bodyParser.json());

submissionRouter
  .route("/")
  .get((req, res, next) => {
    Submission.find()
      .then((submission) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(submission);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Submission.create(req.body);
    then((submission) => {
      console.log("Submission Sent", submission);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(submission);
    }).catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /submission");
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /submission");
  });

module.exports = submissionRouter;
