const connection = require("../db/connection");

exports.postCommentModel = (article_id, username, body) => {
  return connection("comments")
    .insert({ article_id: article_id, author: username, body: body })
    .returning("*");
};

const checkArticleExists = (article_id) => {
  return connection("articles")
    .select("*")
    .where({ article_id })
    .then((articlesArray) => {
      if (articlesArray.length === 0) return false;
      return true;
    });
};

exports.getAllComments = (
  article_id,
  sort_by = "created_at",
  order = "desc"
) => {
  return connection("comments")
    .select("*")
    .from("comments")
    .where({ article_id })
    .orderBy(sort_by, order)
    .then((comments) => {
      return Promise.all([comments, checkArticleExists(article_id)]);
    })
    .then(([comments, articleExists]) => {
      if (articleExists) {
        return comments;
      }
      return Promise.reject({ status: 404, msg: "Not found" });
    });
};

exports.patchCommentVotesModel = (comment_id, inc_votes) => {
  return connection("comments")
    .increment("votes", inc_votes || 0)
    .where({ comment_id })
    .returning("*")
    .then((array) => {
      if (array.length === 0)
        return Promise.reject({ status: 404, msg: "Not found" });
      return array[0];
    });
};

exports.deleteComment = (comment_id) => {
  return connection("comments")
    .del()
    .where({ comment_id })
    .then((delSuccess) => {
      if (delSuccess === 0)
        return Promise.reject({ status: 404, msg: "Not found" });
      return [];
    });
};
