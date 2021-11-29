const express = require("express");
const { handleServerErrors, handlePsqlErrors } = require("./errors/errors");
const apiRouter = require("./routes/api.router");

const app = express();

app.use("/api", apiRouter);

app.use(handlePsqlErrors);
app.use(handleServerErrors);
module.exports = app;