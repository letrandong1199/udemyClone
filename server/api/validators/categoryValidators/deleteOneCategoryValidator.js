const deleteOneCategoryResponseEnum = require("../enums/categoryEnums/deleteOneCategoryResponseEnum");
module.exports = deleteOneCategoryValidator = {
  validate(id) {
    if (id == null || id == "") {
      return {
        Code: deleteOneCategoryResponseEnum.ID_IS_EMPTY,
        IsSuccess: false,
      };
    }
    return { Code: deleteOneCategoryResponseEnum.SUCCESS, IsSuccess: true };
  },
};
