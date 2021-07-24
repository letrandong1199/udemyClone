const updateOneCourseResponseEnum = require("../enums/courseEnums/updateOneCourseResponseEnum");
module.exports = {
  validate(
    name,
    title,
    sub_description,
    description,
    image,
    price,
    category,
    promote,
    language
  ) {
    if (name == null || name == "") {
      return {
        Code: updateOneCourseResponseEnum.NAME_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (title == null || title == "") {
      return {
        Code: updateOneCourseResponseEnum.TITLE_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (sub_description == null || sub_description == "") {
      return {
        Code: updateOneCourseResponseEnum.SUB_DESCRIPTION_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (description == null || description == "") {
      return {
        Code: updateOneCourseResponseEnum.DESCRIPTION_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (image == null || image == "") {
      return {
        Code: updateOneCourseResponseEnum.IMAGE_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (price == null || image == "") {
      return {
        Code: updateOneCourseResponseEnum.PRICE_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (category == null || category == "") {
      return {
        Code: updateOneCourseResponseEnum.CATEGORY_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (promote == null || promote == "") {
      return {
        Code: updateOneCourseResponseEnum.PROMOTE_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (language == null || language == "") {
      return {
        Code: updateOneCourseResponseEnum.LANGUAGE_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (typeof price != "number") {
      return {
        Code: updateOneCourseResponseEnum.PRICE_IS_INVALID,
        Isuccess: false,
      };
    }
    return { Code: updateOneCourseResponseEnum.SUCCESS, Isuccess: true };
  },
};
