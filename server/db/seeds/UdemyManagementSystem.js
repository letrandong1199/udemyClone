exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Role")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Role").insert([{ Name: "Admin" }]);
    });
};
