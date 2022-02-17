const db = require("../db/connection");

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

exports.insertVotedArticle = async (article_id, username) => {
  const { rows } = await db.query(
    `INSERT INTO article_votes
  (article_id, username)
  VALUES
  ($1, $2)
  RETURNING *;`,
    [article_id, username]
  );

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
