const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const sectionRepository = {
  getSectionByName(name) {
    return db("Sections")
      .where("Name", name)
      .catch(() => operatorType.FAIL.READ);
  },
  getSectionByCourseId(course_id) {
    return db("Sections")
      .where("Course_Id", course_id)
      .catch(() => operatorType.FAIL.READ);
  },
};
module.exports = sectionRepository;
