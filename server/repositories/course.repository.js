const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const courseRepository = {
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
};
module.exports = courseRepository;
