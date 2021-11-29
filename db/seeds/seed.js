const db = require("../connection");
const seed = ({ articleData, commentData, topicData, userData }) => {
  // const { articleData, commentData, topicData, userData } = data;

  //DROP tables in reverse - comments, articles, users, topics
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    })
  // 1. create tables - topics, users, articles, comments
    .then(() => {
      return db.query(`CREATE TABLE topics(
        slug VARCHAR(50) PRIMARY KEY,
        description VARCHAR(200) NOT NULL
      );`)
    }).then(() => {
      return db.query(`CREATE TABLE users(
        username VARCHAR(50) PRIMARY KEY,
        avatar_url TEXT,
        name VARCHAR(50) NOT NULL
      );`)
    }).then(() => {
      return db.query(`CREATE TABLE articles(
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        body TEXT NOT NULL,
        votes INT,
        author VARCHAR(50) REFERENCES users(username) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`)
    }).then(() => {
      return db.query(`CREATE TABLE comments(
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR(50) REFERENCES users(username) NOT NULL,
        article_id INT REFERENCES articles(article_id) NOT NULL,
        votes INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        body TEXT NOT NULL
      );`)
    })
  // 2. insert data
};

module.exports = seed;
