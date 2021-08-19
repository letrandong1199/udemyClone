const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const feedbackRepository = {
  getFeedbackByCourseId(course_id) {
    return db("Feedbacks")
      .where("Course_Id", course_id)
      .catch(() => operatorType.FAIL.READ);
  },
  getFeedbackByUserIdAndCourseId(query) {
    return db("Feedbacks")
      .where(query)
      .catch(() => operatorType.FAIL.READ);
  },
};
module.exports = feedbackRepository;
