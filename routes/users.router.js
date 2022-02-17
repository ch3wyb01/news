const {
  getUsers,
  getUserByUsername,
  postVotedArticle,
  getVotedArticles,
} = require("../controllers/users.controller");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(getUserByUsername);
usersRouter.route("/:username/voted_articles").post(postVotedArticle).get(getVotedArticles);

module.exports = usersRouter;
