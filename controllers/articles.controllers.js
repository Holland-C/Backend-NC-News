const {
  getAllArticles,
  updateArticleVotes,
} = require("../models/articles.models");

exports.sendAllArticles = (req, res, next) => {
  getAllArticles(req.query)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.sendArticleById = (req, res, next) => {
  const { article_id } = req.params;
  getAllArticles({ article_id })
    .then((article) => {
      if (article.length === 0)
        return Promise.reject({ status: 404, msg: "Not found" });
      const flattenedArticle = [article];
      res.send({ flattenedArticle });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleVotes(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
