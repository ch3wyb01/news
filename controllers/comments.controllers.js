const { selectCommentsByArticleId } = require("../models/comments.models");

exports.getCommentsByArticleId = async (req, res, next) => {
    const {article_id} = req.params;
    const comments = await selectCommentsByArticleId(article_id);
    res.status(200).send({comments});
}