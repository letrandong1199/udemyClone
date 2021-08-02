const getLectureBySection = require("../enums/lectureEnums/getLectureBySectionResponseEnum");
module.exports = {
  validate(section_id) {
    if (section_id == null || section_id == "") {
      return { Code: getLectureBySection.SECTION_ID_IS_EMPTY, Isuccess: false };
    }
    return { Code: getLectureBySection.SUCCESS, Isuccess: true };
  },
};
