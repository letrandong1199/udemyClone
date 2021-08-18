const createOneMediaUserResponseEnum = require("../../api/validators/enums/mediauserEnums/createOneMediaUserResponseEnum");
const getOneMediaUserResponseEnum = require("../../api/validators/enums/mediauserEnums/getOneMediaUserResponseEnum");
const createOneMediaUserValidator = require("../../api/validators/mediauserValidators/createOneMediaUserValidator");

const _entityRepository = require("../../repositories/entity.repository");
const mediaUserRepository = require("../../repositories/mediauser.repository");
const operatorType = require("../../utils/enums/operatorType");
const mediaUserService = {
  async createOneMediaUser(request) {
    console.log(request.body);
    try {
      const resultValidator = createOneMediaUserValidator.validate(
        request.body.Media_Id,
        request.id,
        request.body.Played
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      if (request.body.Played == undefined) {
        request.body.Played = 0;
      }
      const media = _entityRepository("Media").getEntity(request.body.Media_Id);
      if (media.length == 0) {
        return { Code: createOneMediaUserResponseEnum.MEDIA_IS_NOT_EXIST };
      }
      const media_user = await mediaUserRepository.getPlayedByUserIdAndMediaId({
        User_Id: request.id,
        Media_Id: request.body.Media_Id,
      });
      console.log(media_user);
      if (media_user.length == 0) {
        console.log("heheheehehehehehh");
        var newMediaUser = {
          User_Id: request.id,
          Media_Id: request.body.Media_Id,
          Played: request.body.Played,
          Is_Completed: request.body.IsCompleted || false,
        };
        if (
          (await mediaUserRepository.addMediaUser(newMediaUser)) ===
          operatorType.FAIL.CREATE
        ) {
          return { Code: createOneMediaUserResponseEnum.SERVER_ERROR };
        }
        return { Code: createOneMediaUserResponseEnum.SUCCESS };
      } else {
        media_user[0].Played = request.body.Played;
        media_user[0].Is_Completed = request.body.Is_Completed;
        console.log('Cap nhat ne');
        if (
          (await mediaUserRepository.updatePlayedByUserIdAndMediaId(
            { User_Id: request.id, Media_Id: request.body.Media_Id },
            media_user[0]
          )) === operatorType.FAIL.UPDATE
        ) {
          return { Code: createOneMediaUserResponseEnum.SERVER_ERROR };
        }
        return { Code: createOneMediaUserResponseEnum.SUCCESS };
      }
    } catch (e) {
      console.log(e);
    }
  },
  async getOneMediaUser(request) {
    try {
      const media_user = await mediaUserRepository.getPlayedByUserIdAndMediaId({
        User_Id: request.id,
        Media_Id: request.params.id,
      });
      if (media_user.length == 0) {
        return { Code: getOneMediaUserResponseEnum.MEDIA_USER_IS_NOT_EXISTS };
      }
      console.log(media_user[0]);
      return {
        Code: getOneMediaUserResponseEnum.SUCCESS,
        resultResponse: media_user[0].Played,
      };
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = mediaUserService;
