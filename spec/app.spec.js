process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chai = require("chai");
chai.use(require("chai-sorted"));
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

describe("Invalid GET request", () => {
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
        });
    });
    describe("/:username", () => {
      it("GET: 200 - returns a specific requested user", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then((res) => {
            expect(res.body).to.eql({
              user: {
                username: "butter_bridge",
                name: "jonny",
                avatar_url:
                  "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
              },
            });
          });
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
    describe("/:article_id", () => {
      it("GET: 200 - returns a specific requested article", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then((res) => {
            expect(res.body.article.title).to.equal(
              "Living in the shadow of a great man"
            );
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
    });
  });
});
