exports.up = function (knex) {
  return knex.schema
    .createTable("Users", function (table) {
      table.increments();
      table.string("Email").notNullable().primary();
      table.string("Full_Name").notNullable();
      table.string("Password").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.integer("Role_Id").references("Id").inTable("Role");
    })
    .createTable("Role", function (table) {
      table.increments("Id").primary();
      table.string("Name").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Users").dropTable("Role");
};
