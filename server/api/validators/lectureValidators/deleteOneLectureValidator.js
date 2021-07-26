const deleteOneLectureResponseEnum = require("../enums/lectureEnums/deleteOneLectureResponseEnum");
module.exports = deleteOneLectureValidator = {
  validate(id, section_id) {
    if (id == null || id == "") {
      return {
        Code: deleteOneLectureResponseEnum.LECTURE_ID_IS_EMPTY,
        IsSuccess: false,
      };
    }
    if (section_id == null || section_id == "") {
      return {
        Code: deleteOneLectureResponseEnum.SECTION_ID_IS_EMPTY,
        IsSuccess: false,
      };
    }
    return { Code: deleteOneLectureResponseEnum.SUCCESS, IsSuccess: true };
  },
};
