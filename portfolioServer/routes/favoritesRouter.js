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
        .then(favorites => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorites);
        })
        .catch(err => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /favorites');
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /favorites');
});

module.exports = favoritesRouter;