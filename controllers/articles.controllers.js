const { getAllArticles } = require("../models/articles.models");

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
