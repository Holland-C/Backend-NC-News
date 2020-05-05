const topicsRouter = require("express").Router();
const { sendAllTopics } = require("../controllers/topics.controllers");
const { handle405s } = require("../errors");

topicsRouter.route("/").get(sendAllTopics).all(handle405s);

module.exports = topicsRouter;
