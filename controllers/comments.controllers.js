const {
  postCommentModel,
  getAllComments,
  patchCommentVotesModel,
  deleteComment,
} = require("../models/comments.models");

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { author, body } = req.body;
  postCommentModel(article_id, author, body)
    .then(([comment]) => {
      res.status(201).send({ comment });
      console.log(comment.author);
    })
    .catch(next);
};
exports.sendAllComments = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  getAllComments(article_id, sort_by, order)
    .then((comments) => {
      if (comments.length === 0)
        return Promise.reject({ status: 404, msg: "Not found" });
      res.status(200).send({ comments });
    })
    .catch(next);
};
exports.patchCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  patchCommentVotesModel(comment_id, inc_votes)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
