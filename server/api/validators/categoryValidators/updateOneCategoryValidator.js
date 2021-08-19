const updateOneCategoryResponseEnum = require("../enums/categoryEnums/updateOneCategoryResponseEnum");
module.exports = updateOneCategoryValidator = {
  validate(id, name) {
    if (id == null || id == "") {
      return {
        Code: updateOneCategoryResponseEnum.ID_IS_EMPTY,
        IsSuccess: false,
      };
    }
    if (name == "") {
      return {
        Code: updateOneCategoryResponseEnum.CATEGORY_NAME_IS_EMPTY,
        IsSuccess: false,
      };
    }
    return { Code: updateOneCategoryResponseEnum.SUCCESS, IsSuccess: true };
  },
};
