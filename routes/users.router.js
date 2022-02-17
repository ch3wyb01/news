const {
  getUsers,
  getUserByUsername,
  postVotedArticle,
} = require("../controllers/users.controller");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(getUserByUsername);
usersRouter.route("/:username/voted_articles").post(postVotedArticle);

module.exports = usersRouter;
