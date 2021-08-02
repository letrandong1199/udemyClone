const createOneLanguageResponseEnum = require("../enums/languageEnums/createOneLanguageResponseEnum");
const createOneLanguageValidator = {
  validate(name) {
    if (name == null || name == "") {
      return {
        Code: createOneLanguageResponseEnum.LANGUAGE_NAME_IS_EMPTY,
        IsSuccess: false,
      };
    }
    return { Code: createOneLanguageResponseEnum.SUCCESS, IsSuccess: true };
  },
};
module.exports = createOneLanguageValidator;
