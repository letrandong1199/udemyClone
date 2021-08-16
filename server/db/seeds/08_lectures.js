const lectures = require('./json/lectures');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  console.log("seed lectures");
  return createLectures(knex);
};

function createLectures(knex) {
  return knex("Lectures")
    .del()
    .then(function () {
      return (
        knex("Lectures")
          //.returning("Id")
          .insert(lectures)
      );
    });
}
