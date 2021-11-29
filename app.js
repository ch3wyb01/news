const express = require('express');
const apiRouter = require('./routes/api.router');

const app = express();

app.use('/api', apiRouter);

module.exports = app;