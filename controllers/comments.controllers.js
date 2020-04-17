const { postCommentModel } = require("../models/comments.models");

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username } = req.body;
  const { body } = req.body;
  postCommentModel(article_id, username, body)
    .then((comment) => {
      res.status(201).send(comment);
    })
    .catch(next);
};
