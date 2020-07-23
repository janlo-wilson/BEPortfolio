const express = require("express");
const bodyParser = require("body-parser");
const EventType = require("../models/eventTypes");
const { response } = require("express");
const authenticate = require("../authenticate");
const cors = require('./cors');

const favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());

favoritesRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    EventType.find()
      .then((events) => {
        let favorites = events.filter(function (x) {
          if (x.featured == true) {
            return x;
          }
        });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favorites);
      })
      .catch((err) => next(err));
  })      
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    EventType.create(req.body)
      .then((event) => {
        console.log("Event Created:", event);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      })
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /favorites");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /favorites");
  });

module.exports = favoritesRouter;
