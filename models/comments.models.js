const connection = require("../db/connection");

exports.postCommentModel = (article_id, author, body) => {
  return connection("comments")
    .insert({ article_id: article_id, author: author, body: body })
    .returning("*");
};
