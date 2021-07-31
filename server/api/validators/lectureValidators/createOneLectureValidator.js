const createOneLectureResponseEnum = require("../enums/lectureEnums/createOneLectureResponseEnum");
module.exports = {
  validate(title, description, section_id) {
    if (title == null || title == "") {
      return {
        Code: createOneLectureResponseEnum.LECTURE_TITLE_IS_EMPTY,
        Isuccess: false,
      };
    }
    /*
    if (description == null || description == "") {
      return {
        Code: createOneLectureResponseEnum.LECTURE_DESCRIPTION_IS_EMPTY,
        Isuccess: false,
      };
    }*/
    if (section_id == null || section_id == "") {
      return {
        Code: createOneLectureResponseEnum.SECTION_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    return {
      Code: createOneLectureResponseEnum.SUCCESS,
      Isuccess: true,
    };
  },
};
