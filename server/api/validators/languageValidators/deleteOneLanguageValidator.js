const deleteOneLanguageResponseEnum = require("../enums/languageEnums/deleteOneLanguageResponseEnum");
module.exports = deleteOneLanguageValidator = {
  validate(id) {
    if (id == null || id == "") {
      return {
        Code: deleteOneLanguageResponseEnum.ID_IS_EMPTY,
        IsSuccess: false,
      };
    }
    return { Code: deleteOneLanguageResponseEnum.SUCCESS, IsSuccess: true };
  },
};
