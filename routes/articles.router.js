const articlesRouter = require("express").Router();
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

module.exports = articlesRouter;
