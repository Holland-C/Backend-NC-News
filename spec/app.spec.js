// process.env.NODE_env = "test";

const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");

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
});
