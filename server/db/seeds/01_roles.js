exports.seed = function (knex) {
  // Deletes ALL existing entries
  console.log("seed roles");
  return knex("Role")
    .del()
    .then(function () {
      // Inserts seed entries
      return (
        knex("Role")
          // .returning("Id")
          .insert([
            {
              // Id: 1,
              Name: "Admin",
            },
            {
              //Id: 2,
              Name: "Instructor",
            },
            {
              // Id: 3,
              Name: "User",
            },
          ])
      );
    });
};
