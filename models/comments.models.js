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

exports.removeCommentById = async (comment_id) => {
  await db.query(
    `
  DELETE FROM comments
  WHERE comment_id = $1;
  `,
    [comment_id]
  );
};

exports.updateCommentById = async (inc_votes, comment_id) => {
  const { rows } = await db.query(
    `
  UPDATE comments
  SET votes = votes + $1
  WHERE comment_id = $2
  RETURNING *`,
    [inc_votes, comment_id]
  );

  return rows[0];
};
