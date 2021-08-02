const getOneCourseResponseEnum = require("../enums/courseEnums/getOneCourseResponseEnum");
module.exports = getOneCourseValidator = {
  validate(id) {
    if (id == null || id == "") {
      return { Code: getOneCourseResponseEnum.ID_IS_EMPTY, IsSuccess: false };
    }
    return { Code: getOneCourseResponseEnum.SUCCESS, IsSuccess: true };
  },
};
