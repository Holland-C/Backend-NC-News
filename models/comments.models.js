const connection = require("../db/connection");

exports.postCommentModel = (article_id, author, body) => {
  return connection("comments")
    .insert({ article_id: article_id, author: author, body: body })
    .returning("*");
};

exports.getAllComments = (article_id) => {
  return connection("comments")
    .select("*")
    .from("comments")
    .where({ article_id });
};
