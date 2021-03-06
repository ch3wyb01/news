const {
  selectCommentsByArticleId,
  insertCommentByArticleId,
  removeCommentById,
  updateCommentById,
} = require("../models/comments.models");
const { checkExists } = require("../utils");

exports.getCommentsByArticleId = async (req, res, next) => {
  try {
    const { article_id } = req.params;

    isNaN(article_id)
      ? await Promise.reject({ status: 400, msg: "Invalid article ID" })
      : await checkExists("articles", "article_id", article_id);

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

    if (!username || !body) {
      await Promise.reject({ status: 400, msg: "Missing username or body" });
    }

    if (isNaN(article_id)) {
      await Promise.reject({ status: 400, msg: "Invalid article ID" });
    }

    await Promise.all([
      checkExists("articles", "article_id", article_id),
      checkExists("users", "username", username),
    ]);

    const comment = await insertCommentByArticleId(username, article_id, body);

    res.status(201).send({ comment });
  } catch (err) {
    next(err);
  }
};

exports.deleteCommentById = async (req, res, next) => {
  try {
    const { comment_id } = req.params;

    isNaN(comment_id)
      ? await Promise.reject({ status: 400, msg: "Invalid comment ID" })
      : await checkExists("comments", "comment_id", comment_id);

    await removeCommentById(comment_id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.patchCommentById = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    const { inc_votes } = req.body;

    isNaN(comment_id)
      ? await Promise.reject({ status: 400, msg: "Invalid comment ID" })
      : await checkExists("comments", "comment_id", comment_id);

    const comment = await updateCommentById(inc_votes, comment_id);

    res.status(200).send({ comment });
  } catch (err) {
    next(err);
  }
};
