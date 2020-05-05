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
const { handle405s } = require("../errors");

articlesRouter.route("/").get(sendAllArticles).all(handle405s);
articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(patchArticleById)
  .all(handle405s);
articlesRouter
  .route("/:article_id/comments")
  .get(sendAllComments)
  .post(postComment)
  .all(handle405s);

module.exports = articlesRouter;
