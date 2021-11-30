const db = require("../db/connection");

exports.selectArticleById = async (article_id) => {
  const { rows } = await db.query(
    `SELECT articles.*, CAST(COUNT(comments.article_id) AS int) AS comment_count
    FROM articles
    JOIN comments ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`,
    [article_id]
  );

  const article = rows[0];

  if (!article) {
    await Promise.reject({
      status: 404,
      msg: "Article not found",
    });
  }

  return article;
};

exports.updateArticleById = async (inc_votes, article_id) => {

  if (!inc_votes) {
    await Promise.reject({
      status: 400,
      msg: "No votes change inputted",
    });
  }

  await db.query(
    `UPDATE articles
  SET votes = votes + $1
  WHERE article_id = $2;`,
    [inc_votes, article_id]
  );

  const article = await this.selectArticleById(article_id);

  return article;
};

exports.selectArticles = async () => {

}