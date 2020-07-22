const express = require('express');
const bodyParser = require('body-parser');
const Favorite = require('../models/favorites');
const { response } = require('express');
const authenticate = require('../authenticate');

const favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
.get((req, res, next) => {
    Favorite.find()
        .then(events => {
            let favorites = events.filter(function(x) {
                if (events.featured == true) {
                    return events
                }
                });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorites);
        })
        .catch(err => next(err));
})
.post(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Favorite.create(req.body)
        .then((event) => {
          console.log("Event Created:", event);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(event);
        })
        .catch((err) => next(err));
    }
  )
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /favorites');
});

module.exports = favoritesRouter;