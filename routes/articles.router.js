const articlesRouter = require("express").Router({ mergeParams: true });
const commentsRouter = require("./comments.router");
const {
  sendAllArticles,
  sendArticleById,
  patchArticleById,
} = require("../controllers/articles.controllers");

articlesRouter.route("/").get(sendAllArticles);
articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(patchArticleById);
articlesRouter.use("/:article_id/comments", commentsRouter);

module.exports = articlesRouter;
