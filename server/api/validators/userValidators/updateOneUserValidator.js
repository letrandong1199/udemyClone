const updateOneUserResponseEnum = require("../enums/userEnums/updateOneUserResponseEnum");
module.exports = updateOneUserValidator = {
  validate(id, fullname, password) {
    if (id == null || id == "") {
      return { Code: updateOneUserResponseEnum.ID_EMPTY, IsSuccess: false };
    }
    if (fullname == null || fullname == "") {
      return {
        Code: updateOneUserResponseEnum.NAME_IS_EMPTY,
        IsSuccess: false,
      };
    }
    if (password == null || password == "") {
      return {
        Code: updateOneUserResponseEnum.PASSWORD_IS_EMPTY,
        IsSuccess: false,
      };
    }
    if (password.length < 6) {
      return {
        Code: updateOneUserResponseEnum.PASSWORD_IS_LESS_THAN_6_LETTERS,
        IsSuccess: false,
      };
    }
    return { Code: updateOneUserResponseEnum.SUCCESS, IsSuccess: true };
  },
};
