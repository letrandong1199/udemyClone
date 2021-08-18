const createOneEnrolledCourseValidator = require("../../api/validators/enrolledcourseValidators/createOneEnrolledCourseValidator");
const createOneEnrolledCourseResponseEnum = require("../../api/validators/enums/enrolledcourseEnums/createOneEnrolledCourseResponseEnum");
const updateOneEnrolledCourseResponseEnum = require("../../api/validators/enums/enrolledcourseEnums/updateOneEnrolledCourseResponseEnum");
const getEnrolledCourseResponseEnum = require("../../api/validators/enums/enrolledcourseEnums/getEnrolledCourseResponseEnum");
const enrolledcourseRepository = require("../../repositories/enrolledcourse.repository");
const lectureRepository = require("../../repositories/lecture.repository");
const sectionRepository = require("../../repositories/section.repository");
const _entityRepository = require("../../repositories/entity.repository");
const mediaRepository = require("../../repositories/media.repository");
const operatorType = require("../../utils/enums/operatorType");
const mediauserRepository = require("../../repositories/mediauser.repository");
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
    console.log(request.body);
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
      if (request.body.Rating > 5 || request.body.Rating < 0) {
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

  async getAllEnrolled(request) {
    const { id } = request;
    console.log('id', id);
    try {
      const listEnrolled = await enrolledcourseRepository.getEnrolledCourseByUser(id);
      console.log('list', listEnrolled);
      const listAllCourseResponse = await Promise.all(
        listEnrolled.map(async (course) => {
          let category = await _entityRepository("Categories").getEntity(
            course.Category_Id
          );
          let author = await _entityRepository("Users").getEntity(
            course.Author_Id
          );
          let sections = await sectionRepository.getSectionByCourseId(course.Id);

          let numAll = 0;
          let numCompleted = 0;
          for (let section of sections) {
            let lectures = await lectureRepository.getLectureBySectionId(section.Id);
            for (let lecture of lectures) {
              let media = await mediaRepository.getMediaByLectureId(lecture.Id);
              for (let item of media) {
                numAll += 1;
                let mediaUser = await mediauserRepository.getPlayedByUserIdAndMediaId({
                  User_Id: id,
                  Media_Id: item.Id
                })

                if (mediaUser.length > 0) {
                  if (Boolean(mediaUser[0].Is_Completed)) {
                    numCompleted += 1;
                  }
                }
              }
            }
          }

          console.log('num', numAll);
          return {
            Id: course.Id,
            Name: course.Title,
            Title: course.Title,
            Sub_Description: course.Sub_Description,
            Description: course.Description,
            Thumbnail_Small: course.Thumbnail_Small,
            Thumbnail_Medium: course.Thumbnail_Medium,
            Thumbnail_Large: course.Thumbnail_Large,
            Price: course.Price,
            Rating: course.Rating,
            Category: category[0],
            Author: author[0],
            Language_Id: course.Language_Id,
            Num_All_Media: numAll,
            Num_Completed: numCompleted,
          };
        })
      );
      console.log('GG', listAllCourseResponse);
      return {
        Code: getEnrolledCourseResponseEnum.SUCCESS,
        listAllResponse: listAllCourseResponse,
      };
    } catch (e) {
      console.log(e);
      return { Code: getEnrolledCourseResponseEnum.SERVER_ERROR };
    }
  },


};
module.exports = enrolledcourseService;
