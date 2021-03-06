exports.up = function (knex) {
  return knex.schema.createTable("topics", (topicTable) => {
    topicTable.text("slug").primary();
    topicTable.text("description").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("topics");
};
