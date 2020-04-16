exports.up = function (knex) {
  // console.log("creating users table");
  return knex.schema.createTable("users", (userTable) => {
    userTable.text("username").primary().unique();
    userTable.text("avatar_url");
    userTable.text("name");
  });
};

exports.down = function (knex) {
  // console.log("rolling back users table");
  return knex.schema.dropTable("users");
};
