const connection = require("../db/connection");

exports.getAllArticles = ({
  article_id,
  sort_by = "created_at",
  order = "desc",
  topic,
  author,
}) => {
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .modify((articleQuery) => {
      if (topic) articleQuery.where({ topic });
    })
    .modify((articleQuery) => {
      if (author) articleQuery.where({ author });
    })
    .modify((articleQuery) => {
      if (article_id) articleQuery.where({ "articles.article_id": article_id });
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
