const {
  getAllArticles,
  updateArticleVotes,
} = require("../models/articles.models");

exports.sendAllArticles = (req, res, next) => {
  getAllArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.sendArticleById = (req, res, next) => {
  const { article_id } = req.params;
  getAllArticles({ article_id })
    .then(([article]) => {
      res.send({ article });
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
