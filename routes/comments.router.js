const commentsRouter = require("express").Router({ mergeParams: true });
const { postComment } = require("../controllers/comments.controllers.js");

commentsRouter.route("/").post(postComment);

module.exports = commentsRouter;
