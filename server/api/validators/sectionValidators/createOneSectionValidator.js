const createOneSectionEnum = require("../enums/sectionEnums/createOneSectionResponse");
module.exports = {
  validate(name) {
    if (name == null || name == "") {
      return {
        Code: createOneSectionEnum.SECTION_NAME_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (course_id == null || course_id == "") {
      return {
        Code: createOneSectionEnum.COURSE_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    return {
      Code: createOneSectionEnum.SUCCESS,
      Isuccess: true,
    };
  },
};
