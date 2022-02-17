const {
  selectUsers,
  selectUserByUsername,
  insertArticleVote,
  selectVotedArticles,
  removeArticleVote,
} = require("../models/users.models");
const { checkExists } = require("../utils");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await selectUsers();

    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;

    !isNaN(username)
      ? await Promise.reject({ status: 400, msg: "Invalid username" })
      : await checkExists("users", "username", username);

    const user = await selectUserByUsername(username);

    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

exports.postArticleVote = async (req, res, next) => {
  try {
    const { username } = req.params;

    const { article_id } = req.body;

    !isNaN(username)
      ? await Promise.reject({ status: 400, msg: "Invalid username" })
      : await checkExists("users", "username", username);

    isNaN(article_id)
      ? await Promise.reject({ status: 400, msg: "Invalid article ID" })
      : await checkExists("articles", "article_id", article_id);

    const article = await insertArticleVote(article_id, username);

    res.status(201).send({ article });
  } catch (err) {
    next(err);
  }
};

exports.getVotedArticles = async (req, res, next) => {
  try {
    const { username } = req.params;

    !isNaN(username)
      ? await Promise.reject({ status: 400, msg: "Invalid username" })
      : await checkExists("users", "username", username);

    const articles = await selectVotedArticles(username);

    res.status(200).send({ articles });
  } catch (err) {
    next(err);
  }
};

exports.deleteArticleVote = async (req, res, next) => {
  try {
    const { username } = req.params;

    const { article_id } = req.body;

    !isNaN(username)
      ? await Promise.reject({ status: 400, msg: "Invalid username" })
      : await checkExists("users", "username", username);

    isNaN(article_id)
      ? await Promise.reject({ status: 400, msg: "Invalid article ID" })
      : await checkExists("articles", "article_id", article_id);

    await removeArticleVote(article_id, username);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
