const connection = require("../db/connection");

exports.getAllUsers = ({ username } = {}) => {
  return connection
    .select("*")
    .from("users")
    .modify((query) => {
      if (username) {
        query.where("username", username);
      }
    });
};
