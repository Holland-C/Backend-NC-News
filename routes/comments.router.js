const commentsRouter = require("express").Router();
const {
  patchCommentVotes,
  deleteCommentById,
} = require("../controllers/comments.controllers");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentVotes)
  .delete(deleteCommentById);

module.exports = commentsRouter;
