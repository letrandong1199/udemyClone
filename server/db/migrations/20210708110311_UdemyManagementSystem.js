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
      table.integer("Role_Id").unsigned().references("Id").inTable("Role");
      table.timestamp("Created_At").defaultTo(knex.fn.now());
      table.timestamp("Updated_At").defaultTo(knex.fn.now());
    })
    .createTable("Categories", function (table) {
      table.increments("Id").primary();
      table.string("Name").notNullable();
      table.integer("Parent_Id").unsigned().references("Id").inTable("Categories");
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
      table.string("Title").notNullable();
      table.text("Sub_Description").notNullable().defaultTo("Sub Description");
      table.text("Description").notNullable().defaultTo("Description");
      table.boolean("Is_Completed").notNullable().defaultTo(false);
      table.string("Thumbnail_Small").notNullable();
      table.string("Thumbnail_Medium").notNullable();
      table.string("Thumbnail_Large").notNullable();
      table.float("Price").notNullable().defaultTo(0.0);
      table.float("Rating")
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
      table.timestamp("Update_At").defaultTo(knex.fn.now());
      table.timestamp("Create_At").defaultTo(knex.fn.now());
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
    .createTable("Media", function (table) {
      table.increments("Id").primary();
      table.integer("Lecture_Id").unsigned().references("Id").inTable("Lectures");
      table.string("Video_URL");
    })
    .createTable("Enrolled_Courses", function (table) {
      table.integer("User_Id").unsigned().references("Id").inTable("Users");
      table.integer("Course_Id").unsigned().references("Id").inTable("Courses");
      table.float("Rating").defaultTo(0.0);
      table.primary("User_Id", "Course_Id");
    })

    .createTable("Feedbacks", function (table) {
      table.increments("Id").primary();
      table.integer("User_Id").unsigned().references("Id").inTable("Users");
      table.integer("Course_Id").unsigned().references("Id").inTable("Courses")
      table.text("Content");
    })
    .createTable("Media_User", function (table) {
      table.integer("Media_Id").unsigned().references("Id").inTable("Media");
      table.integer("User_Id").unsigned().references("Id").inTable("Users");
      table.primary("Media_Id", "User_Id");
    })
    .createTable("Watch_Lists", function (table) {
      table.increments("Id").primary();
      table.integer("User_Id").unsigned().references("Id").inTable("Users");
      table.integer("Course_Id").unsigned().references("Id").inTable("Courses");
    })
    .then(function (table) {

      const trigFunc = "CREATE OR REPLACE FUNCTION calculate_avg_ratings()\nRETURNS trigger AS $calculate_avg_ratings$\nBEGIN\nUPDATE Courses \nSET Rating (SELECT AVG(Rating)\nFROM Enrolled_Courses\nWHERE Course_Id = NEW.Course_Id)\nWHERE Id = NEW.Course_Id;\nRETURN NEW;\nEND;\n$calculate_avg_ratings$ LANGUAGE plpgsql; ";

      knex.raw(trigFunc)
        .then(function (response) {

          var trigger = "CREATE TRIGGER calAvgRating\nAFTER INSERT OR UPDATE\nON Enrolled_Courses FOR EACH ROW EXECUTE PROCEDURE calculate_avg_ratings();";

          knex.raw(trigger)
            .then(function (response) {
              console.log('defined rating trigger');
            });
        });
    })

};

exports.down = function (knex) {
  return knex.schema
    .dropTable("Users")
    .dropTable("Role")
    .dropTable("Categories")
    .dropTable("Languages");
};
