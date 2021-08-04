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
        request.body.Title,
        request.body.Sub_Description,
        request.body.Category_Id,
        request.body.Language_Id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }

      // Check category
      const category = await _entityRepository("Categories").getEntity(
        request.body.Category_Id
      );
      if (category.length == 0) {
        return { Code: createOneCourseResponseEnum.CATEGORY_IS_NOT_EXIST };
      }
      // Check author
      console.log("11111111111", request.id);
      const author = await _entityRepository("Users").getEntity(request.id);
      console.log(author);
      const language = await _entityRepository("Languages").getEntity(
        request.body.Language_Id
      );

      if (language.length == 0) {
        return { Code: createOneCourseResponseEnum.LANGUAGE_IS_NOT_EXIST };
      }
      const course = await courseRepository.getCourseByTitle(
        request.body.Title
      );
      console.log(course);
      if (course.length != 0) {
        return { Code: createOneCourseResponseEnum.NAME_IS_EXIST };
      }
      // Upload image
      // try {
      //   const image = request.Image;
      //   const upLoadImageLarge = await cloudinary.uploader.upload(image, {
      //     folder: "udemy",
      //     width: 750,
      //     height: 422,
      //   });
      //   const upLoadImageSmall = await cloudinary.uploader.upload(image, {
      //     folder: "udemy",
      //     width: 240,
      //     height: 135,
      //   });
      //   const upLoadImageMedium = await cloudinary.uploader.upload(image, {
      //     folder: "udemy",
      //     width: 480,
      //     height: 270,
      //   });

      //   var newImageLarge = upLoadImageLarge.secure_url;
      //   var newImageMedium = upLoadImageMedium.secure_url;
      //   var newImageSmall = upLoadImageSmall.secure_url;
      // } catch (e) {
      //   console.log("In course.service: ", e);
      //   return { Code: createOneCourseResponseEnum.IMAGE_IS_INVALID };
      // }

      const newCourse = {
        Title: request.body.Title,
        Sub_Description: request.body.Sub_Description,
        Category_Id: category[0].Id,
        Author_Id: author[0].Id,
        Language_Id: language[0].Id,
      };
      console.log("aaaaaaaa", newCourse);
      const ret = await _entityRepository("Courses").addEntity(newCourse);
      if (ret === operatorType.FAIL.CREATE) {
        return { Code: createOneCourseResponseEnum.SERVER_ERROR };
      }
      newCourse.Id = ret[0];
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
        const number = parseInt(value);
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
        var count = await courseRepository.getCountCourses(
          queryTable,
          search,
          sort
        );
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
        request.body.Category_Id,
        request.body.Language_Id,
        request.body.Is_Completed
      );

      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }

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
      let newDescription = course[0].Description;
      //Description
      if (request.body.Description) {
        newDescription = request.body.Description;
      }

      // Upload image
      let newImageLarge = course[0].Thumbnail_Large;
      let newImageMedium = course[0].Thumbnail_Medium;
      let newImageSmall = course[0].Thumbnail_Small;

      if (request.body.Image) {
        try {
          const image = request.body.Image;
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
      if (request.body.Promote) {
        const promote = await promoteRepository.getPromoteByPromote(
          request.body.Promote
        );
        if (promote.length == 0) {
          return { Code: updateOneCourseResponseEnum.PROMOTE_IS_NOT_EXIST };
        }
        course[0].Promote_Id = promote[0].Id;
      }
      const language = await _entityRepository("Languages").getEntity(
        request.body.Language_Id
      );
      if (language.length == 0) {
        return { Code: updateOneCourseResponseEnum.LANGUAGE_IS_NOT_EXIST };
      }
      let newPrice = course[0].Price;
      if (request.body.Price) {
        newPrice = request.body.Price;
      }
      course[0].Title = request.body.Title;
      course[0].Sub_Description = request.body.Sub_Description;
      course[0].Description = newDescription;
      course[0].Thumbnail_Small = newImageSmall;
      course[0].Thumbnail_Medium = newImageMedium;
      course[0].Thumbnail_Large = newImageLarge;
      course[0].Price = newPrice;
      course[0].Category_Id = category[0].Id;
      course[0].Language_Id = language[0].Id;
      course[0].Update_At = moment().format("YYYY-MM-DD");
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
    console.log("hahahahaahahah", request.view);
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
      //Inc view
      course[0].View = course[0].View + request.view;
      await _entityRepository("Courses").updateEntity(
        request.params.id,
        course[0]
      );
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
                if (media.Is_Preview === true)
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
  async getMyLearning(request) {
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
      const query = {
        Course_Id: request.params.id,
        User_Id: request.id,
      };
      const enrolled =
        await enrolledcourseRepository.getEnrolledCourseByUserIdAndCourseId(
          query
        );
      console.log(enrolled);
      if (enrolled.length == 0) {
        return { Code: getOneCourseResponseEnum.IS_NOT_ENROLLED_COURSE };
      }
      const listSections = await sectionRepository.getSectionByCourseId(
        course[0].Id
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
            Name: section.Name,
            Lectures: listLectureResponse,
          };
        })
      );
      const courseResponse = {
        Id: course[0].Id,
        Content: content,
      };
      return {
        Code: getOneCourseResponseEnum.SUCCESS,
        resultResponse: courseResponse,
      };
    } catch (e) {
      console.log(e);
    }
  },
  async getCourseOfInstructor(request) {
    try {
      const listCourse = await courseRepository.getCourseByAuthorId(request.id);
      if (listCourse.length == 0) {
        return { Code: getAllCourseResponseEnum.AUTHOR_IS_NOT_COURSE };
      }
      const listAllCourseResponse = await Promise.all(
        listCourse.map(async (course) => {
          const category = await _entityRepository("Categories").getEntity(
            course.Category_Id
          );
          let numberRating = 0;
          const numberRegister =
            await enrolledcourseRepository.getEnrolledCourseByCourse(course.Id);
          if (numberRegister) {
            let count = 0;
            for (item of numberRegister) {
              if (item.Rating !== 0) {
                count = count + 1;
              }
            }
            numberRating = count;
          }

          return {
            Id: course.Id,
            Title: course.Title,
            Category: category[0],
            Number_Of_Rating: numberRating,
            Number_Of_Enrolled: numberRegister,
            Sub_Description: course.Sub_Description,
            Thumbnail_Small: course.Thumbnail_Small,
            Thumbnail_Medium: course.Thumbnail_Medium,
            Thumbnail_Large: course.Thumbnail_Large,
            Is_Completed: course.Is_Completed,
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
  async getOneCourseInstructor(request) {
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
      if (course[0].Author_Id != request.id) {
        return { Code: getOneCourseResponseEnum.IS_NOT_AUTHOR };
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
      const listSections = await sectionRepository.getSectionByCourseId(
        course[0].Id
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
                  Is_Preview: media.Is_Preview,
                  Video_URL: media.Video_URL,
                };
              });
              return {
                Id: lecture.Id,
                Media: listMediaResponse,
                Title: lecture.Title,
                Description: lecture.Description,
              };
            })
          );
          return {
            Id: section.Id,
            Name: section.Name,
            Lectures: listLectureResponse,
          };
        })
      );
      const courseResponse = {
        Id: course[0].Id,
        Title: course[0].Title,
        Thumbnail_Large: course[0].Thumbnail_Large,
        Thumbnail_Medium: course[0].Thumbnail_Medium,
        Thumbnail_Small: course[0].Thumbnail_Small,
        Sub_Description: course[0].Sub_Description,
        Description: course[0].Description,
        Category: category[0],
        Language: language[0],
        Price: course[0].Price,
        Promote: promote[0] ? promote[0] : null,
        Content: content,
        Is_Completed: course[0].Is_Completed,
      };
      return {
        Code: getOneCourseResponseEnum.SUCCESS,
        resultResponse: courseResponse,
      };
    } catch (e) {
      console.log(e);
    }
  },
  async getMostView(request) {
    try {
      const listCourse = await courseRepository.getCourseMostView();
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
      };
    } catch (e) {
      console.log(e);
      return { Code: getAllCourseResponseEnum.SERVER_ERROR };
    }
  },
  async getMostRecent(request) {
    try {
      const listCourse = await courseRepository.getCourseMostRecent();
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
      };
    } catch (e) {
      console.log(e);
      return { Code: getAllCourseResponseEnum.SERVER_ERROR };
    }
  },
  async getMostRegister(request) {
    try {
      const listMostRegister =
        await enrolledcourseRepository.getCourseMostRegister();
      console.log(listMostRegister);
      const listCourse = await Promise.all(
        listMostRegister.map(async (item) => {
          let course = await _entityRepository("Courses").getEntity(
            item.Course_Id
          );
          return course[0];
        })
      );
      console.log(listCourse);
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
      };
    } catch (e) {
      console.log(e);
      return { Code: getAllCourseResponseEnum.SERVER_ERROR };
    }
  },
};
module.exports = courseService;
