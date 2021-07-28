const deleteOneWatchlistResponseEnum = require("../enums/watchlistEnums/deleteOneWatchlistResponseEnum");
module.exports = {
  validate(user_id, course_id, id) {
    if (user_id == null || user_id == "") {
      return {
        Code: deleteOneWatchlistResponseEnum.USER_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (course_id == null || course_id == "") {
      return {
        Code: deleteOneWatchlistResponseEnum.COURSE_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (id == null || id == "") {
      return {
        Code: deleteOneWatchlistResponseEnum.ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    return { Code: deleteOneWatchlistResponseEnum.SUCCESS, Isuccess: true };
  },
};
