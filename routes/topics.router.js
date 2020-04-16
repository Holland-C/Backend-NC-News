const topicsRouter = require("express").Router();
const { sendAllTopics } = require("../controllers/topics.controllers");

topicsRouter.get("/", sendAllTopics);

module.exports = topicsRouter;
