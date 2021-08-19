const deleteOneMediaResponseEnum = require("../enums/mediaEnums/deleteOneMediaResponseEnum");
module.exports = {
  validate(id) {
    if (id == null || id == "") {
      return {
        Code: deleteOneMediaResponseEnum.MEDIA_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    return { Code: deleteOneMediaResponseEnum.SUCCESS, Isuccess: true };
  },
};
