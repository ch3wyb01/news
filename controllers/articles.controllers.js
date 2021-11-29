const { selectArticleById } = require("../models/articles.models");

exports.getArticleById = async (req, res, next) => {
  const { article_id } = req.params;
  await selectArticleById(article_id);
};
