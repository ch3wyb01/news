const db = require("../db/connection");

exports.selectArticleById = async (article_id) => {

  const { rows } = await db.query(
    `SELECT articles.*, COUNT(comments.article_id) AS comment_count
    FROM articles
    JOIN comments ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`,
    [article_id]
  );
  
  return rows[0];
};

