exports.seed = function (knex) {
  // Deletes ALL existing entries
  console.log("seed languages");
  return createLanguages(knex);
};

function createLanguages(knex) {
  return knex("Languages")
    .del()
    .then(function () {
      return (
        knex("Languages")
          // .returning("Id")
          .insert([
            {
              //'Id': 1,
              Name: "English",
            },
            {
              // 'Id': 2,
              Name: "Indian",
            },
            {
              // 'Id': 3,
              Name: "France",
            },
            {
              // 'Id': 4,
              Name: "Vietnamese",
            },
            {
              // 'Id': 5,
              Name: "日本語",
            },
          ])
      );
    });
}
