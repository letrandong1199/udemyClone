const createOneResponseUserEnum = require("./enums/createOneUserResponseEnum");
const createOneUserValidator = {
  validate(email, fullname, password, roleOfUser) {
    if (fullname == null || fullname == "") {
      return {
        Code: createOneUserResponseEnum.NAME_IS_EMPTY,
        IsSuccess: false,
      };
    }
    if (email == null || email == "") {
      return {
        Code: createOneUserResponseEnum.EMAIL_IS_EMPTY,
        IsSuccess: false,
      };
    }
    if (password == null || password == "") {
      return {
        Code: createOneUserResponseEnum.PASSWORD_IS_EMPTY,
        IsSuccess: false,
      };
    }
    if (password.length < 6) {
      return {
        Code: createOneUserResponseEnum.PASSWORD_IS_LESS_THAN_6_LETTERS,
        IsSuccess: false,
      };
    }
    if (roleOfUser == null || roleOfUser == "") {
      return {
        Code: createOneUserResponseEnum.ROLE_OF_USER_IS_EMPTY,
        IsSuccess: false,
      };
    }
    return { Code: createOneUserResponseEnum.SUCCESS, IsSuccess: true };
  },
};
module.exports = createOneUserValidator;
