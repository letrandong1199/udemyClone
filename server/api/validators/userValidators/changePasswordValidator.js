const changePasswordResponseEnum = require("../enums/userEnums/changePasswordResponseEnum");
module.exports = {
  validate(password, newpassword) {
    if (password == null || password == "") {
      return {
        Code: changePasswordResponseEnum.PASSWORD_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (newpassword == null || newpassword == "") {
      return {
        Code: changePasswordResponseEnum.NEW_PASSWORD_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (newpassword.length < 6) {
      return {
        Code: changePasswordResponseEnum.NEW_PASSWORD_IS_LESS_THAN_6_LETTERS,
        Isuccess: false,
      };
    }
    return { Code: changePasswordResponseEnum.SUCCESS, Isuccess: true };
  },
};
