const express = require("express");
const { handleServerErrors } = require("./errors/errors");
const apiRouter = require("./routes/api.router");

const app = express();

app.use("/api", apiRouter);

app.use(handleServerErrors);
module.exports = app;