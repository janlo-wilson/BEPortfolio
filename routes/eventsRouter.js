const express = require('express');
const bodyParser = require('body-parser');

const eventsRouter = express.Router();

eventsRouter.use(bodyParser.json());

eventsRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Uploading the events page for you');
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /events');
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /events');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /events');
});

eventsRouter.route('/:arts')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will upload ${req.params.arts} events for you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /events/${req.params.arts}`);
})
.put((req, res) => {
    res.end('Adding your like to that item');
})
.delete((req, res) => {
    res.end('Deleting your like from that item');
});

eventsRouter.route('/:music')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will upload ${req.params.music} events for you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /events/${req.params.music}`);
})
.put((req, res) => {
    res.end('Adding your like to that item');
})
.delete((req, res) => {
    res.end('Deleting your like from that item');
});

eventsRouter.route('/:sports')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will upload ${req.params.sports} events for you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /events/${req.params.sports}`);
})
.put((req, res) => {
    res.end('Adding your like to that item');
})
.delete((req, res) => {
    res.end('Deleting your like from that item');
});

eventsRouter.route('/:volunteer')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will upload ${req.params.volunteer} events for you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /events/${req.params.volunteer}`);
})
.put((req, res) => {
    res.end('Adding your like to that item');
})
.delete((req, res) => {
    res.end('Deleting your like from that item');
});

module.exports = eventsRouter;