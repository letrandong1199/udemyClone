const updateOneFeedbackResponseEnum = require("../enums/feedbackEnums/updateOneFeedbackResponseEnum");
module.exports = {
  validate(user_id, content, course_id) {
    if (user_id == null || user_id == "") {
      return {
        Code: updateOneFeedbackResponseEnum.USER_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (course_id == null || course_id == "") {
      return {
        Code: updateOneFeedbackResponseEnum.COURSE_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (content == null || content == "") {
      return {
        Code: updateOneFeedbackResponseEnum.CONTENT_IS_EMPTY,
        Isuccess: false,
      };
    }
    return {
      Code: updateOneFeedbackResponseEnum.SUCCESS,
      Isuccess: true,
    };
  },
};
