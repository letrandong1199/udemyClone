const deleteOneFeedbackResponseEnum = require("../enums/feedbackEnums/deleteOneFeedbackResponseEnum");
module.exports = {
  validate(user_id, course_id, id) {
    if (user_id == null || user_id == "") {
      return {
        Code: deleteOneFeedbackResponseEnum.USER_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (course_id == null || course_id == "") {
      return {
        Code: deleteOneFeedbackResponseEnum.COURSE_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (id == null || id == "") {
      return {
        Code: deleteOneFeedbackResponseEnum.ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    return { Code: deleteOneFeedbackResponseEnum.SUCCESS, Isuccess: true };
  },
};
