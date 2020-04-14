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

describe("makeRefObj", () => {});

describe("formatComments", () => {});
