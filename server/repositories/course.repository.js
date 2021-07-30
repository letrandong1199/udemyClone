const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const categoryRepository = require("./category.repository");
const courseRepository = {
  getCourseByQuery(query, paging, search, sort) {
    console.log(query, paging, search.category);
    return db("Courses")
      .where((qb) => {
        for (const [key, value] of Object.entries(query)) {
          qb.whereIn(key, value);
        }
      })
      .where("Title", "like", `%${search.search}%`)
      .orWhereIn("Category_Id", search.category)
      .orderBy(sort.ColName, sort.OrderBy)
      .limit(paging.limit)
      .offset(paging.offset)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
  getCountCourses(query) {
    return db("Courses")
      .where((qb) => {
        for (const [key, value] of Object.entries(query)) {
          qb.whereIn(key, value);
        }
      })
      .count("Id", { as: "Count" })
      .first();
  },

  getCourseByTitle(title) {
    return db("Courses")
      .where("Title", title)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
  getCourseByAuthorAndCourseId(author_id) {
    return db(Courses)
      .where("Author_Id", author_id)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
};
module.exports = courseRepository;
