const createOneFeedbackResponseEnum = require("../enums/feedbackEnums/createOneFeedbackResponseEnum");
module.exports = {
  validate(user_id, course_id, content) {
    if (user_id == null || user_id == "") {
      return {
        Code: createOneFeedbackResponseEnum.USER_ID_IS_EMPTY,
        Isucess: false,
      };
    }
    if (course_id == null || course_id == "") {
      return {
        Code: createOneFeedbackResponseEnum.COURSE_ID_IS_EMPTY,
        Isucess: false,
      };
    }
    if (content == null || content == "") {
      return {
        Code: createOneFeedbackResponseEnum.CONTENT_IS_EMPTY,
        Isucess: false,
      };
    }
    return { Code: createOneFeedbackResponseEnum.SUCCESS, Isucess: true };
  },
};
