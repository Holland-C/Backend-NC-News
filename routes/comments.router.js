const commentsRouter = require("express").Router();
const {
  patchCommentVotes,
  deleteCommentById,
} = require("../controllers/comments.controllers");
const { handle405s } = require("../errors");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentVotes)
  .delete(deleteCommentById)
  .all(handle405s);

module.exports = commentsRouter;
