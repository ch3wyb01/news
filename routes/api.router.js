const topicsRouter = require("./topics.router");
const articlesRouter = require("./articles.router");
const commentsRouter = require("./comments.router");
const usersRouter = require('./users.router');
const { getEndpoints } = require("../controllers/api.controller");

const apiRouter = require("express").Router();

apiRouter.route("/").get(getEndpoints);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
