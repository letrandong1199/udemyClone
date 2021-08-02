exports.seed = function (knex) {
  // Deletes ALL existing entries
  console.log("seed categories");
  return knex("Categories")
    .del()
    .then(async function () {
      return (
        knex("Categories")
          // .returning("Id")
          .insert([
            {
              //'Id': 1,
              Name: "Development",
              Parent_Id: null,
            },
            {
              //'Id': 2,
              Name: "Design",
              Parent_Id: null,
            },
            {
              //'Id': 3,
              Name: "Web Development",
              Parent_Id: 1,
            },
            {
              //'Id': 4,
              Name: "Mobile Development",
              Parent_Id: 1,
            },
            {
              //'Id': 5,
              Name: "Data Science",
              Parent_Id: 1,
            },
            {
              // 'Id': 6,
              Name: "Web Design",
              Parent_Id: 2,
            },
            {
              // 'Id': 7,
              Name: "Graphic design and Illustration",
              Parent_Id: 2,
            },
            {
              // 'Id': 8,
              Name: "Design Thinking",
              Parent_Id: 2,
            },
          ])
      );
    });
};
