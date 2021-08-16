const sections = require('./json/sections');
exports.seed = function (knex) {
  // Deletes ALL existing entries
  console.log("seed sections");
  return createSections(knex);
};

function createSections(knex) {
  return knex("Sections")
    .del()
    .then(function () {
      return (
        knex("Sections")
          // .returning("Id")
          .insert(sections)
      );
    });
}
