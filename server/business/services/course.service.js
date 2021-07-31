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
      const promote = request.Promote;
      const language = await _entityRepository("Categories").getEntity(
        request.Language_Id
      );

      if (language.length == 0) {
        return { Code: createOneCourseResponseEnum.LANGUAGE_IS_NOT_EXIST };
      }
      const course = await courseRepository.getCourseByTitle(request.Title);

      if (course.length != 0) {
        return { Code: createOneCourseResponseEnum.NAME_IS_EXIST };
      }
      // Upload image
      try {
        const image = request.Image;
        const upLoadImageLarge = await cloudinary.uploader.upload(image, {
          folder: "udemy",
          width: 750,
          height: 422,
        });
        const upLoadImageSmall = await cloudinary.uploader.upload(image, {
          folder: "udemy",
          width: 240,
          height: 135,
        });
        const upLoadImageMedium = await cloudinary.uploader.upload(image, {
          folder: "udemy",
          width: 480,
          height: 270,
        });

        var newImageLarge = upLoadImageLarge.secure_url;
        var newImageMedium = upLoadImageMedium.secure_url;
        var newImageSmall = upLoadImageSmall.secure_url;
      } catch (e) {
        console.log("In course.service: ", e);
        return { Code: createOneCourseResponseEnum.IMAGE_IS_INVALID };
      }

      const newCourse = {
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
    const keyToColName = {
      language: "Language_Id",
      category: "Category_Id",
      rating: "Rating",
      "desc-rating": "Rating",
      "asc-price": "Price",
    };
    const queryTable = {};
    const paging = {};
    const search = {};
    const sort = {};

    for (const [key, value] of Object.entries(query)) {
      if (key === "search") {
        const category = await categoryRepository.getCategoryByQuery(value);
        if (category) {
          let categorySearch = category.map((item) => {
            return item.Id;
          });
          search["category"] = categorySearch;
        }
        search[key] = value;
      } else if (key === "limit") {
        paging[key] = parseInt(value);
      } else if (key === "page") {
        paging["offset"] = (parseInt(value) - 1) * parseInt(query.limit);
      } else if (key === "sort") {
        if (keyToColName[value] === "Rating") {
          sort["ColName"] = "Rating";
          sort["Orderby"] = "desc";
        } else if (keyToColName[value] === "Price") {
          sort["ColName"] = "Price";
          sort["Orderby"] = "asc";
        } else {
          sort["ColName"] = "Rating";
          sort["Orderby"] = "desc";
        }
      } else if (typeof value === "string" || typeof value === "number") {
        console.log("Number");
        const number = parseInt(value)
        const array = [number];
        queryTable[keyToColName[key]] = array;
      } else if (typeof value === "object") {
        const result = value.map(function (x) {
          return parseInt(x, 10);
        });
        queryTable[keyToColName[key]] = result;
      } else {
        queryTable[keyToColName[key]] = value;
      }
    }
    console.log("object", queryTable);
    console.log("object", paging);
    console.log("object", search);
    console.log("object", sort);

    try {
      if (queryTable) {
        var count = await courseRepository.getCountCourses(queryTable, search, sort);
      }
      const listCourse = await courseRepository.getCourseByQuery(
        queryTable,
        paging,
        search,
        sort
      );

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
          let numberRegister =
            await enrolledcourseRepository.getEnrolledCourseByCourse(course.Id);
          let numberRating = 0;
          if (numberRegister) {
            let count = 0;
            for (item of numberRegister) {
              if (item.Rating !== 0) {
                console.log(item);
                count = count + 1;
              }
            }
            numberRating = count;
          }
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
            Promote_Rate: promote[0].Promote,
            Language_Id: course.Language_Id,
            Number_Of_Rating: numberRating,
          };
        })
      );
      return {
        Code: getAllCourseResponseEnum.SUCCESS,
        listAllResponse: listAllCourseResponse,
        Count: count.Count,
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
      const author = await _entityRepository("Users").getEntity(
        course[0].Author_Id
      );
      const language = await _entityRepository("Languages").getEntity(
        course[0].Language_Id
      );
      const category = await _entityRepository("Categories").getEntity(
        course[0].Category_Id
      );
      const categoryParent = await _entityRepository("Categories").getEntity(
        category[0].Parent_Id
      );
      console.log("hi", [course[0].Category_Id]);
      const listSimilarCourses = await courseRepository.getCourseByQuery(
        (query = {
          Category_Id: [course[0].Category_Id],
        }),
        (paging = {
          limit: 10,
          offset: 0,
        })
      );
      const listSimilarCourses_ = await Promise.all(
        listSimilarCourses.map(async (course) => {
          let category = await _entityRepository("Courses").getEntity(
            course.Category_Id
          );
          let promote = await _entityRepository("Promotes").getEntity(
            course.Promote_Id
          );
          let author = await _entityRepository("Users").getEntity(
            course.Author_Id
          );
          return {
            Id: course.Id,
            Title: course.Title,
            Sub_Description: course.Sub_Description,
            Description: course.Description,
            Thumbnail_Small: course.Thumbnail_Small,
            Thumbnail_Medium: course.Thumbnail_Medium,
            Thumbnail_Large: course.Thumbnail_Large,
            Price: course.Price,
            Category: category[0],
            Author: author[0],
            Promote_Rate: promote[0].Promote,
            Language_Id: course.Language_Id,
          };
        })
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
                  Id: media.Id,
                  Video_URL: media.Video_URL,
                };
              });
              return {
                Id: lecture.Id,
                Media: listMediaResponse,
                Title: lecture.Title,
              };
            })
          );
          return {
            Id: section.Id,
            Section_Name: section.Name,
            Lectures: listLectureResponse,
          };
        })
      );
      let numberRating = 0;
      const numberRegister =
        await enrolledcourseRepository.getEnrolledCourseByCourse(course[0].Id);
      if (numberRegister) {
        let count = 0;
        for (item of numberRegister) {
          if (item.Rating !== 0) {
            console.log(item);
            count = count + 1;
          }
        }
        numberRating = count;
      }
      const courseResponse = {
        Id: course[0].Id,
        Title: course[0].Title,
        Thumbnail_Large: course[0].Thumbnail_Large,
        Thumbnail_Medium: course[0].Thumbnail_Medium,
        Thumbnail_Small: course[0].Thumbnail_Small,
        Sub_Description: course[0].Sub_Description,
        Description: course[0].Description,
        Categories_Tree: [categoryParent[0], category[0]],
        Language_Name: language[0].Name,
        Similar_Courses: listSimilarCourses_,
        Author: author[0],
        Price: course[0].Price,
        Promote: promote[0].Promote,
        Rating: course[0].Rating,
        Content: content,
        Feedback: listFeedbackResponse,
        Number_Of_Enrolled: numberRegister.length,
        Number_Of_Rating: numberRating,
      };
      return {
        Code: getOneCourseResponseEnum.SUCCESS,
        resultResponse: courseResponse,
      };
    } catch (e) {
      console.log(e);
    }
  },
  async getAllCourse_(request) {
    const query = request.query;
    const keyToColName = {
      language: "Language_Id",
      category: "Category_Id",
      rating: "Rating",
      'desc-rating': "Rating",
      'asc-price': "Price",
    };
    const queryTable = {};
    const paging = {};
    const search = {};
    const sort = {};
    for (const [key, value] of Object.entries(query)) {
      if (key === "search") {
        const category = await categoryRepository.getCategoryByQuery(value);
        if (category) {
          let categorySearch = category.map((item) => {
            return item.Id;
          });
          search["category"] = categorySearch;
        }
        search[key] = value;
      } else if (key === "limit") {
        paging[key] = parseInt(value);
      } else if (key === "page") {
        paging["offset"] = (parseInt(value) - 1) * parseInt(query.limit);
      } else if (key === "sort") {
        if (keyToColName[value] === "Rating") {
          sort["ColName"] = "Rating";
          sort["Orderby"] = "desc";
        } else if (keyToColName[value] === "Price") {
          sort["ColName"] = "Price";
          sort["Orderby"] = "asc";
        } else {
          sort["ColName"] = "Rating";
          sort["Orderby"] = "desc";
        }
      } else if (typeof value === "string" || typeof value === "number") {
        console.log("Number");
        queryTable[keyToColName[key]] = Array(value);
      } else {
        queryTable[keyToColName[key]] = value;
      }
    }
    console.log("object", queryTable);
    console.log("object", paging);
    console.log("object", search);
    console.log("object", sort);

    try {
      if (queryTable) {
        var count = await courseRepository.getCountCourses(queryTable, search, sort);
      }
      const listCourse = await courseRepository.getCourseByQuery(
        queryTable,
        paging,
        search,
        sort
      );

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
            Promote_Rate: promote[0].Promote,
            Language_Id: course.Language_Id,
          };
        })
      );
      return {
        Code: getAllCourseResponseEnum.SUCCESS,
        listAllResponse: listAllCourseResponse,
        Count: count.Count,
      };
    } catch (e) {
      console.log(e);
      return { Code: getAllCourseResponseEnum.SERVER_ERROR };
    }
  },
};
module.exports = courseService;
