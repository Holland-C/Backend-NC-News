exports.up = function (knex) {
  return knex.schema.createTable("users", (userTable) => {
    userTable.text("username").primary().unique();
    userTable.text("avatar_url").notNullable();
    userTable.text("name").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
