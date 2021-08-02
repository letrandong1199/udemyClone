const updateOneMediaResponseEnum = require("../enums/mediaEnums/createOneMediaResponseEnum");
module.exports = {
  validate(lecture_id) {
    if (lecture_id == null || lecture_id == "") {
      return {
        Code: updateOneMediaResponseEnum.LECTURE_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    return { Code: updateOneMediaResponseEnum.SUCCESS, Isuccess: true };
  },
};
