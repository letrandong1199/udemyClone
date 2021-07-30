const createOneEnrolledCourseValidator = require("../../api/validators/enrolledcourseValidators/createOneEnrolledCourseValidator");
const createOneEnrolledCourseResponseEnum = require("../../api/validators/enums/enrolledcourseEnums/createOneEnrolledCourseResponseEnum");
const updateOneEnrolledCourseResponseEnum = require("../../api/validators/enums/enrolledcourseEnums/updateOneEnrolledCourseResponseEnum");
const enrolledcourseRepository = require("../../repositories/enrolledcourse.repository");

const _entityRepository = require("../../repositories/entity.repository");
const operatorType = require("../../utils/enums/operatorType");
const enrolledcourseService = {
  async createOneEnrolledCourse(request) {
    console.log(request.body);
    try {
      const resultValidator = createOneEnrolledCourseValidator.validate(
        request.id,
        request.body.Course_Id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.body.Course_Id
      );
      if (course.length == 0) {
        return {
          Code: createOneEnrolledCourseResponseEnum.COURSE_IS_NOT_EXIST,
        };
      }
      const newEnrolledCourse = {
        User_Id: request.id,
        Course_Id: request.body.Course_Id,
      };
      console.log(newEnrolledCourse);
      const ret = await enrolledcourseRepository.addEnrolledCourse(
        newEnrolledCourse
      );
      if (ret === operatorType.FAIL.CREATE) {
        return { Code: createOneEnrolledCourseResponseEnum.SERVER_ERROR };
      }
      return { Code: createOneEnrolledCourseResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  async updateOneEnrolledCourse(request) {
    try {
      const resultValidator = createOneEnrolledCourseValidator.validate(
        request.id,
        request.body.Course_Id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      const enrolledcourse =
        await enrolledcourseRepository.getEnrolledCourseByUserIdAndCourseId({
          Course_Id: request.body.Course_Id,
          User_Id: request.id,
        });
      if (enrolledcourse.length == 0) {
        return {
          Code: updateOneEnrolledCourseResponseEnum.EROLLED_COURSE_IS_NOT_EXIST,
        };
      }
      if (typeof request.body.Rating != "number") {
        return { Code: updateOneEnrolledCourseResponseEnum.RATING_IS_INVALID };
      }
      if (request.body.Rating > 5 || request.body.Rating < 1) {
        return { Code: updateOneEnrolledCourseResponseEnum.RATING_IS_INVALID };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.body.Course_Id
      );
      if (course.length == 0) {
        return {
          Code: updateOneEnrolledCourseResponseEnum.COURSE_IS_NOT_EXIST,
        };
      }
      enrolledcourse[0].Rating = request.body.Rating;
      const ret =
        await enrolledcourseRepository.updateEnrolledCourseByUserIdAndCourseId(
          {
            Course_Id: request.body.Course_Id,
            User_Id: request.id,
          },
          enrolledcourse[0]
        );
      if (ret === operatorType.FAIL.UPDATE) {
        return { Code: updateOneEnrolledCourseResponseEnum.SERVER_ERROR };
      }
      return { Code: updateOneEnrolledCourseResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = enrolledcourseService;
