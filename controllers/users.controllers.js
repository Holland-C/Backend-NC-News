const { getAllUsers } = require("../models/users.models");

exports.sendAllUsers = (req, res, next) => {
  getAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.sendUserById = (req, res, next) => {
  const { user_id } = req.params;
  getAllUsers({ user_id })
    .then(([user]) => {
      res.send({ user });
    })
    .catch(next);
};
