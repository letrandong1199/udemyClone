const deleteOneMediaResponseEnum = require("../enums/mediaEnums/deleteOneMediaResponseEnum");
module.exports = {
  validate(lecture_id, id) {
    if (lecture_id == null || lecture_id == "") {
      return {
        Code: deleteOneMediaResponseEnum.LECTURE_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (id == null || id == "") {
      return {
        Code: deleteOneMediaResponseEnum.MEDIA_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    return { Code: deleteOneMediaResponseEnum.SUCCESS, Isuccess: true };
  },
};
