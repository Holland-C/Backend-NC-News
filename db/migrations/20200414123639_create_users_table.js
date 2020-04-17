exports.up = function (knex) {
  return knex.schema.createTable("users", (userTable) => {
    userTable.text("username").primary().unique();
    userTable.text("avatar_url");
    userTable.text("name");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
