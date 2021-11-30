const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("200: returns array of topic objects with slug and description keys", async () => {
    const { body } = await request(app)
      .get("/api/topics")
      .expect(200);
    expect(body.topics).toHaveLength(3);
    body.topics.forEach((topic) => {
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
    const { body } = await request(app)
      .get("/api/articles/1")
      .expect(200);
    expect(body.article).toEqual(
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
  test("400: returns bad request message when passed invalid article_id", async () => {
    const { body } = await request(app)
      .get("/api/articles/beans")
      .expect(400);
    expect(body.msg).toBe("Invalid input");
  });
  test("404: returns not found message when passed valid but non-existent article_id", async () => {
    const { body } = await request(app)
      .get("/api/articles/100")
      .expect(404);
    expect(body.msg).toBe("Article not found");
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: returns article with updated votes", async () => {
    const incrementer = { inc_votes: 2 };
    const { body } = await request(app)
      .patch("/api/articles/1")
      .send(incrementer)
      .expect(200);
    expect(body.article).toEqual({
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
    const { body: { msg } } = await request(app)
      .patch("/api/articles/2")
      .send(incrementer)
      .expect(400);
    expect(msg).toBe("No votes change inputted");
  });
  test('400: returns error message if inc_votes is invalid data type', async () => {
    const incrementer = {inc_votes : "bob"};
    const { body: { msg } } = await request(app)
      .patch("/api/articles/2")
      .send(incrementer)
      .expect(400);
    expect(msg).toBe("Invalid input");
  });
});
