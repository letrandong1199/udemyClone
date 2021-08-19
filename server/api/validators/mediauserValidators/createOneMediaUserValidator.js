const createOneMediaUserResponseEnum = require("../enums/mediauserEnums/createOneMediaUserResponseEnum");

module.exports = {
  validate(id, user_id, played) {
    if (id == null || id == "") {
      return {
        Code: createOneMediaUserResponseEnum.MEDIA_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (user_id == null || user_id == "") {
      return {
        Code: createOneMediaUserResponseEnum.USER_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    /*
    if (played == null || played == "") {
      return {
        Code: createOneMediaUserResponseEnum.PLAYED_IS_EMPTY,
        Isuccess: false,
      };
    }
    */
    /*
     if (typeof played != "number") {
       return {
         Code: createOneMediaUserResponseEnum.PLAYED_IS_INVALID,
         Isuccess: false,
       };
     }
     */
    return { Code: createOneMediaUserResponseEnum.SUCCESS, Isuccess: true };
  },
};
