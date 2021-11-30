const { getArticleById, patchArticleById } = require("../controllers/articles.controllers");

const articlesRouter = require("express").Router();

articlesRouter.route('/:article_id').get(getArticleById).patch(patchArticleById);

module.exports = articlesRouter;