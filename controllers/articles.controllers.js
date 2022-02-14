const {
  selectArticleById,
  updateArticleById,
  selectArticles,
} = require("../models/articles.models");
const { checkExists } = require("../utils");

exports.getArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;

    if (isNaN(article_id)) {
      await Promise.reject({ status: 400, msg: "Invalid article ID" });
    }

    await checkExists("articles", "article_id", article_id);

    const article = await selectArticleById(article_id);

    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};

exports.patchArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const { inc_votes } = req.body;

    if (isNaN(article_id)) {
      await Promise.reject({ status: 400, msg: "Invalid article ID" });
    }

    await checkExists("articles", "article_id", article_id);

    const article = await updateArticleById(inc_votes, article_id);

    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};

exports.getArticles = async (req, res, next) => {
  try {
    const { sort_by, order, topic, limit, p, author } = req.query;

    if (topic) {
      await checkExists("topics", "slug", topic);
    }

    const articlesInfo = await selectArticles(sort_by, order, topic, limit, p, author);

    res
      .status(200)
      .send({ total: articlesInfo.total, articles: articlesInfo.rows });
  } catch (err) {
    next(err);
  }
};
