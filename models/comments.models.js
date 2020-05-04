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

exports.patchCommentVotesModel = (comment_id, inc_votes) => {
  return connection("comments")
    .increment("votes", inc_votes)
    .where({ comment_id })
    .returning("*")
    .then((array) => {
      return array[0];
    });
};

exports.deleteComment = (comment_id) => {
  return connection("comments").del().where({ comment_id });
};
