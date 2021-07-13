const createOneCategoryResponseEnum = require("../enums/categoryEnums/createOneCategoryResponseEnum");
const createOneCategoryValidator = {
  validate(name) {
    if (name == null || name == "") {
      return {
        Code: createOneCategoryResponseEnum.CATEGORY_NAME_IS_EMPTY,
        IsSuccess: false,
      };
    }
    return { Code: createOneCategoryResponseEnum.SUCCESS, IsSuccess: true };
  },
};
module.exports = createOneCategoryValidator;
