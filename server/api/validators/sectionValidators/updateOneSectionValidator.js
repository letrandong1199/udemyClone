const updateOneSectionEnum = require("../enums/sectionEnums/createOneSectionResponse");
module.exports = {
  validate(name, course_id) {
    if (name == null || name == "") {
      return {
        Code: updateOneSectionEnum.SECTION_NAME_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (course_id == null || course_id == "") {
      return {
        Code: updateOneSectionEnum.COURSE_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    return {
      Code: updateOneSectionEnum.SUCCESS,
      Isuccess: true,
    };
  },
};
