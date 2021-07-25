const createOneSectionResponseEnum = require("../enums/sectionEnums/createOneSectionResponseEnum");
module.exports = {
  validate(name, course_id) {
    if (name == null || name == "") {
      return {
        Code: createOneSectionResponseEnum.SECTION_NAME_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (course_id == null || course_id == "") {
      return {
        Code: createOneSectionResponseEnum.COURSE_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    return {
      Code: createOneSectionResponseEnum.SUCCESS,
      Isuccess: true,
    };
  },
};
