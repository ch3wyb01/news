const {
  getUsers,
  getUserByUsername,
  postArticleVote,
  getVotedArticles,
  deleteArticleVote,
} = require("../controllers/users.controller");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(getUserByUsername);
usersRouter
  .route("/:username/voted_articles")
  .post(postArticleVote)
  .get(getVotedArticles)
  .delete(deleteArticleVote);

module.exports = usersRouter;
