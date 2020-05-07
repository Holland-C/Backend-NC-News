const {
  getAllArticles,
  getSingleArticle,
  updateArticleVotes,
} = require("../models/articles.models");

exports.sendAllArticles = (req, res, next) => {
  const { author, topic, sort_by, order } = req.query;

  getAllArticles({ author, topic, sort_by, order })
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.sendArticleById = (req, res, next) => {
  const { article_id } = req.params;
  getSingleArticle({ article_id })
    .then((article) => {
      if (article === undefined)
        return Promise.reject({ status: 404, msg: "Not found" });

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
