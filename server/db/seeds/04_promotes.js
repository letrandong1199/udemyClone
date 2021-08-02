exports.seed = function (knex) {
  // Deletes ALL existing entries
  console.log("seed promotes");
  return createPromotes(knex);
};

function createPromotes(knex) {
  return knex("Promotes")
    .del()
    .then(function () {
      return (
        knex("Promotes")
          // .returning("Id")
          .insert([
            {
              //Id: 1,
              Promote: 0,
            },
          ])
      );
    });
}
