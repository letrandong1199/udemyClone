const courses = require('./json/courses');
exports.seed = function (knex) {
  // Deletes ALL existing entries
  console.log("seed courses");
  return createCourses(knex);
};

function createCourses(knex) {
  return knex("Courses")
    .del()
    .then(function () {
      return (
        knex("Courses")
          .returning("Id")
          .insert(courses)
      );
    });
}
