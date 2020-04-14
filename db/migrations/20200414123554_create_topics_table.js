exports.up = function (knex) {
  console.log("creating topics table");
  return knex.schema.createTable("topics", (topicTable) => {
    topicTable.text("slug").primary();
    topicTable.text("description");
  });
};

exports.down = function (knex) {
  console.log("rolling back topics table");
  return knex.schema.dropTable("topics");
};
