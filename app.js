const cors = require('cors');
const express = require("express");
const {
  handleServerErrors,
  handlePsqlErrors,
  handleCustomErrors,
} = require("./errors/errors");
const apiRouter = require("./routes/api.router");

app.use(cors());

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);
module.exports = app;
