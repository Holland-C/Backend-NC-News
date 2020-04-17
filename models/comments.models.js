const connection = require("../db/connection");

exports.postCommentModel = (article_id, username, body) => {
  return connection("comments")
    .insert({ article_id: article_id, username: username, body: body })
    .returning("*");
};
