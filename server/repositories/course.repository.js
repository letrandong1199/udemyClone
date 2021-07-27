const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const courseRepository = {
  getCourseByQuery(query, paging) {
    return db("Courses").where(qb => {
      for (const [key, value] of Object.entries(query)) {
        qb.whereIn(key, value);
      }

    }).limit(paging.limit).offset(paging.offset)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
  getCourseByName(name) {
    return db("Courses")
      .where("Name", name)
      .catch(() => operatorType.FAIL.NOT_EXIST);
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
