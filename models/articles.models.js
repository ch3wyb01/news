const db = require("../db/connection");

exports.selectArticleById = async (article_id) => {
 
  const { rows } = await db.query(
    `SELECT articles.*, CAST(COUNT(comments.article_id) AS int) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`,
    [article_id]
  );

  const article = rows[0];

  return article;
};

exports.updateArticleById = async (inc_votes, article_id) => {
  if (inc_votes) {
    await db.query(
      `UPDATE articles
    SET votes = ${inc_votes ? 'votes + $1' : 'votes'}
    WHERE article_id = $2;`,
      [inc_votes, article_id]
    );
  } 
  const article = await this.selectArticleById(article_id);

  return article;
};

exports.selectArticles = async (
  sort_by = "created_at",
  order = "desc",
  topic
) => {
  if (
    ![
      "title",
      "body",
      "votes",
      "topic",
      "author",
      "created_at",
      "comment_count",
    ].includes(sort_by)
  ) {
    await Promise.reject({ status: 400, msg: "Invalid sort by query" });
  }

  if (!["asc", "desc"].includes(order)) {
    await Promise.reject({ status: 400, msg: "Invalid order query" });
  }


  const queryStr = `SELECT articles.*, CAST(COUNT(comments.article_id) AS int) AS comment_count
  FROM articles
  LEFT JOIN comments ON articles.article_id = comments.article_id
  ${topic ? ' WHERE topic = $1' : ''}
  GROUP BY articles.article_id
  ORDER BY ${sort_by} ${order};`;

  
  const { rows } = await db.query(queryStr, topic ? [topic] : []);

  return rows;
};
