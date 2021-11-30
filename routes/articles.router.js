const { getArticleById, patchArticleById, getArticles } = require("../controllers/articles.controllers");

const articlesRouter = require("express").Router();

articlesRouter.route('/:article_id').get(getArticleById).patch(patchArticleById);

articlesRouter.route('/').get(getArticles);

module.exports = articlesRouter;