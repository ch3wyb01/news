const { getArticleById, patchArticleById, getArticles } = require("../controllers/articles.controllers");
const { getCommentsByArticleId, postCommentByArticleId } = require("../controllers/comments.controllers");

const articlesRouter = require("express").Router();

articlesRouter.route('/:article_id').get(getArticleById).patch(patchArticleById);

articlesRouter.route('/').get(getArticles);

articlesRouter.route('/:article_id/comments').get(getCommentsByArticleId).post(postCommentByArticleId);

module.exports = articlesRouter;