const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const homeRouter = require('./routes/homeRouter');
const eventsRouter = require('./routes/eventsRouter');
const favoritesRouter = require('./routes/favoritesRouter');
const submissionRouter = require('./routes/submissionRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/home', homeRouter);
app.use('/events', eventsRouter);
app.use('/favorites', favoritesRouter);
app.use('/submission', submissionRouter);

app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>My Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});