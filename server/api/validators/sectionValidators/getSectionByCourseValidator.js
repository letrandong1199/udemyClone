const getSectionByCourse = require("../enums/sectionEnums/getSectionByCourseResponseEnum");
module.exports = {
  validate(course_id) {
    if (course_id == null || course_id == "") {
      return { Code: getSectionByCourse.COURSE_ID_IS_EMPTY, Isuccess: false };
    }
    return { Code: getSectionByCourse.SUCCESS, Isuccess: true };
  },
};
