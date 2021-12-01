const {
  selectCommentsByArticleId,
  insertCommentByArticleId,
} = require("../models/comments.models");
const { checkExists } = require("../utils");

exports.getCommentsByArticleId = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    if (isNaN(article_id)) {
      await Promise.reject({ status: 400, msg: "Invalid article ID" });
    }
    await checkExists("articles", "article_id", article_id);

    const comments = await selectCommentsByArticleId(article_id);

    res.status(200).send({ comments });
  } catch (err) {
    next(err);
  }
};

exports.postCommentByArticleId = async (req, res, next) => {
  try {
    const { username, body } = req.body;
    const { article_id } = req.params;
    await checkExists("articles", "article_id", article_id);

    const comment = await insertCommentByArticleId(username, article_id, body);

    res.status(201).send({ comment });
  } catch (err) {
    next(err);
  }
};
