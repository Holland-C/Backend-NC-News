const commentsRouter = require("express").Router();
const { postComment } = require("../controllers/comments.controllers.js");

commentsRouter.route("/").post(postComment);

module.exports = commentsRouter;
