const connection = require("../db/connection");

const checkAuthorExists = (author) => {
  if (!author) return true;
  else {
    return connection("users")
      .select("*")
      .where({ username: author })
      .then((usersArray) => {
        if (usersArray.length === 0) return false;
        return true;
      });
  }
};

const checkTopicExists = (topic) => {
  if (!topic) return true;
  else {
    return connection("topics")
      .select("*")
      .where({ slug: topic })
      .then((topicsArray) => {
        if (topicsArray.length === 0) return false;
        return true;
      });
  }
};

exports.getAllArticles = ({
  author,
  topic,
  sort_by = "created_at",
  order = "desc",
}) => {
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .modify((query) => {
      if (topic) query.where({ topic });
      if (author) query.where({ "articles.author": author });
    })
    .then((articles) => {
      return Promise.all([
        articles,
        checkAuthorExists(author),
        checkTopicExists(topic),
      ]);
    })
    .then(([articles, authorExists, topicExists]) => {
      if (authorExists && topicExists) {
        return articles;
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    });
};
exports.getSingleArticle = ({ article_id }) => {
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .where({ "articles.article_id": article_id })
    .then((array) => {
      return array[0];
    });
};

exports.updateArticleVotes = (article_id, inc_votes) => {
  return connection("articles")
    .increment("votes", inc_votes || 0)
    .where({ article_id })
    .returning("*")
    .then((array) => {
      return array[0];
    });
};
