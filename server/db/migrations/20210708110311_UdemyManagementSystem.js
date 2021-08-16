exports.up = function (knex) {
  return knex.schema
    .createTable("Role", function (table) {
      table.increments("Id").primary();
      table.string("Name").notNullable();
    })
    .createTable("Users", function (table) {
      table.increments("Id").primary();
      table.string("Email").notNullable();
      table.string("Name").notNullable();
      table.string("Password").notNullable();
      table.integer("Role_Id").unsigned().references("Id").inTable("Role");
      table.timestamp("Created_At").defaultTo(knex.fn.now());
      table.timestamp("Updated_At").defaultTo(knex.fn.now());
    })
    .createTable("Categories", function (table) {
      table.increments("Id").primary();
      table.string("Name").notNullable();
      table
        .integer("Parent_Id")
        .unsigned()
        .references("Id")
        .inTable("Categories");
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
      table.text("Description").defaultTo("");
      table.boolean("Is_Completed").notNullable().defaultTo(false);
      table.string("Thumbnail_Small").defaultTo("");
      table.string("Thumbnail_Medium").defaultTo("");
      table.string("Thumbnail_Large").defaultTo("");
      table.float("Price").defaultTo(0.0);
      table.float("Rating");
      table.integer("View").defaultTo(0);
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
      table.timestamp("Updated_At").defaultTo(knex.fn.now());
      table.timestamp("Created_At").defaultTo(knex.fn.now());
    })

    .createTable("Sections", function (table) {
      table.increments("Id").primary();
      table.text("Name").notNullable().defaultTo("Section 1");
      table.integer("Course_Id").unsigned().references("Id").inTable("Courses");
    })
    .createTable("Lectures", function (table) {
      table.increments("Id").primary();
      table.string("Title").notNullable();
      table.string("Duration");
      table.text("Description").notNullable().defaultTo("Description");
      table
        .integer("Section_Id")
        .unsigned()
        .references("Id")
        .inTable("Sections");
    })
    .createTable("Media", function (table) {
      table.increments("Id").primary();
      table
        .integer("Lecture_Id")
        .unsigned()
        .references("Id")
        .inTable("Lectures");
      table.string("Video_URL");
      table.boolean("Is_Preview").defaultTo(false);
      table.float("Duration");
    })

    .createTable("Feedbacks", function (table) {
      table.increments("Id").primary();
      table.integer("User_Id").unsigned().references("Id").inTable("Users");
      table.integer("Course_Id").unsigned().references("Id").inTable("Courses");
      table.text("Content");
      table.timestamp("Created_At").defaultTo(knex.fn.now());
      table.timestamp("Updated_At").defaultTo(knex.fn.now());
    })
    .createTable("Media_User", function (table) {
      table.integer("Media_Id").unsigned().references("Id").inTable("Media");
      table.integer("User_Id").unsigned().references("Id").inTable("Users");
      table.float("Played");
      table.primary(["Media_Id", "User_Id"]);
    })
    .createTable("Wishlists", function (table) {
      table.integer("User_Id").unsigned().references("Id").inTable("Users");
      table.integer("Course_Id").unsigned().references("Id").inTable("Courses");
      table.primary(["User_Id", "Course_Id"]);
    })
    .createTable("Enrolled_Courses", function (table) {
      table.integer("User_Id").unsigned().references("Id").inTable("Users");
      table.integer("Course_Id").unsigned().references("Id").inTable("Courses");
      table.float("Rating");
      table.timestamp("Enrolled_Date").defaultTo(knex.fn.now());
      table.primary(["User_Id", "Course_Id"]);
    })
    .createTable("Public_Information", function (table) {
      table.integer("User_Id").unsigned().references("Id").inTable("Users");
      table.text("Description").defaultTo("");
      table.primary("User_Id");
    })
    .then(function (table) {
      if (knex.client.config.client == "pg") {
        const trigFunc = `CREATE OR REPLACE FUNCTION calculate_avg_ratings() RETURNS trigger AS 
                          $BODY$ 
                          BEGIN 
                          UPDATE "Courses" 
                          SET "Rating"= (SELECT AVG("Rating") FROM "Enrolled_Courses" WHERE "Course_Id" = NEW."Course_Id")  
                          WHERE "Id" = NEW."Course_Id"; 
                          RETURN NEW;  
                          END; 
                          $BODY$ language plpgsql; `;

        knex.raw(trigFunc).then(function (response) {
          var trigger = `CREATE TRIGGER calAvgRating  
        AFTER INSERT OR UPDATE 
        ON "Enrolled_Courses" FOR EACH ROW EXECUTE PROCEDURE calculate_avg_ratings();`;

          knex.raw(trigger).then(function (response) {
            console.log("defined rating trigger");
          });
        });
      } else if (
        knex.client.config.client == "mysql" ||
        knex.client.config.client == "mysql2"
      ) {
        const triggerMysql = `CREATE TRIGGER calAvgRating AFTER INSERT ON enrolled_courses
                              FOR EACH ROW
                              UPDATE courses
                              SET Rating = (SELECT AVG(Rating) FROM enrolled_courses
                              WHERE Course_Id = NEW.Course_Id)  
                              WHERE Id = NEW.Course_Id; `;
        knex.raw(triggerMysql).then(function (response) {
          const triggerMysql_1 = `CREATE TRIGGER calAvgRating_1 AFTER UPDATE ON enrolled_courses
                              FOR EACH ROW
                              UPDATE courses
                              SET Rating = (SELECT AVG(Rating) FROM enrolled_courses
                              WHERE Course_Id = NEW.Course_Id)  
                              WHERE Id = NEW.Course_Id; `;
          knex.raw(triggerMysql_1).then(function (response) {
            console.log("defined rating trigger");
          });
        });
      }
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("Feedbacks")
    .dropTableIfExists("Public_Information")
    .dropTableIfExists("Enrolled_Courses")
    .dropTableIfExists("Media_User")
    .dropTableIfExists("Media")
    .dropTableIfExists("Lectures")
    .dropTableIfExists("Sections")
    .dropTableIfExists("Wishlists")
    .dropTableIfExists("Courses")
    .dropTableIfExists("Promotes")
    .dropTableIfExists("Users")
    .dropTableIfExists("Role")
    .dropTableIfExists("Categories")
    .dropTableIfExists("Languages");
};
