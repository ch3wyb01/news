const { getArticleById } = require("../controllers/articles.controllers");

const articlesRouter = require("express").Router();

articlesRouter.route('/:article_id').get(getArticleById);

module.exports = articlesRouter;