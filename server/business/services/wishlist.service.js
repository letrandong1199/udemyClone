const createOneWishlistResponseEnum = require("../../api/validators/enums/wishlistEnums/createOneWishlistResponseEnum");
const deleteOneWishlistResponseEnum = require("../../api/validators/enums/wishlistEnums/deleteOneWishlistResponseEnum");
const getWishlistCourseResponseEnum = require("../../api/validators/enums/wishlistEnums/getWishlistCourseResponseEnum");
const createOneWishlistValidator = require("../../api/validators/wishlistValidators/createOneWishlistValidator");
const deleteOneWishlistValidator = require("../../api/validators/wishlistValidators/deleteOneWishlistValidator");

const _entityRepository = require("../../repositories/entity.repository");
const wishlistRepository = require("../../repositories/wishlist.repository");
const operatorType = require("../../utils/enums/operatorType");

const wishlistService = {
  async createOneWishlist(request) {
    try {
      const resultValidator = createOneWishlistValidator.validate(
        request.id,
        request.body.Course_Id
      );
      if (!resultValidator.ISuccess) {
        return { Code: resultValidator.Code };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.body.Course_Id
      );
      if (course.length == 0) {
        return { Code: createOneWishlistResponseEnum.COURSE_IS_NOT_EXIST };
      }
      const newWishlist = {
        User_Id: request.id,
        Course_Id: request.body.Course_Id,
      };
      const ret = await _entityRepository("Wishlists").addEntity(newWishlist);
      if (ret === operatorType.FAIL.CREATE) {
        return { Code: createOneWishlistResponseEnum.SERVER_ERROR };
      }
      return { Code: createOneWishlistResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  async deleteOneWishlist(request) {
    try {
      const resultValidator = deleteOneWishlistValidator.validate(
        request.id,
        request.params.id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      const wishlist = await wishlistRepository.getWishlistByUserIdAndCourseId({
        User_Id: request.id,
        Course_Id: request.params.id,
      });
      if (wishlist.length == 0) {
        return { Code: deleteOneWishlistResponseEnum.ID_IS_INVALID };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.body.Course_Id
      );
      if (course.length == 0) {
        return { Code: deleteOneWishlistResponseEnum.COURSE_ID_IS_INVALID };
      }
      if (
        (await wishlistRepository.deleteWishlistByUserIdAndCourseId({
          User_Id: request.id,
          Course_Id: request.params.id,
        })) === operatorType.FAIL.DELETE
      ) {
        return { Code: deleteOneWishlistResponseEnum.SERVER_ERROR };
      }
      return { Code: deleteOneWishlistResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },

  async getAllWishlists(request) {
    const { id } = request;
    console.log(request.body);
    try {
      let listCourse = await wishlistRepository.getWishlistByUser(id);
      /*if (listCourse === undefined || listCourse) {
        listCourse = []
      }*/
      console.log(listCourse);
      const listAllCourseResponse = await Promise.all(
        listCourse.map(async (course) => {
          let category = await _entityRepository("Categories").getEntity(
            course.Category_Id
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
            Language_Id: course.Language_Id,
          };
        })
      );

      return {
        Code: getWishlistCourseResponseEnum.SUCCESS,
        listAllResponse: listAllCourseResponse,
      };
    } catch (e) {
      console.log(e);
      return { Code: getWishlistCourseResponseEnum.SERVER_ERROR };
    }
  },
};
module.exports = wishlistService;
