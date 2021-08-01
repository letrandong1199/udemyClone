const updateOneLectureResponseEnum = require("../enums/lectureEnums/updateOneLectureResponseEnum");
module.exports = {
  validate(section_id, title, description, id) {
    if (title == null || title == "") {
      return {
        Code: updateOneLectureResponseEnum.LECTURE_TITLE_IS_EMPTY,
        Isuccess: false,
      };
    }
    /*
if (description == null || description == "") {
  return {
    Code: updateOneLectureResponseEnum.LECTURE_DESCRIPTION_IS_EMPTY,
    Isuccess: false,
  };
}*/
    if (section_id == null || section_id == "") {
      return {
        Code: updateOneLectureResponseEnum.SECTION_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (id == null || id == "") {
      return {
        Code: updateOneLectureResponseEnum.LECTURE_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    return {
      Code: updateOneLectureResponseEnum.SUCCESS,
      Isuccess: true,
    };
  },
};
