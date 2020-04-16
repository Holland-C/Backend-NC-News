const usersRouter = require("express").Router();
const {
  sendAllUsers,
  sendUserById,
} = require("../controllers/users.controllers");

usersRouter.get("/", sendAllUsers);
usersRouter.get("/:user", sendUserById);

module.exports = usersRouter;
