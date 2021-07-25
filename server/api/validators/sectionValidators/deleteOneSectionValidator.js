const deleteOneSectionResponseEnum = require("../enums/sectionEnums/deleteOneSectionResponseEnum");
module.exports = deleteOneSectionValidator = {
  validate(id, course_id) {
    if (id == null || id == "") {
      return {
        Code: deleteOneSectionResponseEnum.SECTION_ID_IS_EMPTY,
        IsSuccess: false,
      };
    }
    if (course_id == null || course_id == "") {
      return {
        Code: deleteOneSectionResponseEnum.COURSE_ID_IS_EMPTY,
        IsSuccess: false,
      };
    }
    return { Code: deleteOneSectionResponseEnum.SUCCESS, IsSuccess: true };
  },
};
