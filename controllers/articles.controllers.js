const { selectArticleById } = require("../models/articles.models");

exports.getArticleById = async (req, res, next) => {
  const { article_id } = req.params;
  const article = await selectArticleById(article_id);
//   console.log({article});
  res.status(200).send({ article });
};
