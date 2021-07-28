const getMediaByLectureResponseEnum = require("../enums/mediaEnums/getMediaByLectureResponseEnum");
module.exports = {
  validate(lecture_id) {
    if (lecture_id == null || lecture_id == "") {
      return {
        Code: getMediaByLectureResponseEnum.LECTURE_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    return { Code: getMediaByLectureResponseEnum.SUCCESS, Isuccess: true };
  },
};
