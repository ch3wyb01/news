const {
  getUsers,
  getUserByUsername,
  postArticleVote,
  getVotedArticles,
  deleteVotedArticle,
} = require("../controllers/users.controller");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(getUserByUsername);
usersRouter.route("/:username/voted_articles").post(postArticleVote).get(getVotedArticles).delete(deleteVotedArticle);

module.exports = usersRouter;
