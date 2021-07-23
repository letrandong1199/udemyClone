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
    })
    .createTable("Categories", function (table) {
      table.increments("Id").primary();
      table.string("Name").notNullable();
    })
    .createTable("Languages", function (table) {
      table.increments("Id").primary();
      table.string("Name").notNullable();
    })
    .createTable("Promotes", function (table) {
      table.increments("Id").primary();
      table.float("Promote").notNullable().defaultTo(0.5);
      table.timestamp("Start_Time").notNullable().defaultTo(knex.fn.now());
      table.timestamp("End_Time");
    })

    .createTable("Courses", function (table) {
      table.increments("Id").primary();
      table.string("Name").notNullable();
      table.string("Title").notNullable();
      table.text("Sub_Description").notNullable().defaultTo("Sub Description");
      table.text("Description").notNullable().defaultTo("Description");
      table.boolean("Is_Completed").notNullable().defaultTo(false);
      table.string("Image").notNullable();
      table.float("Price").notNullable().defaultTo(0.0);
      table
        .integer("Category_Id")
        .unsigned()
        .references("Id")
        .inTable("Categories");
      table.integer("Author_Id").unsigned().references("Id").inTable("Users");
      table
        .integer("Promote_Id")
        .unsigned()
        .references("Id")
        .inTable("Promotes");
      table
        .integer("Language_Id")
        .unsigned()
        .references("Id")
        .inTable("Languages");
      table.timestamp("last_update").defaultTo(knex.fn.now());
    })

    .createTable("Sections", function (table) {
      table.increments("Id").primary();
      table.text("Name").notNullable().defaultTo("Section 1");
      table.integer("Course_Id").unsigned().references("Id").inTable("Courses");
    })
    .createTable("Lectures", function (table) {
      table.increments("Id").primary();
      table.string("Title").notNullable();
      table.text("Description").notNullable().defaultTo("Description");
      table
        .integer("Section_Id")
        .unsigned()
        .references("Id")
        .inTable("Sections");
    })
    .createTable("Watch_Lists", function (table) {
      table.increments("Id").primary();
      table.integer("User_Id").unsigned().references("Id").inTable("Users");
      table.integer("Course_Id").unsigned().references("Id").inTable("Courses");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("Users")
    .dropTable("Role")
    .dropTable("Categories")
    .dropTable("Languages");
};
