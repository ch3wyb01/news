//DROP tables in reverse - comments, articles, users, topics
return (
    db
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
      );`);
      })
      .then(() => {
        return db.query(`CREATE TABLE users(
        username VARCHAR(50) PRIMARY KEY,
        avatar_url TEXT,
        name VARCHAR(50) NOT NULL
      );`);
      })
      .then(() => {
        return db.query(`CREATE TABLE articles(
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        body TEXT NOT NULL,
        votes INT,
        topic VARCHAR(50) NOT NULL,
        author VARCHAR(50) REFERENCES users(username) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`);
      })
      .then(() => {
        return db.query(`CREATE TABLE comments(
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR(50) REFERENCES users(username) NOT NULL,
        article_id INT REFERENCES articles(article_id) NOT NULL,
        votes INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        body TEXT NOT NULL
      );`);
      })
      // 2. insert data
      .then(() => {
        const formattedTopicData = topicData.map((topic) => {
          return [topic.slug, topic.description];
        });
        const queryStr = format(
          `INSERT INTO topics
            (slug, description)
          VALUES
            %L;`,
          formattedTopicData
        );
        return db.query(queryStr);
      })
      .then(() => {
        const formattedUserData = userData.map((user) => {
          return [user.username, user.avatar_url, user.name];
        });
        const queryStr = format(
          `INSERT INTO users
            (username, avatar_url, name)
          VALUES
            %L;`,
          formattedUserData
        );
        return db.query(queryStr);
      })
      .then(() => {
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
        const queryStr = format(
          `INSERT INTO articles
            (title, body, votes, topic, author, created_at)
          VALUES
            %L;`,
          formattedArticleData
        );
        return db.query(queryStr);
      })
      .then(() => {
        const formattedCommentData = commentData.map((comment) => {
          return [
            comment.author,
            comment.article_id,
            comment.votes,
            comment.created_at,
            comment.body,
          ];
        });
        const queryStr = format(
          `INSERT INTO comments
            (author, article_id, votes, created_at, body)
          VALUES
            %L;`,
          formattedCommentData
        );
        return db.query(queryStr);
      })
  );