const signInResponseEnum = require("./enums/signInResponseEnum");
module.exports = signInValidator = {
  validate(email, password) {
    if (email == null || email == "") {
      return { Code: signInResponseEnum.EMAIL_IS_EMPTY, IsSuccess: false };
    }
    if (password == null || password == "") {
      return { Code: signInResponseEnum.PASSWORD_IS_EMPTY, IsSuccess: false };
    }
    return { Code: signInResponseEnum.SUCCESS, IsSuccess: true };
  },
};
