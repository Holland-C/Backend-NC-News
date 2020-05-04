const articlesRouter = require("express").Router({ mergeParams: true });
const {
  sendAllArticles,
  sendArticleById,
  patchArticleById,
} = require("../controllers/articles.controllers");
const {
  sendAllComments,
  postComment,
} = require("../controllers/comments.controllers");

articlesRouter.route("/").get(sendAllArticles);
articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(patchArticleById);
articlesRouter
  .route("/:article_id/comments")
  .get(sendAllComments)
  .post(postComment);

module.exports = articlesRouter;
