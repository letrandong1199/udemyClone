const deleteOneUserResponseEnum = require("../enums/userEnums/deleteOneUserResponseEnum");
module.exports = deleteOneUserValidator = {
  validate(id) {
    if (id == null || id == "") {
      return {
        Code: deleteOneUserResponseEnum.ID_IS_EMPTY,
        IsSuccess: false,
      };
    }
    return { Code: deleteOneUserResponseEnum.SUCCESS, IsSuccess: true };
  },
};
