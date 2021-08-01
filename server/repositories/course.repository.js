const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const categoryRepository = require("./category.repository");
const courseRepository = {
  getCourseByQuery(query, paging, search, sort) {
    let filtered = db("Courses");
    for (const [key, value] of Object.entries(query)) {
      filtered = filtered.whereIn(key, value);
    }

    if (
      search != undefined &&
      search != null &&
      (search.search || search.category)
    ) {
      filtered = filtered
        .where("Title", "like", `%${search.search}%`)
        .orWhereIn("Category_Id", search.category);
    }

    if (sort && sort.ColName && sort.OrderBy) {
      filtered = filtered.orderBy(sort.ColName, sort.OrderBy);
    }
    if (paging && paging.limit != null && paging.offset != null) {
      filtered = filtered.limit(paging.limit).offset(paging.offset);
    }
    filtered = filtered.where("Is_Completed", true);
    console.log(filtered.toSQL().toNative());
    return filtered.catch(() => operatorType.FAIL.NOT_EXIST);
  },
  getCountCourses(query, search, sort) {
    let filtered = db("Courses").where((qb) => {
      for (const [key, value] of Object.entries(query)) {
        qb.whereIn(key, value);
      }
    });
    if (
      search != undefined &&
      search != null &&
      (search.search || search.category)
    ) {
      filtered = filtered
        .where("Title", "like", `%${search.search}%`)
        .orWhereIn("Category_Id", search.category);
    }

    if (sort && sort.ColName && sort.OrderBy) {
      filtered = filtered.orderBy(sort.ColName, sort.OrderBy);
    }
    filtered = filtered.where("Is_Completed", true);
    return filtered.count("Id", { as: "Count" }).first();
  },

  getCourseByTitle(title) {
    return db("Courses")
      .where("Title", title)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
  getCourseByCategoryId(category_id) {
    return db("Courses")
      .where("Category_Id", category_id)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
};
module.exports = courseRepository;
