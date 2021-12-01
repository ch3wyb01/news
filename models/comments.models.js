const db = require("../db/connection");

exports.selectCommentsByArticleId = async (article_id) => {
  const { rows } = await db.query(
    `SELECT * FROM comments
    WHERE article_id = $1;`,
    [article_id]
  );

  return rows;
};
