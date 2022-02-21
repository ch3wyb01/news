const db = require("../db/connection");
const { updateArticleById } = require("./articles.models");

exports.selectUsers = async () => {
  const { rows } = await db.query(`
  SELECT * FROM users;`);

  const usernames = rows.map((user) => {
    return { username: user.username };
  });

  return usernames;
};

exports.selectUserByUsername = async (username) => {
  const { rows } = await db.query(
    `
    SELECT * FROM users
    WHERE username = $1;`,
    [username]
  );

  return rows[0];
};

exports.insertArticleVote = async (article_id, username) => {
  const { rows } = await db.query(
    `INSERT INTO article_votes
    (article_id, username)
    VALUES
    ($1, $2)
    RETURNING *;`,
    [article_id, username]
  );

  await updateArticleById(1, article_id);

  return rows[0];
};

exports.selectVotedArticles = async (username) => {
  const { rows } = await db.query(
    `SELECT articles.*
    FROM article_votes
    JOIN articles ON articles.article_id = article_votes.article_id
    WHERE username = $1;`,
    [username]
  );

  return rows;
};

exports.removeArticleVote = async (article_id, username) => {
  const { rows } = await db.query(
    `DELETE FROM article_votes
  WHERE article_id = $1
  AND username = $2
  RETURNING *;`,
    [article_id, username]
  );

  if (!rows.length) {
    await Promise.reject({
      status: 404,
      msg: "user has not voted for this article",
    });
  }
};
