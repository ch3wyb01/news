const { selectCommentsByArticleId } = require("../models/comments.models");
const { checkExists } = require("../utils");

exports.getCommentsByArticleId = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const values = await Promise.all([
      selectCommentsByArticleId(article_id),
      checkExists("articles", "article_id", article_id),
    ]);
    const comments = values[0];
    res.status(200).send({ comments });
  } catch (err) {
    next(err);
  }
};
