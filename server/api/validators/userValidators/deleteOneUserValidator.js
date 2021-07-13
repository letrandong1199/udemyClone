const deleteOneUserResponseEnum = require("../enums/userEnums/deleteOneUserResponseEnum");
module.exports = deleteOneUserValidator = {
  validate(email) {
    if (email == null || email == "") {
      return {
        Code: deleteOneUserResponseEnum.EMAIL_IS_EMPTY,
        IsSuccess: false,
      };
    }
    return { Code: deleteOneUserResponseEnum.SUCCESS, IsSuccess: true };
  },
};
