// process.env.NODE_env = "test";

const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

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
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
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
    describe("/:user_id", () => {
      it("GET: 200 - returns a specific requested user", () => {
        return request(app)
          .get("/api/users/tickle122")
          .expect(200)
          .then((res) => {
            expect(res.body).to.eql({
              user: {
                username: "tickle122",
                name: "Tom Tickle",
                avatar_url:
                  "https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg",
              },
            });
          });
      });
    });
  });
});
