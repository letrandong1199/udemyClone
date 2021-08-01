const createOneCourseResponseEnum = require("../enums/courseEnums/createOneCourseResponseEnum");
module.exports = {
  validate(title, sub_description, category, language) {
    if (title == null || title == "") {
      return {
        Code: createOneCourseResponseEnum.TITLE_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (sub_description == null || sub_description == "") {
      return {
        Code: createOneCourseResponseEnum.SUB_DESCRIPTION_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (category == null || category == "") {
      return {
        Code: createOneCourseResponseEnum.CATEGORY_IS_EMPTY,
        Isuccess: false,
      };
    }
    // if (author == null || author == "") {
    //   return {
    //     Code: createOneCourseResponseEnum.AUTHOR_IS_EMPTY,
    //     Isuccess: false,
    //   };
    // }
    if (language == null || language == "") {
      return {
        Code: createOneCourseResponseEnum.LANGUAGE_IS_EMPTY,
        Isuccess: false,
      };
    }
    return { Code: createOneCourseResponseEnum.SUCCESS, Isuccess: true };
  },
};
