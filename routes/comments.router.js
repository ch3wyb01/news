const { deleteCommentByID } = require('../controllers/comments.controllers');

const commentsRouter = require('express').Router();

commentsRouter.route('/:comment_id').delete(deleteCommentByID);

module.exports = commentsRouter;