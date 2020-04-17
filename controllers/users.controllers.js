const { getAllUsers } = require("../models/users.models");

exports.sendAllUsers = (req, res, next) => {
  getAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.sendUserById = (req, res, next) => {
  const { username } = req.params;
  getAllUsers({ username })
    .then(([user]) => {
      res.send({ user });
    })
    .catch(next);
};
