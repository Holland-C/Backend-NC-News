const { getAllTopics } = require("../models/topics.models");

exports.sendAllTopics = (req, res) => {
  getAllTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};
