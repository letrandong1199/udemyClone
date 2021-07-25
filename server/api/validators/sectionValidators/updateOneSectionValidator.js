const updateOneSectionResponseEnum = require("../enums/sectionEnums/updateOneSectionResponseEnum");
module.exports = {
  validate(course_id, name, id) {
    if (name == null || name == "") {
      return {
        Code: updateOneSectionResponseEnum.SECTION_NAME_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (course_id == null || course_id == "") {
      return {
        Code: updateOneSectionResponseEnum.COURSE_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (id == null || id == "") {
      return {
        Code: updateOneSectionResponseEnum.SECTION_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    return {
      Code: updateOneSectionResponseEnum.SUCCESS,
      Isuccess: true,
    };
  },
};
