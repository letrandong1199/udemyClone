const createOneWatchlistResponseEnum = require("../../api/validators/enums/watchlistEnums/createOneWatchlistResponseEnum");
const deleteOneWatchlistResponseEnum = require("../../api/validators/enums/watchlistEnums/deleteOneWatchlistResponseEnum");
const createOneWatchlistValidator = require("../../api/validators/watchlistValidators/createOneWatchlistValidator");
const deleteOneWatchlistValidator = require("../../api/validators/watchlistValidators/deleteOneWatchlistValidator");

const _entityRepository = require("../../repositories/entity.repository");
const operatorType = require("../../utils/enums/operatorType");

const watchlistService = {
  async createOneWatchlist(request) {
    try {
      const resultValidator = createOneWatchlistValidator.validate(
        request.id,
        request.body.Course_Id
      );
      if (!resultValidator.Isucess) {
        return { Code: resultValidator.Code };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.body.Course_Id
      );
      if (course.length == 0) {
        return { Code: createOneWatchlistResponseEnum.COURSE_IS_NOT_EXIST };
      }
      const newWatchlist = {
        User_Id: request.id,
        Course_Id: request.body.Course_Id,
      };
      const ret = await _entityRepository("Watch_Lists").addEntity(
        newWatchlist
      );
      if (ret === operatorType.FAIL.CREATE) {
        return { Code: createOneWatchlistResponseEnum.SERVER_ERROR };
      }
      return { Code: createOneWatchlistResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  async deleteOneWatchlist(request) {
    try {
      const resultValidator = deleteOneWatchlistValidator.validate(
        request.id,
        request.body.Course_Id,
        request.params.id
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      const watchlist = await _entityRepository("Watch_Lists").getEntity(
        request.params.id
      );
      if (watchlist.length == 0) {
        return { Code: deleteOneWatchlistResponseEnum.ID_IS_INVALID };
      }
      const course = await _entityRepository("Courses").getEntity(
        request.body.Course_Id
      );
      if (course.length == 0) {
        return { Code: deleteOneWatchlistResponseEnum.COURSE_ID_IS_INVALID };
      }
      if (
        (await _entityRepository("Watch_Lists").deleteEntity(
          request.params.id
        )) === operatorType.FAIL.DELETE
      ) {
        return { Code: deleteOneWatchlistResponseEnum.SERVER_ERROR };
      }
      return { Code: deleteOneWatchlistResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = watchlistService;
