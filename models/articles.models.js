const connection = require("../db/connection");

exports.getAllArticles = ({ sort_by, topic }) => {
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", "desc")
    .modify((articleQuery) => {
      if (topic) articleQuery.where({ topic });
    });
};

exports.updateArticleVotes = (article_id, inc_votes) => {
  return connection("articles")
    .increment("votes", inc_votes)
    .where({ article_id })
    .returning("*")
    .then((array) => {
      return array[0];
    });
};
