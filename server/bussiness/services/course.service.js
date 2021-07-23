const createOneCourseResponseEnum = require("../../api/validators/enums/courseEnums/createOneCourseResponseEnum");
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

const courseService = {
  async createOneCourse(request) {
    try {
      const resultValidator = createOneCourseValidator.validate(
        request.name,
        request.title,
        request.sub_description,
        request.description,
        request.image,
        request.price,
        request.category,
        request.author,
        request.promote,
        request.language
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      try {
        const upLoadImage = await cloudinary.uploader.upload(request.image, {
          upload_preset: "udemy-clone-cloud",
        });
        console.log(upLoadImage);
        var newImage = upLoadImage.secure_url;
      } catch (e) {
        return { Code: createOneCourseResponseEnum.IMAGE_IS_INVALID };
      }
      const category = await categoryRepository.getCategoryByName(
        request.category
      );
      if (category.length == 0) {
        return { Code: createOneCourseResponseEnum.CATEGORY_IS_NOT_EXIST };
      }
      console.log(request.author);
      const author = await userRepository.getUserByEmail(request.author);
      console.log(author);
      if (author.length == 0) {
        return { Code: createOneCourseResponseEnum.AUTHOR_IS_NOT_EXIST };
      }
      const promote = await promoteRepository.getPromoteByPrice(
        request.promote
      );
      //   if (promote.length == 0) {
      //     return { Code: createOneCourseResponseEnum.PROMOTE_IS_NOT_EXIST };
      //   }
      const language = await languageRepository.getLanguageByName(
        request.language
      );
      if (language.length == 0) {
        return { Code: createOneCourseResponseEnum.LANGUAGE_IS_NOT_EXIST };
      }
      const course = await courseRepository.getCourseByName(request.name);
      if (course.length != 0) {
        return { Code: createOneCourseResponseEnum.NAME_IS_EXIST };
      }
      const newCourse = {
        Name: request.name,
        Title: request.title,
        Sub_Description: request.sub_description,
        Description: request.description,
        Image: newImage,
        Price: request.price,
        Category_Id: category[0].Id,
        Author_Id: author[0].Id,
        //Promote_Id: promote[0].Id,
        Language_Id: language[0].Id,
      };
      if (
        _entityRepository("Courses").addEntity(newCourse) ===
        operatorType.FAIL.CREATE
      ) {
        return { Code: createOneCourseResponseEnum.SERVER_ERROR };
      }
      return { Code: createOneCourseResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  //   async getAllCourse() {
  //     try {
  //       const listCourse = await _entityRepository("Courses").getEntities();
  //       const listALlResponse=await Promise.all(listCourse.map(async (course)=>{
  //           let category=await _entityRepository("Categories").getEntity(course.Id);
  //           let promote=await _entityRepository("Promotes").getEntity(course.Id);

  //       }))
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   },
};
module.exports = courseService;
