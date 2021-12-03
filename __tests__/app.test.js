const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");
const { endpointsDescription } = require("../endpoints.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("200: returns array of topic objects with slug and description keys", async () => {
    const {
      body: { topics },
    } = await request(app).get("/api/topics").expect(200);
    expect(topics).toHaveLength(3);
    topics.forEach((topic) => {
      expect(topic).toEqual(
        expect.objectContaining({
          slug: expect.any(String),
          description: expect.any(String),
        })
      );
    });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: returns an article object with all relevant keys", async () => {
    const {
      body: { article },
    } = await request(app).get("/api/articles/1").expect(200);
    expect(article).toEqual(
      expect.objectContaining({
        article_id: 1,
        title: "Living in the shadow of a great man",
        body: "I find this existence challenging",
        votes: 100,
        topic: "mitch",
        author: "butter_bridge",
        created_at: "2020-07-09T20:11:00.000Z",
        comment_count: 11,
      })
    );
  });
  test("200: returns an article object when article has no associated comments", async () => {
    const {
      body: { article },
    } = await request(app).get("/api/articles/2").expect(200);
    expect(article).toEqual(
      expect.objectContaining({
        article_id: 2,
        title: "Sony Vaio; or, The Laptop",
        body: expect.any(String),
        votes: 0,
        topic: "mitch",
        author: "icellusedkars",
        created_at: expect.any(String),
        comment_count: 0,
      })
    );
  });
  test("400: returns bad request message when passed invalid article_id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/articles/beans").expect(400);
    expect(msg).toBe("Invalid article ID");
  });
  test("404: returns not found message when passed valid but non-existent article_id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/articles/100").expect(404);
    expect(msg).toBe("Article not found");
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: returns article with updated votes", async () => {
    const incrementer = { inc_votes: 2 };
    const {
      body: { article },
    } = await request(app)
      .patch("/api/articles/1")
      .send(incrementer)
      .expect(200);
    expect(article).toEqual({
      article_id: 1,
      title: "Living in the shadow of a great man",
      body: "I find this existence challenging",
      votes: 102,
      topic: "mitch",
      author: "butter_bridge",
      created_at: "2020-07-09T20:11:00.000Z",
      comment_count: 11,
    });
  });
  test("400: returns error message if no inc_votes included in body", async () => {
    const incrementer = {};
    const {
      body: { msg },
    } = await request(app)
      .patch("/api/articles/2")
      .send(incrementer)
      .expect(400);
    expect(msg).toBe("No votes change inputted");
  });
  test("400: returns error message if inc_votes is invalid data type", async () => {
    const incrementer = { inc_votes: "bob" };
    const {
      body: { msg },
    } = await request(app)
      .patch("/api/articles/2")
      .send(incrementer)
      .expect(400);
    expect(msg).toBe("Invalid input");
  });
  test("200: ignores extra keys on body and returns updated article", async () => {
    const incrementer = { inc_votes: -2, cats: 4 };
    const { body } = await request(app)
      .patch("/api/articles/1")
      .send(incrementer)
      .expect(200);
    expect(body.article).toEqual({
      article_id: 1,
      title: "Living in the shadow of a great man",
      body: "I find this existence challenging",
      votes: 98,
      topic: "mitch",
      author: "butter_bridge",
      created_at: "2020-07-09T20:11:00.000Z",
      comment_count: 11,
    });
  });
  test("404: returns path not found message when passed invalid path", async () => {
    const incrementer = { inc_votes: 1 };
    const {
      body: { msg },
    } = await request(app)
      .patch("/api/articlez/1")
      .send(incrementer)
      .expect(404);
    expect(msg).toBe("Path not found");
  });
  test("400: returns error message when passed invalid article ID", async () => {
    const incrementer = { inc_votes: 1 };
    const {
      body: { msg },
    } = await request(app)
      .patch("/api/articles/invalid")
      .send(incrementer)
      .expect(400);
    expect(msg).toBe("Invalid article ID");
  });
  test("404: returns error message when passed non-existent article ID", async () => {
    const incrementer = { inc_votes: 1 };
    const {
      body: { msg },
    } = await request(app)
      .patch("/api/articles/88")
      .send(incrementer)
      .expect(404);
    expect(msg).toBe("Resource not found in articles");
  });
});

describe("GET /api/articles", () => {
  test("200: returns array of articles", async () => {
    const {
      body: { articles },
    } = await request(app).get("/api/articles").expect(200);
    expect(articles).toHaveLength(12);
    articles.forEach((article) => {
      expect(article).toEqual(
        expect.objectContaining({
          article_id: expect.any(Number),
          title: expect.any(String),
          body: expect.any(String),
          votes: expect.any(Number),
          topic: expect.any(String),
          author: expect.any(String),
          created_at: expect.any(String),
          comment_count: expect.any(Number),
        })
      );
    });
  });
  test("200: returns array sorted by created_at descending by default", async () => {
    const {
      body: { articles },
    } = await request(app).get("/api/articles").expect(200);
    expect(articles).toBeSortedBy("created_at", { descending: true });
  });
  test("200: returns array sorted by passed sort_by query with valid column name", async () => {
    const {
      body: { articles },
    } = await request(app).get("/api/articles?sort_by=title").expect(200);
    expect(articles).toBeSortedBy("title", { descending: true });
    expect(articles[0]).toEqual(
      expect.objectContaining({
        article_id: 7,
        title: "Z",
        body: expect.any(String),
        votes: expect.any(Number),
        topic: expect.any(String),
        author: expect.any(String),
        created_at: expect.any(String),
        comment_count: expect.any(Number),
      })
    );
  });
  test("400: returns error message when passed invalid sort_by query", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/articles?sort_by=cats").expect(400);
    expect(msg).toBe("Invalid sort by query");
  });
  test("200: returns array ordered by ascending when passed order_by query of asc", async () => {
    const {
      body: { articles },
    } = await request(app).get("/api/articles?order=asc").expect(200);
    expect(articles).toBeSortedBy("created_at");
  });
  test("400: returns error message when passed invalid order query", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/articles?order=invalid").expect(400);
    expect(msg).toBe("Invalid order query");
  });
  test("200: returns array filtered by topic passed by topic query", async () => {
    const {
      body: { articles },
    } = await request(app).get("/api/articles?topic=mitch").expect(200);
    expect(articles).toHaveLength(11);
    articles.forEach((article) => {
      expect(article).toEqual(
        expect.objectContaining({
          article_id: expect.any(Number),
          title: expect.any(String),
          body: expect.any(String),
          votes: expect.any(Number),
          topic: "mitch",
          author: expect.any(String),
          created_at: expect.any(String),
          comment_count: expect.any(Number),
        })
      );
    });
  });
  test("200: returns empty array when passed topic query that has no associated articles", async () => {
    const {
      body: { articles },
    } = await request(app).get("/api/articles?topic=paper").expect(200);
    expect(Array.isArray(articles)).toBe(true);
    expect(articles).toHaveLength(0);
  });
  test("404: returns error message when passed topic query that does not exist", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/articles?topic=invalid").expect(404);
    expect(msg).toBe("Resource not found in topics");
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: responds with array of comments for the given article_id with the relevant keys", async () => {
    const {
      body: { comments },
    } = await request(app).get("/api/articles/5/comments").expect(200);
    expect(comments).toHaveLength(2);
    comments.forEach((comment) => {
      expect(comment).toEqual(
        expect.objectContaining({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          article_id: 5,
          created_at: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
        })
      );
    });
  });
  test("404: returns error message if passed non-existent article_id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/articles/100/comments").expect(404);
    expect(msg).toBe("Resource not found in articles");
  });
  test("400: returns error message if passed invalid article_id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/articles/invalid/comments").expect(400);
    expect(msg).toBe("Invalid article ID");
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: responds with new comment", async () => {
    const newComment = {
      username: "lurker",
      body: "Cats are better than dogs",
    };
    const {
      body: { comment },
    } = await request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201);
    expect(comment).toEqual(
      expect.objectContaining({
        comment_id: 19,
        author: "lurker",
        article_id: 1,
        votes: 0,
        created_at: expect.any(String),
        body: "Cats are better than dogs",
      })
    );
  });
  test("404: returns error message if passed non-existent article ID", async () => {
    const newComment = {
      username: "lurker",
      body: "Cats are better than dogs",
    };
    const {
      body: { msg },
    } = await request(app)
      .post("/api/articles/60/comments")
      .send(newComment)
      .expect(404);
    expect(msg).toBe("Resource not found in articles");
  });
  test("404: returns error message if passed non-existent username", async () => {
    const newComment = {
      username: "banana",
      body: "Cats are better than dogs",
    };
    const {
      body: { msg },
    } = await request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(404);
    expect(msg).toBe("Resource not found in users");
  });
  test("400: returns error message if passed invalid article ID", async () => {
    const newComment = {
      username: "lurker",
      body: "Cats are better than dogs",
    };
    const {
      body: { msg },
    } = await request(app)
      .post("/api/articles/invalid/comments")
      .send(newComment)
      .expect(400);
    expect(msg).toBe("Invalid article ID");
  });
  test("400: returns error message if passed object missing username key", async () => {
    const newComment = {
      body: "Cats are better than dogs",
    };
    const {
      body: { msg },
    } = await request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400);
    expect(msg).toBe("Missing username or body");
  });
  test("400: returns error message if passed object missing body key", async () => {
    const newComment = {
      username: "lurker",
    };
    const {
      body: { msg },
    } = await request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400);
    expect(msg).toBe("Missing username or body");
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: deletes comment by given ID and responds with no content", async () => {
    await request(app).delete("/api/comments/1").expect(204);
    const { rows } = await db.query(`SELECT * FROM comments;`);
    expect(rows).toHaveLength(17);
  });
  test("404: returns error message when passed non-existent comment ID", async () => {
    const {
      body: { msg },
    } = await request(app).delete("/api/comments/44").expect(404);
    expect(msg).toBe("Resource not found in comments");
  });
  test("400: returns error message when passed invalid comment ID", async () => {
    const {
      body: { msg },
    } = await request(app).delete("/api/comments/invalid").expect(400);
    expect(msg).toBe("Invalid comment ID");
  });
});

describe("GET /api", () => {
  test("200: returns JSON object describing all endpoints", async () => {
    const {
      body: { endpoints },
    } = await request(app).get("/api").expect(200);
    expect(endpoints).toEqual(endpointsDescription);
  });
});

describe("GET /api/users", () => {
  test("200: returns array of users containing their username", async () => {
    const {
      body: { users },
    } = await request(app).get("/api/users").expect(200);
    expect(users).toHaveLength(4);
    users.forEach((user) => {
      expect(user).toEqual(
        expect.objectContaining({
          username: expect.any(String),
        })
      );
    });
  });
});

describe("GET /api/users/:username", () => {
  test("200: returns user object with username, avatar_url, name properties", async () => {
    const {
      body: { user },
    } = await request(app).get("/api/users/rogersop").expect(200);
    expect(user).toEqual({
      username: "rogersop",
      name: "paul",
      avatar_url: "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
    });
  });
  test("400: returns error message when passed invalid username", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/users/54").expect(400);
    expect(msg).toBe("Invalid username");
  });
  test("404: returns error message when passed non-existent username", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/users/nonexistent").expect(404);
    expect(msg).toBe("Resource not found in users");
  });
});

describe("PATCH /api/comments/:comment_id", () => {
  test("200: returns comment with updated votes", async () => {
    const incrementer = { inc_votes: 3 };
    const {
      body: { comment },
    } = await request(app)
      .patch("/api/comments/2")
      .send(incrementer)
      .expect(200);
    expect(comment).toEqual(
      expect.objectContaining({
        comment_id: 2,
        body: expect.any(String),
        votes: 17,
        author: "butter_bridge",
        article_id: 1,
        created_at: expect.any(String),
      })
    );
  });
  test("400: returns error message when passed invalid comment ID", async () => {
    const incrementer = { inc_votes: 2 };
    const {
      body: { msg },
    } = await request(app)
      .patch("/api/comments/invalid")
      .send(incrementer)
      .expect(400);
    expect(msg).toBe("Invalid comment ID");
  });
});
