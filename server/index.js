const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 4000;
// const environment = process.env.NODE_ENV || 'development';

const app = express();

app.use(cors());

app.use(bodyParser.json());

const server = http.createServer(app);

app.use(express.static('build'));

app.use(require('./routes'));

app.use(function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
})

server.listen({ port }, () => {
    console.log(`Ulpaningo Server running at port ${port}`)
});