exports.endpointsDescription = {
  "GET /api": {
    description:
      "serves up a json representation of all the available endpoints of the api",
  },
  "GET /api/topics": {
    description: "serves an array of all topics",
    queries: [],
    exampleResponse: {
      topics: [{ slug: "football", description: "Footie!" }],
    },
  },
  "GET /api/articles": {
    description: "serves an array of all topics",
    queries: ["topic", "sort_by", "order"],
    exampleResponse: {
      articles: [
        {
          title: "Seafood substitutions are increasing",
          topic: "cooking",
          author: "weegembump",
          body: "Text from the article...",
          created_at: "2018-05-30T15:59:13.341Z",
        },
      ],
    },
  },
  "GET /api/articles/:article_id": {
    description: "serves an object of an article with the given ID",
    queries: [],
    exampleRequest: "/api/articles/1",
    exampleResponse: {
      article: {
        article_id: 1,
        title: "Running a Node App",
        body: "Text from the article...",
        votes: 0,
        topic: "coding",
        author: "jessjelly",
        created_at: "2020-11-07T06:03:00.000Z",
        comment_count: 8,
      },
    },
  },
  "PATCH /api/articles/:article_id": {
    description:
      "accepts an object in the form {inc_votes : newVotes} where newVotes indicates how much the votes property in the given article should be updated by and responds with the updated article",
    queries: [],
    exampleRequest: "/api/articles/1",
    exampleRequestBody: {
      inc_votes: 2,
    },
    exampleResponse: {
      article: {
        article_id: 1,
        title: "Running a Node App",
        body: "Text from the article...",
        votes: 2,
        topic: "coding",
        author: "jessjelly",
        created_at: "2020-11-07T06:03:00.000Z",
        comment_count: 8,
      },
    },
  },
  "GET /api/articles/:article_id/comments": {
    description:
      "serves an array of all comments associated with the given article ID",
    queries: [],
    exampleRequest: "/api/articles/5/comments",
    exampleResponse: {
      comments: [
        {
          comment_id: 18,
          author: "jessjelly",
          article_id: 5,
          votes: 6,
          created_at: "2020-08-15T18:11:00.000Z",
          body: "Text from the comment...",
        },
        {
          comment_id: 88,
          author: "weegembump",
          article_id: 5,
          votes: -3,
          created_at: "2020-05-26T16:11:00.000Z",
          body: "Text from the comment...",
        },
      ],
    },
  },
  "POST /api/articles/:article_id/comments": {
    description:
      "accepts an object with username and body properties that post a comment and associate it with the given article ID, then responds with the posted comment",
    queries: [],
    exampleRequest: "/api/articles/3/comments",
    exampleRequestBody: {
      username: "validUsername",
      body: "Comment on the article",
    },
    exampleResponse: {
      comment: {
        comment_id: 116,
        author: "validUsername",
        article_id: 3,
        votes: 0,
        created_at: "2020-09-03T02:06:00.000Z",
        body: "Comment on the article",
      },
    },
  },
  "DELETE /api/comments/:comment_id": {
    description:
      "Deletes comment with the given comment ID and responds with no content",
    queries: [],
    exampleRequest: "/api/comments/2",
    exampleResponse: {},
  },
  "GET /api/users": {
    description: "serves an array of all users' usernames",
    queries: [],
    exampleResponse: {
      users: [
        { username: "butter_bridge" },
        { username: "icellusedkars" },
        { username: "rogersop" },
        { username: "lurker" },
      ],
    },
  },
  "GET /api/users/:username": {
    description: "serves an object of a user with the given username",
    queries: [],
    exampleRequest: "/api/users/coder123",
    exampleResponse: {
      username: "coder123",
      name: "Cody",
      avatar_url: "https://avatar.url",
    },
  },
  "PATCH /api/comments/:comment_id": {
    description:
      "accepts an object in the form {inc_votes : newVotes} where newVotes indicates how much the votes property in the given comment should be updated by and responds with the updated comment",
    queries: [],
    exampleRequest: "/api/comments/2",
    exampleRequestBody: {
      inc_votes: 2,
    },
    exampleResponse: {
      comment: {
        comment_id: 2,
        body: "Text from the comment...",
        votes: 17,
        author: "butter_bridge",
        article_id: 1,
        created_at: "2020-07-09T20:11:00.000Z",
      },
    },
  },
};
