exports.up = function (knex) {
  return knex.schema
    .createTable("Role", function (table) {
      table.increments("Id").primary();
      table.string("Name").notNullable();
    })
    .createTable("Users", function (table) {
      table.increments("Id").primary();
      table.string("Email").notNullable();
      table.string("Full_Name").notNullable();
      table.string("Password").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table
        .integer("Role_Id")
        .unsigned()
        .references("Id")
        .inTable("Role")
        .defaultTo(1);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Users").dropTable("Role");
};
