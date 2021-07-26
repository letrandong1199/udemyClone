const createOnePromoteResponseEnum = require("../../api/validators/enums/promoteEnums/createOnePromoteResponseEnum");
const deleteOnePromoteResponseEnum = require("../../api/validators/enums/promoteEnums/deleteOnePromoteResponseEnum");
const getAllPromoteResponseEnum = require("../../api/validators/enums/promoteEnums/getAllPromoteResponseEnum");
const operatorType = require("../../utils/enums/operatorType");

const createOnePromoteValidator = require("../../api/validators/promoteValidators/createOnePromoteValidator");
const deleteOnePromoteValidator = require("../../api/validators/promoteValidators/deleteOnePromoteValidator");

const _entityRepository = require("../../repositories/entity.repository");
const promoteRepository = require("../../repositories/promote.repository");
const promoteService = {
  //Get all Promote
  async getAllPromote() {
    try {
      const listPromote = await _entityRepository("Promotes").getEntities();
      let listPromoteResponse = listPromote.map((promote) => {
        return {
          Id: Promote.Id,
          Promote: promote.Promote,
          Start_Time: promote.Start_Time,
          End_Time: promote.End_Time,
        };
      });
      return {
        Code: getAllPromoteResponseEnum.SUCCESS,
        listAllResponse: listPromoteResponse,
      };
    } catch (e) {
      console.log(e);
      return { Code: getAllPromoteResponseEnum.SERVER_ERROR };
    }
  },
  //Delete one Promote
  async deleteOnePromote(request) {
    try {
      const resultValidator = deleteOnePromoteValidator.validate(
        request.params.id
      );
      console.log(request.params.id);
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const promote = await _entityRepository("Promotes").getEntity(
        request.params.id
      );
      console.log("Promote:", promote);
      if (promote.length == 0) {
        return { Code: deleteOnePromoteResponseEnum.PROMOTE_IS_NOT_EXIST };
      }
      if (
        (await _entityRepository("Promotes").deleteEntity(
          request.params.id
        )) === operatorType.FAIL.DELETE
      ) {
        return { Code: deleteOnePromoteResponseEnum.SERVER_ERROR };
      }
      return { Code: deleteOnePromoteResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  //Create one Promote
  async createOnePromote(request) {
    try {
      const resultValidator = createOnePromoteValidator.validate(
        request.promote
      );
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const promote = await promoteRepository.getPromoteByPromote(
        request.promote
      );
      if (promote.length != null) {
        return { Code: createOnePromoteResponseEnum.Promote_IS_EXIST };
      }
      const newPromote = {
        Promote: request.promote,
        Start_Time: new Date(),
      };
      console.log(newPromote);
      ret = await _entityRepository("Promotes").addEntity(newPromote);
      console.log(ret);
      if (ret === operatorType.FAIL.CREATE) {
        return { Code: createOnePromoteResponseEnum.SERVER_ERROR };
      }
      return { Code: createOnePromoteResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = promoteService;
