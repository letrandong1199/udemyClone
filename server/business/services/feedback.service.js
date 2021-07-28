const createOneFeedbackResponseEnum = require("../../api/validators/enums/feedbackEnums/createOneFeedbackResponseEnum");
const deleteOneFeedbackResponseEnum = require("../../api/validators/enums/feedbackEnums/deleteOneFeedbackResponseEnum");
const updateOneFeedbackEnum = require("../../api/validators/enums/feedbackEnums/updateOneFeedbackResponseEnum");
const createOneFeedbackValidator = require("../../api/validators/feedbackValidators/createOneFeedbackValidator");
const deleteOneFeedbackValidator = require("../../api/validators/feedbackValidators/deleteOneFeedbackValidator");
const updateOneFeedbackValidator = require("../../api/validators/feedbackValidators/updateOneFeedbackValidator");

const _entityRepository = require("../../repositories/entity.repository");
const operatorType = require("../../utils/enums/operatorType");
const feedbackService = {
  async createOneFeedback(request) {
    try {
      const resultValidator = createOneFeedbackValidator.validate(
        request.id,
        request.body.Course_Id,
        request.body.Content
      );
      if (!resultValidator.Isucess) {
        return { Code: resultValidator.Code };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.body.Course_Id
      );
      if (course.length == 0) {
        return { Code: createOneFeedbackResponseEnum.COURSE_IS_NOT_EXIST };
      }
      const newFeedback = {
        User_Id: request.id,
        Course_Id: request.body.Course_Id,
        Content: request.body.Content,
      };
      const ret = await _entityRepository("Feedbacks").addEntity(newFeedback);
      if (ret === operatorType.FAIL.CREATE) {
        return { Code: createOneFeedbackResponseEnum.SERVER_ERROR };
      }
      return { Code: createOneFeedbackResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  async updateOneFeedback(request) {
    try {
      const resultValidator = updateOneFeedbackValidator.validate(
        request.id,
        request.body.Content,
        request.body.Course_Id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.body.Course_Id
      );
      if (course.length == 0) {
        return { Code: updateOneFeedbackEnum.COURSE_ID_IS_INVALID };
      }
      const feedback = await _entityRepository("Feedbacks").getEntity(
        request.params.id
      );
      if (feedback.length == 0) {
        return { Code: updateOneFeedbackEnum.FEEDBACK_IS_NOT_EXIST };
      }
      feedback[0].Content = request.body.Content;
      if (
        (await _entityRepository("Feedbacks").updateEntity(
          request.params.id,
          feedback[0]
        )) === operatorType.FAIL.UPDATE
      ) {
        return { Code: updateOneFeedbackEnum.SERVER_ERROR };
      }
      return { Code: updateOneFeedbackEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  async deleteOneFeedback(request) {
    try {
      const resultValidator = deleteOneFeedbackValidator.validate(
        request.id,
        request.body.Course_Id,
        request.params.id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      const feedback = await _entityRepository("Feedbacks").getEntity(
        request.params.id
      );
      if (feedback.length == 0) {
        return { Code: deleteOneFeedbackResponseEnum.ID_IS_INVALID };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.body.Course_Id
      );
      if (course.length == 0) {
        return { Code: deleteOneFeedbackResponseEnum.COURSE_ID_IS_INVALID };
      }
      if (
        (await _entityRepository("Feedbacks").deleteEntity(
          request.params.id
        )) === operatorType.FAIL.DELETE
      ) {
        return { Code: deleteOneFeedbackResponseEnum.SERVER_ERROR };
      }
      return { Code: deleteOneFeedbackResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = feedbackService;
