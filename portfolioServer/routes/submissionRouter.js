const express = require('express');
const bodyParser = require('body-parser');

const submissionRouter = express.Router();

submissionRouter.use(bodyParser.json());

submissionRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Uploading the submission page for you');
})
.post((req, res) => {
    res.end(`Will add the event: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /submission');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /submission');
});

module.exports = submissionRouter;