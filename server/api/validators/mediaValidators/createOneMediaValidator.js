const createOneMediaResponseEnum = require("../enums/mediaEnums/createOneMediaResponseEnum");
module.exports = {
  validate(lecture_id) {
    if (lecture_id == null || lecture_id == "") {
      return {
        Code: createOneMediaResponseEnum.LECTURE_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    return {
      Code: createOneMediaResponseEnum.SUCCESS,
      Isuccess: true,
    };
  },
};
