const {
  selectArticleById,
  updateArticleById,
  selectArticles,
} = require("../models/articles.models");

exports.getArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const article = await selectArticleById(article_id);
    console.log(article);
    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};

exports.patchArticleById = async (req, res, next) => {
  try {
    const { inc_votes } = req.body;
    const { article_id } = req.params;

    const article = await updateArticleById(inc_votes, article_id);

    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};

exports.getArticles = async (req, res, next) => {
  const articles = await selectArticles();
}