const articlesRouter = require("express").Router();
const {
  sendAllArticles,
  sendArticleById,
} = require("../controllers/articles.controllers");

articlesRouter.get("/", sendAllArticles);
articlesRouter.get("/:article_id", sendArticleById);

module.exports = articlesRouter;
