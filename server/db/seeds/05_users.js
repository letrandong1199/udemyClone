const users = require("./json/users");
exports.seed = function (knex) {
  // Deletes ALL existing entries
  console.log("seed users");
  return createUsers(knex);
}

function createUsers(knex) {
  return knex("Users")
    .del()
    .then(function () {
      return (
        knex("Users")
          //.returning("Id")
          .insert(users)
      );
    });
}
