const { getAllUsers } = require("../models/users.models");

exports.sendAllUsers = (req, res, next) => {
  getAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.sendUserById = (req, res, next) => {
  const { user } = req.params;
  getAllUsers(user)
    .then(([user]) => {
      res.send({ user });
    })
    .catch(next);
};
