exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Role")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Role").insert([{ Name: "User" }, { Name: "Admin" }]);
    })
    .then(function () {
      return knex("Categories").insert([
        { Name: "Web Development" },
        { Name: "Mobile Development" },
      ]);
    })
    .then(function () {
      return knex("Languages").insert([
        { Name: "English" },
        { Name: "Indian" },
        { Name: "France" },
      ]);
    });
};
