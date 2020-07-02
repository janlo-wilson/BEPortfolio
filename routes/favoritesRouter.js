const express = require('express');
const bodyParser = require('body-parser');

const favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Uploading the favorites page for you');
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /favorites');
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /favorites');
});

module.exports = favoritesRouter;