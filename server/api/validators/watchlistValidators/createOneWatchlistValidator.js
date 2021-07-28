const createOneWatchlistResponseEnum = require("../enums/watchlistEnums/createOneWatchlistResponseEnum");
module.exports = {
  validate(user_id, course_id) {
    if (user_id == null || user_id == "") {
      return {
        Code: createOneWatchlistResponseEnum.USER_ID_IS_EMPTY,
        Isucess: false,
      };
    }
    if (course_id == null || course_id == "") {
      return {
        Code: createOneWatchlistResponseEnum.COURSE_ID_IS_EMPTY,
        Isucess: false,
      };
    }
  },
};
