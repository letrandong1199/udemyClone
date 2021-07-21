const createOneLanguageResponseEnum = require("../../api/validators/enums/languageEnums/createOneLanguageResponseEnum");
const deleteOneLanguageResponseEnum = require("../../api/validators/enums/languageEnums/deleteOneLanguageResponseEnum");
const getAllLanguageResponseEnum = require("../../api/validators/enums/languageEnums/getAllLanguageResponseEnum");
const operatorType = require("../../utils/enums/operatorType");

const createOneLanguageValidator = require("../../api/validators/languageValidators/createOneLanguageValidator");
const deleteOneLanguageValidator = require("../../api/validators/languageValidators/deleteOneLanguageValidator");

const languageRepository = require("../../repositories/language.repository");
const _entityRepository = require("../../repositories/entity.repository");
//require("dotenv").config();
const languageService = {
  //Get all Language
  async getAllLanguage() {
    try {
      const listLanguage = await _entityRepository("Languages").getEntities();
      let listLanguageResponse = listLanguage.map((language) => {
        return {
          Id: language.Id,
          Name: language.Name,
        };
      });
      return {
        Code: getAllLanguageResponseEnum.SUCCESS,
        listAllResponse: listLanguageResponse,
      };
    } catch (e) {
      console.log(e);
      return { Code: getAllLanguageResponseEnum.SERVER_ERROR };
    }
  },
  //Delete one Language
  async deleteOneLanguage(request) {
    try {
      const resultValidator = deleteOneLanguageValidator.validate(
        request.params.id
      );
      console.log(request.params.id);
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const language = await _entityRepository("Languages").getEntity(
        request.params.id
      );
      console.log("Language:", language);
      if (role.length == 0) {
        return { Code: deleteOneLanguageResponseEnum.LANGUAGE_IS_NOT_EXIST };
      }
      if (
        (await _entityRepository("Languages").deleteEntity(
          request.params.id
        )) === operatorType.FAIL.DELETE
      ) {
        return { Code: deleteOneLanguageResponseEnum.SERVER_ERROR };
      }
      return { Code: deleteOneLanguageResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  //Create one Language
  async createOneRole(request) {
    try {
      const resultValidator = createOneLanguageValidator.validate(request.name);
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const language = await languageRepository.getLanguageByName(request.name);
      if (language.length != 0) {
        return { Code: createOneLanguageResponseEnum.LANGUAGE_IS_EXIST };
      }
      const newLanguage = {
        Name: request.name,
      };
      ret = await _entityRepository("Languages").addEntity(newLanguage);
      if (ret === operatorType.FAIL.CREATE) {
        return { Code: createOneLanguageResponseEnum.SERVER_ERROR };
      }
      return { Code: createOneLanguageResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = languageService;
