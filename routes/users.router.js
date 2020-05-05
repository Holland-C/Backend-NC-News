const usersRouter = require("express").Router();
const {
  sendAllUsers,
  sendUserById,
} = require("../controllers/users.controllers");
const { handle405s } = require("../errors");

usersRouter.route("/").get(sendAllUsers).all(handle405s);

usersRouter.route("/:user").get(sendUserById).all(handle405s);

module.exports = usersRouter;
