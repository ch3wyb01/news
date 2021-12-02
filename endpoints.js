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
    exampleRequest: {
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
    exampleRequest: {
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
    exampleResponse: {},
  },
};
console.log(new Date(1527695953341));