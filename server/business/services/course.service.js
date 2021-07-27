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
        request.Title,
        request.Sub_Description,
        request.Description,
        request.Image,
        request.Price,
        request.Category_Id,
        request.Author_Id,
        request.Promote,
        request.Language_Id,
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }

      // Check category
      const category = await _entityRepository("Categories").getEntity(request.Category_Id)
      if (category.length == 0) {
        return { Code: createOneCourseResponseEnum.CATEGORY_IS_NOT_EXIST };
      }
      // Check author
      const author = await _entityRepository("Users").getEntity(request.Author_Id)
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
      const language = await _entityRepository("Categories").getEntity(request.Language_Id)

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
        const upLoadImage = await cloudinary.uploader.upload(image, {
          folder: 'udemy'
        });
        var newImage = upLoadImage.secure_url;
      } catch (e) {
        console.log('In course.service: ', e);
        return { Code: createOneCourseResponseEnum.IMAGE_IS_INVALID };
      }

      const newCourse = {
        Name: request.Title,
        Title: request.Title,
        Sub_Description: request.Sub_Description,
        Description: request.Description,
        Image: newImage,
        Price: request.Price,
        Category_Id: category[0].Id,
        Author_Id: author[0].Id,
        Promote_Id: promote,
        Language_Id: language[0].Id,
      };
      const ret = await _entityRepository("Courses").addEntity(newCourse)
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
    console.log('query', query);
    const keyToColName = {
      language: "Language_Id",
      category: "Category_Id"
    }
    const queryTable = {}

    for (const [key, value] of Object.entries(query)) {
      if (typeof value === "string" || typeof value === "number") {
        console.log("Number");
        queryTable[keyToColName[key]] = Array(value);
      } else {
        queryTable[keyToColName[key]] = value;
      }

    }
    console.log('object', queryTable);
    try {
      const listCourse = await courseRepository.getCourseByQuery(queryTable)
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
        request.body.Language_Id,
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
        request.body.Name
      );
      if (nameCourse.length != 0) {
        if (nameCourse[0].Name != course[0].Name) {
          return { Code: updateOneCourseResponseEnum.NAME_IS_EXIST };
        }
      }
      const titleCourse = await courseRepository.getCourseByTitle(
        request.body.Title
      );
      if (titleCourse.length != 0) {
        if (titleCourse[0].Title != course[0].Title) {
          return { Code: updateOneCourseResponseEnum.TITLE_IS_EXIST };
        }
      }
      try {
        const upLoadImge = await cloudinary.uploader.upload(
          request.body.Image,
          {
            folder: 'udemy'
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
        //Promote: promote[0]?.Promote,
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
