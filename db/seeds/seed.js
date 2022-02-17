const db = require("../connection");
const format = require("pg-format");
const seed = async ({
  articleData,
  commentData,
  topicData,
  userData,
  articleVotesData,
}) => {
  // 1. drop tables in reverse - article_votes, comments, articles, users, topics
  await db.query(`DROP TABLE IF EXISTS article_votes;`);

  await db.query(`DROP TABLE IF EXISTS comments;`);

  await db.query(`DROP TABLE IF EXISTS articles;`);

  await Promise.all([
    db.query(`DROP TABLE IF EXISTS users;`),
    db.query(`DROP TABLE IF EXISTS topics;`),
  ]);
  // 2. create tables - topics, users, articles, comments, article_votes
  const createTopicsStr = `CREATE TABLE topics(
    slug VARCHAR(50) PRIMARY KEY,
    description VARCHAR(200) NOT NULL
    );`;

  const createUsersStr = `CREATE TABLE users(
    username VARCHAR(50) PRIMARY KEY,
    avatar_url TEXT,
    name VARCHAR(50) NOT NULL
  );`;

  await Promise.all([db.query(createTopicsStr), db.query(createUsersStr)]);

  await db.query(`CREATE TABLE articles(
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    body TEXT NOT NULL,
    votes INT,
    topic VARCHAR(50) NOT NULL,
    author VARCHAR(50) REFERENCES users(username) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`);

  await db.query(`CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR(50) REFERENCES users(username) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
    article_id INT REFERENCES articles(article_id) ON DELETE CASCADE NOT NULL,
    votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    body TEXT NOT NULL
  );`);

  await db.query(`CREATE TABLE article_votes(
    article_votes_id SERIAL PRIMARY KEY,
    article_id INT REFERENCES articles(article_id) ON DELETE CASCADE NOT NULL,
    username VARCHAR(50) REFERENCES users(username) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL
  );`);

  // 2. insert data
  const formattedTopicData = topicData.map((topic) => {
    return [topic.slug, topic.description];
  });
  const insertTopicData = format(
    `INSERT INTO topics
      (slug, description)
    VALUES
      %L;`,
    formattedTopicData
  );

  const formattedUserData = userData.map((user) => {
    return [user.username, user.avatar_url, user.name];
  });
  const insertUserData = format(
    `INSERT INTO users
      (username, avatar_url, name)
    VALUES
      %L;`,
    formattedUserData
  );

  await Promise.all([db.query(insertTopicData), db.query(insertUserData)]);

  const formattedArticleData = articleData.map((article) => {
    return [
      article.title,
      article.body,
      article.votes,
      article.topic,
      article.author,
      article.created_at,
    ];
  });
  const insertArticleData = format(
    `INSERT INTO articles
      (title, body, votes, topic, author, created_at)
    VALUES
      %L;`,
    formattedArticleData
  );

  await db.query(insertArticleData);

  const formattedCommentData = commentData.map((comment) => {
    return [
      comment.author,
      comment.article_id,
      comment.votes,
      comment.created_at,
      comment.body,
    ];
  });
  const insertCommentData = format(
    `INSERT INTO comments
      (author, article_id, votes, created_at, body)
    VALUES
      %L;`,
    formattedCommentData
  );

  await db.query(insertCommentData);

  const formattedArticleVotesData = articleVotesData.map((vote) => {
    return [vote.article_id, vote.username];
  });

  const insertArticleVotesData = format(
    `INSERT INTO article_votes
      (article_id, username)
    VALUES
      %L;`,
    formattedArticleVotesData
  );

  await db.query(insertArticleVotesData);
};

module.exports = seed;
