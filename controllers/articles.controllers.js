const { selectArticleById, updateArticleById } = require("../models/articles.models");

exports.getArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const article = await selectArticleById(article_id);
    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};

exports.patchArticleById = async (req, res, next) => {
  const {inc_votes} = req.body;
  const {article_id} = req.params;

  const article = await updateArticleById(inc_votes, article_id);
  
  res.status(200).send({article});
}