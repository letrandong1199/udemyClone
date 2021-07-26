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
        const image = JSON.parse(request.image);
        const upLoadImage = await cloudinary.uploader.upload(image, {
          upload_preset: "udemy-clone-cloud",
        });
        //console.log(upLoadImage);
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
      const promote = await promoteRepository.getPromoteByPromote(
        request.promote
      );
      if (promote.length == 0) {
        return { Code: createOneCourseResponseEnum.PROMOTE_IS_NOT_EXIST };
      }
      const language = await languageRepository.getLanguageByName(
        request.language
      );
      if (language.length == 0) {
        return { Code: createOneCourseResponseEnum.LANGUAGE_IS_NOT_EXIST };
      }
      const course = await courseRepository.getCourseByName(request.name);
      console.log(course);
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
        Promote_Id: promote[0].Id,
        Language_Id: language[0].Id,
      };
      const ret = _entityRepository("Courses").addEntity(newCourse)
      if (ret === operatorType.FAIL.CREATE) {
        return { Code: createOneCourseResponseEnum.SERVER_ERROR };
      }
      newCourse.Course_Id = ret[0];
      return { Code: createOneCourseResponseEnum.SUCCESS, newCourse };
    } catch (e) {
      console.log(e);
    }
  },
  async getAllCourse() {
    try {
      const listCourse = await _entityRepository("Courses").getEntities();
      const listAllCourseResponse = await Promise.all(
        listCourse.map(async (course) => {
          let category = await _entityRepository("Categories").getEntity(
            course.Category_Id
          );
          let promote = await _entityRepository("Promotes").getEntity(
            course.Promote_Id
          );
          let author = await _entityRepository("Users").getEntity(
            course.Author_Id
          );
          return {
            Name: course.Name,
            Image: course.Image,
            Author: author[0].Full_Name,
            Category: category[0].Name,
            Sub_Description: course.Sub_Description,
            Promote: promote[0].Promote,
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
        request.body.name,
        request.body.title,
        request.body.sub_description,
        request.body.description,
        request.body.image,
        request.body.price,
        request.body.category,
        request.body.promote,
        request.body.language
      );
      if (!resultValidator.Isuccess) {
        return { Code: updateOneCourseResponseEnum.Code };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.params.id
      );
      if (course.length == 0) {
        return { Code: updateOneCourseResponseEnum.ID_IS_INVALID };
      }
      const nameCourse = await courseRepository.getCourseByName(
        request.body.name
      );
      if (nameCourse.length != 0) {
        if (nameCourse[0].Name != course[0].Name) {
          return { Code: updateOneCourseResponseEnum.NAME_IS_EXIST };
        }
      }
      const titleCourse = await courseRepository.getCourseByTitle(
        request.body.title
      );
      if (titleCourse.length != 0) {
        if (titleCourse[0].Title != course[0].Title) {
          return { Code: updateOneCourseResponseEnum.TITLE_IS_EXIST };
        }
      }
      try {
        const upLoadImge = await cloudinary.uploader.upload(
          request.body.image,
          {
            upload_preset: "udemy-clone-cloud",
          }
        );
        var newImage = upLoadImge.secure_url;
      } catch (e) {
        console.log(e);
        return { Code: updateOneCourseResponseEnum.IMAGE_IS_INVALID };
      }
      const category = await categoryRepository.getCategoryByName(
        request.body.category
      );
      if (category.length == 0) {
        return { Code: updateOneCourseResponseEnum.CATEGORY_IS_NOT_EXIST };
      }
      const promote = await promoteRepository.getPromoteByPromote(
        request.body.promote
      );
      if (promote.length == 0) {
        return { Code: updateOneCourseResponseEnum.PROMOTE_IS_NOT_EXIST };
      }
      const language = await languageRepository.getLanguageByName(
        request.body.language
      );
      if (language.length == 0) {
        return { Code: updateOneCourseResponseEnum.LANGUAGE_IS_NOT_EXIST };
      }
      course[0].Name = request.body.name;
      course[0].Title = request.body.title;
      course[0].Sub_Description = request.body.sub_description;
      course[0].Description = request.body.description;
      course[0].Image = newImage;
      course[0].Price = request.body.price;
      course[0].Category_Id = category[0].Id;
      course[0].Promote_Id = promote[0].Id;
      course[0].Language_Id = language[0].Id;
      course[0].last_update = new Date();
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
      const courseResponse = {
        Name: course[0].Name,
        Image: course[0].Image,
        Sub_Description: course[0].Sub_Description,
        Description: course[0].Description,
        Price: course[0].Price,
        Promote: promote[0].Promote,
        //Rating/number of user
        //number of user register
        //section,lecture,media
        //feedback
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
