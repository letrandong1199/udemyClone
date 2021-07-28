const createOneCourseResponseEnum = require("../../api/validators/enums/courseEnums/createOneCourseResponseEnum");
const updateOneCourseResponseEnum = require("../../api/validators/enums/courseEnums/updateOneCourseResponseEnum");
const cloudinary = require("../../api/extensions/cloudinary");
const operatorType = require("../../utils/enums/operatorType");

const createOneCourseValidator = require("../../api/validators/courseValidators/createOneCourseValidator");

const courseRepository = require("../../repositories/course.repository");
const _entityRepository = require("../../repositories/entity.repository");
const categoryRepository = require("../../repositories/category.repository");
const userRepository = require("../../repositories/user.repository");
const promoteRepository = require("../../repositories/promote.repository");
const languageRepository = require("../../repositories/language.repository");
const getAllCourseResponseEnum = require("../../api/validators/enums/courseEnums/getAllCourseResponseEnum");
const updateOneCourseValidator = require("../../api/validators/courseValidators/updateOneCourseValidator");
const getOneCourseValidator = require("../../api/validators/courseValidators/getOneCourseValidator");
const getOneCourseResponseEnum = require("../../api/validators/enums/courseEnums/getOneCourseResponseEnum");
const sectionRepository = require("../../repositories/section.repository");
const lectureRepository = require("../../repositories/lecture.repository");
const mediaRepository = require("../../repositories/media.repository");
const feedbackRepository = require("../../repositories/feedback.repository");
const enrolledcourseRepository = require("../../repositories/enrolledcourse.repository");

const courseService = {
  async createOneCourse(request) {
    try {
      const resultValidator = createOneCourseValidator.validate(
        request.Title,
        request.Sub_Description,
        request.Description,
        request.Image,
        request.Price,
        request.Category_Id,
        request.Author_Id,
        request.Promote,
        request.Language_Id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }

      // Check category
      const category = await _entityRepository("Categories").getEntity(
        request.Category_Id
      );
      if (category.length == 0) {
        return { Code: createOneCourseResponseEnum.CATEGORY_IS_NOT_EXIST };
      }
      // Check author
      const author = await _entityRepository("Users").getEntity(
        request.Author_Id
      );
      if (author.length == 0) {
        return { Code: createOneCourseResponseEnum.AUTHOR_IS_NOT_EXIST };
      }
      /*
            const promote = await promoteRepository.getPromoteByPromote(
              request.Promote
            );
      
            if (promote.length == 0) {
              return { Code: createOneCourseResponseEnum.PROMOTE_IS_NOT_EXIST };
            }
      */
      const promote = request.promote;
      const language = await _entityRepository("Categories").getEntity(
        request.Language_Id
      );

      if (language.length == 0) {
        return { Code: createOneCourseResponseEnum.LANGUAGE_IS_NOT_EXIST };
      }
      const course = await courseRepository.getCourseByName(request.Title);

      if (course.length != 0) {
        return { Code: createOneCourseResponseEnum.NAME_IS_EXIST };
      }
      // Upload image
      try {
        const image = request.Image;
        const upLoadImageLarge = await cloudinary.uploader.upload(image, {
          folder: "udemy-clone-cloud",
        });
        const upLoadImageSmall = await cloudinary.uploader.upload(image, {
          folder: "udemy-clone-cloud",
          width: 128,
          height: (128 * 9) / 16,
        });
        const upLoadImageMedium = await cloudinary.uploader.upload(image, {
          folder: "udemy-clone-cloud",
          width: 512,
          height: (512 * 9) / 16,
        });

        var newImageLarge = upLoadImageLarge.secure_url;
        var newImageMedium = upLoadImageMedium.secure_url;
        var newImageSmall = upLoadImageSmall.secure_url;
      } catch (e) {
        console.log("In course.service: ", e);
        return { Code: createOneCourseResponseEnum.IMAGE_IS_INVALID };
      }

      const newCourse = {
        Name: request.Title,
        Title: request.Title,
        Sub_Description: request.Sub_Description,
        Description: request.Description,
        Thumbnail_Small: newImageSmall,
        Thumbnail_Medium: newImageMedium,
        Thumbnail_Large: newImageLarge,
        Price: request.Price,
        Category_Id: category[0].Id,
        Author_Id: author[0].Id,
        Promote_Id: promote,
        Language_Id: language[0].Id,
      };
      const ret = await _entityRepository("Courses").addEntity(newCourse);
      if (ret === operatorType.FAIL.CREATE) {
        return { Code: createOneCourseResponseEnum.SERVER_ERROR };
      }
      newCourse.Course_Id = ret[0];
      return { Code: createOneCourseResponseEnum.SUCCESS, newCourse };
    } catch (e) {
      console.log(e);
    }
  },
  async getAllCourse(request) {
    const query = request.query;
    console.log("query", query);
    const keyToColName = {
      language: "Language_Id",
      category: "Category_Id",
      rating: "Rating",
    };
    const queryTable = {};
    const paging = {};

    for (const [key, value] of Object.entries(query)) {
      if (key === "limit") {
        paging[key] = parseInt(value);
      } else if (key === "page") {
        paging["offset"] = (parseInt(value) - 1) * parseInt(query.limit);
      } else if (typeof value === "string" || typeof value === "number") {
        console.log("Number");
        queryTable[keyToColName[key]] = Array(value);
      } else {
        queryTable[keyToColName[key]] = value;
      }
    }
    console.log("object", queryTable);
    console.log("object", paging);
    try {
      const listCourse = await courseRepository.getCourseByQuery(
        queryTable,
        paging
      );
      const listAllCourseResponse = await Promise.all(
        listCourse.map(async (course) => {
          let category = await _entityRepository("Categories").getEntity(
            course.Category_Id
          );
          /* let promote = await _entityRepository("Promotes").getEntity(
             course.Promote_Id
           );*/
          let author = await _entityRepository("Users").getEntity(
            course.Author_Id
          );
          return {
            Name: course.Name,
            Image: course.Image,
            Author: author[0].Full_Name,
            Category: category[0].Name,
            Sub_Description: course.Sub_Description,
            //Promote: promote[0].Promote,
          };
        })
      );
      return {
        Code: getAllCourseResponseEnum.SUCCESS,
        listAllResponse: listAllCourseResponse,
      };
    } catch (e) {
      console.log(e);
      return { Code: getAllCourseResponseEnum.SERVER_ERROR };
    }
  },
  async updateOneCourse(request) {
    try {
      const resultValidator = updateOneCourseValidator.validate(
        request.body.Title,
        request.body.Sub_Description,
        request.body.Description,
        request.body.Image,
        request.body.Price,
        request.body.Category_Id,
        request.body.Promote,
        request.body.Language_Id
      );
      if (!resultValidator.Isuccess) {
        return { Code: updateOneCourseResponseEnum.Code };
      }
      //
      const course = await _entityRepository("Courses").getEntity(
        request.params.id
      );
      if (course.length == 0) {
        return { Code: updateOneCourseResponseEnum.ID_IS_INVALID };
      }

      const titleCourse = await courseRepository.getCourseByTitle(
        request.body.Title
      );
      if (titleCourse.length != 0) {
        if (titleCourse[0].Title != course[0].Title) {
          return { Code: updateOneCourseResponseEnum.TITLE_IS_EXIST };
        }
      }

      // Upload image
      var newImageLarge = course[0].Thumbnail_Large;
      var newImageMedium = course[0].Thumbnail_Medium;
      var newImageSmall = course[0].Thumbnail_Small;

      if (request.body.Image) {
        try {
          const image = request.body.Image;

          const upLoadImageLarge = await cloudinary.uploader.upload(image, {
            folder: "udemy-clone-cloud",
          });
          const upLoadImageSmall = await cloudinary.uploader.upload(image, {
            folder: "udemy-clone-cloud",
            width: 128,
            height: (128 * 9) / 16,
          });
          const upLoadImageMedium = await cloudinary.uploader.upload(image, {
            folder: "udemy-clone-cloud",
            width: 512,
            height: (512 * 9) / 16,
          });

          newImageLarge = upLoadImageLarge.secure_url;
          newImageMedium = upLoadImageMedium.secure_url;
          newImageSmall = upLoadImageSmall.secure_url;
        } catch (e) {
          console.log("In course.service: ", e);
          return { Code: createOneCourseResponseEnum.IMAGE_IS_INVALID };
        }
      }

      const category = await _entityRepository("Categories").getEntity(
        request.body.Category_Id
      );
      if (category.length == 0) {
        return { Code: updateOneCourseResponseEnum.CATEGORY_IS_NOT_EXIST };
      }
      if (request.body.Promote === null) request.body.Promote = 0;
      const promote = await promoteRepository.getPromoteByPromote(
        request.body.Promote
      );

      if (promote.length == 0) {
        return { Code: updateOneCourseResponseEnum.PROMOTE_IS_NOT_EXIST };
      }

      const language = await _entityRepository("Languages").getEntity(
        request.body.Language_Id
      );
      if (language.length == 0) {
        return { Code: updateOneCourseResponseEnum.LANGUAGE_IS_NOT_EXIST };
      }
      course[0].Title = request.body.Title;
      course[0].Sub_Description = request.body.Sub_Description;
      course[0].Description = request.body.Description;
      course[0].Thumbnail_Small = newImageSmall;
      course[0].Thumbnail_Medium = newImageMedium;
      course[0].Thumbnail_Large = newImageLarge;
      course[0].Price = request.body.Price;
      course[0].Category_Id = category[0].Id;
      course[0].Promote_Id = promote[0].Id;
      course[0].Language_Id = language[0].Id;
      course[0].Update_At = new Date();
      if (
        (await _entityRepository("Courses").updateEntity(
          request.params.id,
          course[0]
        )) === operatorType.FAIL.UPDATE
      ) {
        return { Code: updateOneCourseResponseEnum.SERVER_ERROR };
      }
      return { Code: updateOneCourseResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  async getOneCourse(request) {
    try {
      const resultValidator = getOneCourseValidator.validate(request.params.id);
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.params.id
      );
      if (course.length == 0) {
        return { Code: getOneCourseResponseEnum.ID_IS_INVALID };
      }
      const promote = await _entityRepository("Promotes").getEntity(
        course[0].Promote_Id
      );
      const listSections = await sectionRepository.getSectionByCourseId(
        course[0].Id
      );
      //get list feedback
      const listFeedbacks = await feedbackRepository.getFeedbackByCourseId(
        course[0].Id
      );
      const listFeedbackResponse = await Promise.all(
        listFeedbacks.map(async (feedback) => {
          let user = await _entityRepository("Users").getEntity(
            feedback.User_Id
          );
          return {
            Feedback_Id: feedback.Id,
            User_Name: user[0].Full_Name,
            User_Email: user[0].Email,
            Content: feedback.Content,
          };
        })
      );
      //get content of course
      const content = await Promise.all(
        listSections.map(async (section) => {
          let listLectures = await lectureRepository.getLectureBySectionId(
            section.Id
          );
          let listLectureResponse = await Promise.all(
            listLectures.map(async (lecture) => {
              let listMedia = await mediaRepository.getMediaByLectureId(
                lecture.Id
              );
              let listMediaResponse = listMedia.map((media) => {
                return {
                  Media_Id: media.Id,
                  Video_URL: media.Video_URL,
                };
              });
              return {
                Lecture_Id: lecture.Id,
                Media: listMediaResponse,
              };
            })
          );
          return {
            Section_Id: section.Id,
            Section_Name: section.Name,
            Lecture: listLectureResponse,
          };
        })
      );
      const numberRegister =
        await enrolledcourseRepository.getEnrolledCourseByCourse(course[0].Id);
      const courseResponse = {
        Name: course[0].Name,
        Image: course[0].Image,
        Sub_Description: course[0].Sub_Description,
        Description: course[0].Description,
        Price: course[0].Price,
        Promote: promote[0].Promote,
        Rating: course[0].Rating,
        Content: content,
        Feedback: listFeedbackResponse,
        NumerOfRegister: numberRegister.length,
      };
      return {
        Code: getOneCourseResponseEnum.SUCCESS,
        resultResponse: courseResponse,
      };
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = courseService;
