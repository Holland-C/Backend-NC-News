const apiRouter = require("express").Router();
const topicsRouter = require("./topics.router");
const usersRouter = require("./users.router");
const articlesRouter = require("./articles.router");
const commentsRouter = require("./comments.router");
const { handle405s } = require("../errors");

apiRouter.use("/topics", topicsRouter).all(handle405s);
apiRouter.use("/users", usersRouter).all(handle405s);
apiRouter.use("/articles", articlesRouter).all(handle405s);
apiRouter.use("/comments", commentsRouter).all(handle405s);

module.exports = apiRouter;
