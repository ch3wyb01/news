const db = require("../db/connection");

exports.selectCommentsByArticleId = async (article_id) => {
    
  const { rows } = await db.query(
    `SELECT * FROM comments
    WHERE article_id = $1;`,
    [article_id]
  );

  return rows;
};

exports.insertCommentByArticleId = async (username, article_id, body) => {
  const { rows } = await db.query(
    `
INSERT INTO comments
(author, article_id, body)
VALUES
($1, $2, $3)
RETURNING *;`,
    [username, article_id, body]
  );

  return rows[0];
};
