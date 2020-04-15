const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("returns a new Array", () => {
    const input = [];
    expect(formatDates(input)).to.not.equal(input);
  });
  it("returns an array containing the same keys as the one passed in", () => {
    const input = [
      {
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: 1163852514171,
      },
    ];
    expect(formatDates(input)[0]).to.haveOwnProperty("title");
    expect(formatDates(input)[0]).to.haveOwnProperty("topic");
    expect(formatDates(input)[0]).to.haveOwnProperty("author");
    expect(formatDates(input)[0]).to.haveOwnProperty("body");
    expect(formatDates(input)[0]).to.haveOwnProperty("created_at");
  });
  it("amends the created_at integer to a recognisable date format", () => {
    const input = [
      {
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: 1163852514171,
      },
    ];
    const expected = [
      {
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: new Date(1163852514171),
      },
    ];
    expect(formatDates(input)).to.eql(expected);
  });
});

describe("makeRefObj", () => {
  it("returns an empty object when given an empty array", () => {
    const input = [];
    expect(makeRefObj(input)).to.eql({});
  });
  it("returns an article title & article id object when passed an array with a single article", () => {
    const articles = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    expect(makeRefObj(articles, "title", "article_id")).to.eql({
      "Living in the shadow of a great man": 1,
    });
  });
  it("returns multiple article titles & article id objects when passed an array with multiple articles", () => {
    const articles = [
      {
        article_id: 1,
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171,
      },
      {
        article_id: 2,
        title: "A",
        topic: "mitch",
        author: "icellusedkars",
        body: "Delicious tin of cat food",
        created_at: 911564514171,
      },
      {
        article_id: 3,
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: 785420514171,
      },
    ];
    expect(makeRefObj(articles, "title", "article_id")).to.eql({
      "UNCOVERED: catspiracy to bring down democracy": 1,
      A: 2,
      Z: 3,
    });
  });
  it("does not mutate the original data", () => {
    const articles = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    const articlesCopy = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    makeRefObj(articles, "title", "article_id");
    expect(articles).to.deep.equal(articlesCopy);
  });
});

describe("formatComments", () => {
  it("returns a new Array", () => {
    const input = [];
    const articleRef = { "Living in the shadow of a great man": 1 };
    expect(formatComments(input, articleRef)).to.not.equal(input, {});
  });
  it("returns the same number of comment objects as was passed in", () => {
    const input = [
      {
        body: "Lobster pot",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1322138163389,
      },
      {
        body: "Delicious crackerbreads",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1290602163389,
      },
      {
        body: "Superficially charming",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1259066163389,
      },
    ];
    const articleRef = { "Living in the shadow of a great man": 1 };
    expect(formatComments(input, articleRef).length).to.equal(3);
  });
  it("amends the 'created_by' key and renames to 'author'", () => {
    const input = [
      {
        body: "Lobster pot",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1322138163389,
      },
    ];
    const articleRef = { "Living in the shadow of a great man": 1 };
    expect(formatComments(input, articleRef)[0]).to.have.property("author");
    expect(formatComments(input, articleRef)[0]).to.not.have.property(
      "created_by"
    );
  });
  it("contains an article_id key instead of a belongs_to key", () => {
    const input = [
      {
        body: "Lobster pot",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1322138163389,
      },
    ];
    const articleRef = { "Living in the shadow of a great man": 1 };
    expect(formatComments(input, articleRef)[0]).to.have.property("article_id");
    expect(formatComments(input, articleRef)[0]).to.not.have.property(
      "belongs_to"
    );
  });
  it("has an article id number instead of an article title under the article_id key", () => {
    const input = [
      {
        body: "Lobster pot",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1322138163389,
      },
    ];
    const articleRef = { "Living in the shadow of a great man": 1 };
    expect(formatComments(input, articleRef)[0].article_id).to.equal(1);
  });
  it(" has a correctly Date formatted created_at timestamp", () => {
    const input = [
      {
        body: "Lobster pot",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1322138163389,
      },
    ];
    const articleRef = { "Living in the shadow of a great man": 1 };
    expect(formatComments(input, articleRef)[0].created_at).to.be.a("date");
  });
});
