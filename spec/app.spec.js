process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chai = require("chai");
chai.use(require("chai-sorted"));
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

describe("GET request", () => {
  it("returns status 404 and route not found, if incorrect route is entered", () => {
    return request(app)
      .get("/incorrect")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.equal("Route not found");
      });
  });
});

describe("/api", () => {
  describe("/topics", () => {
    it("GET: 200 - returns an array of topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          res.body.topics.forEach((topic) => {
            expect(topic).to.have.all.keys(["description", "slug"]);
          });
        });
    });
    it("INVALID METHODS: 405 - responds with Method Not Allowed", () => {
      const invalidMethods = ["put", "delete", "patch"];
      const requests = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/topics")
          .expect(405)
          .then((res) => {
            expect(res.body.msg).to.equal("Method Not Allowed");
          });
      });
      return Promise.all(requests);
    });
  });
  describe("/users", () => {
    it("GET: 200 - returns an array of user objects", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          res.body.users.forEach((user) => {
            expect(user).to.have.all.keys(["username", "name", "avatar_url"]);
          });
          expect(res.body.users[2]).to.eql({
            username: "rogersop",
            name: "paul",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
          });
        });
    });
    it("returns a specified user object if passed as a parametric endpoint", () => {
      return request(app)
        .get("/api/users/rogersop")
        .expect(200)
        .then((res) => {
          expect(res.body.user).to.eql({
            username: "rogersop",
            name: "paul",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
          });
        });
    });
    it("INVALID METHODS: 405 - responds with Method Not Allowed", () => {
      const invalidMethods = ["put", "delete", "patch"];
      const requests = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/users")
          .expect(405)
          .then((res) => {
            expect(res.body.msg).to.equal("Method Not Allowed");
          });
      });
      return Promise.all(requests);
    });
  });
});
describe("/articles", () => {
  it("GET: 200 - returns an array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).to.be.an("Array");
        expect(articles).to.have.length(12);
      });
  });
  it("sorts by default in descending order by date of creation", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).to.be.sortedBy("created_at", { descending: true });
      });
  });
  it("sorts by other columns when passed a valid column as a url sort_by query", () => {
    return request(app)
      .get("/api/articles?sort_by=votes")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).to.be.sortedBy("votes", { descending: true });
      });
  });
  it("400 - responds with an error when sort_by column does not exist", () => {
    return request(app)
      .get("/api/articles?sort_by=banana")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal("Bad request");
      });
  });
  it("accepts an order query(asc/desc) and responds with the articles in the requested order", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).to.be.ascendingBy("created_at");
      });
  });

  it("filters by type when passed a url query", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).to.equal(1);
      });
  });
  it("INVALID METHODS: 405 - responds with Method Not Allowed", () => {
    const invalidMethods = ["put", "delete"];
    const requests = invalidMethods.map((method) => {
      return request(app)
        [method]("/api/articles")
        .expect(405)
        .then((res) => {
          expect(res.body.msg).to.equal("Method Not Allowed");
        });
    });
    return Promise.all(requests);
  });
  describe("/:article_id", () => {
    it("GET: 200 - returns a specific requested article", () => {
      return request(app)
        .get("/api/articles/4")
        .expect(200)
        .then((res) => {
          expect(res.body.article.title).to.equal("Student SUES Mitch!");
        });
    });
    it("contains comment_count key which collates comments", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((res) => {
          expect(res.body.article).to.have.all.keys(
            `author`,
            `title`,
            `article_id`,
            `body`,
            `topic`,
            `created_at`,
            `votes`,
            `comment_count`
          );
        });
    });
    it("PATCH - changes vote figure correctly & returns article with updated votes", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article.votes).to.equal(101);
        });
    });
    it("INVALID METHODS: 405 - responds with Method Not Allowed", () => {
      const invalidMethods = ["put", "delete"];
      const requests = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/articles/2")
          .expect(405)
          .then((res) => {
            expect(res.body.msg).to.equal("Method Not Allowed");
          });
      });
      return Promise.all(requests);
    });
  });
});
describe("/comment", () => {
  it("GET: 200 - returns an array of comment objects", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.comments.length).to.equal(13);
      });
  });
  it("POST- 201 - accepts a comment and responds with the posted comment", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ author: "lurker", body: "here is my comment" })
      .expect(201)
      .then(({ body }) => {
        expect(body.author).to.equal("lurker");
        expect(body.body).to.equal("here is my comment");
      });
  });
  it("PATCH - changes vote figure correctly & returns comment with updated votes", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.comment.votes).to.equal(17);
      });
  });
  it("DELETE - deletes comment and returns 204 status", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(() => {
        return connection("comments").where({ comment_id: 1 });
      })
      .then((comment) => {
        expect(comment.length).to.eql(0);
      });
  });
  it("INVALID METHODS: 405 - responds with Method Not Allowed", () => {
    const invalidMethods = ["put"];
    const requests = invalidMethods.map((method) => {
      return request(app)
        [method]("/api/comments/2")
        .expect(405)
        .then((res) => {
          expect(res.body.msg).to.equal("Method Not Allowed");
        });
    });
    return Promise.all(requests);
  });
});
