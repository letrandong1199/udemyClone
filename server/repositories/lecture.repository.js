const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const lectureRepository = {
  getLectureByTitle(title) {
    return db("Lectures")
      .where("Title", title)
      .catch(() => operatorType.FAIL.READ);
  },
  getLectureBySectionId(section_id) {
    return db("Lectures")
      .where("Section_Id", section_id)
      .catch(() => operatorType.FAIL.READ);
  },
};
module.exports = lectureRepository;
