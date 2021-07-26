const createOneCourseResponseEnum = require("../enums/courseEnums/createOneCourseResponseEnum");
module.exports = {
  validate(
    name,
    title,
    sub_description,
    description,
    image,
    price,
    category,
    author,
    promote,
    language
  ) {
    if (name == null || name == "") {
      return {
        Code: createOneCourseResponseEnum.NAME_IS_EMPTY,
        Isuccess: false,
      };
    }
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
    if (description == null || description == "") {
      return {
        Code: createOneCourseResponseEnum.DESCRIPTION_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (image == null || image == "") {
      return {
        Code: createOneCourseResponseEnum.IMAGE_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (price == null || price == "") {
      return {
        Code: createOneCourseResponseEnum.PRICE_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (category == null || category == "") {
      return {
        Code: createOneCourseResponseEnum.CATEGORY_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (author == null || author == "") {
      return {
        Code: createOneCourseResponseEnum.AUTHOR_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (promote == null || promote == "") {
      return {
        Code: createOneCourseResponseEnum.PROMOTE_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (language == null || language == "") {
      return {
        Code: createOneCourseResponseEnum.LANGUAGE_IS_EMPTY,
        Isuccess: false,
      };
    }
    console.log(typeof price);
    if (typeof price != "number") {
      return {
        Code: createOneCourseResponseEnum.PRICE_IS_INVALID,
        Isuccess: false,
      };
    }
    return { Code: createOneCourseResponseEnum.SUCCESS, Isuccess: true };
  },
};
