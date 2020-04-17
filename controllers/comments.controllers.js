const { postCommentModel } = require("../models/comments.models");

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { author } = req.body;
  const { body } = req.body;
  postCommentModel(article_id, author, body)
    .then(([comment]) => {
      res.status(201).send(comment);
    })
    .catch(next);
};
