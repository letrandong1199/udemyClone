const updateOnePublicInfoResponseEnum = require("../../api/validators/enums/publicInfoEnums/updateOnePublicInfoResponseEnum");
const publicInfoRepository = require("../../repositories/publicinfo.repository");
const _entityRepository = require("../../repositories/entity.repository");
const operatorType = require("../../utils/enums/operatorType");
const getPublicInfoResponseEnum = require("../../api/validators/enums/publicInfoEnums/getPublicInfoResponseEnum");
const publicInfoService = {
  async updateOnePublicInfo(request) {
    try {
      const publicInfo = await publicInfoRepository.getPublicInfoByUserId(
        request.id
      );
      if (publicInfo.length == 0) {
        let newPublicInfo = {
          User_Id: request.id,
          Description: "",
        };
        if (
          (await publicInfoRepository.addPublicInfo(newPublicInfo)) ===
          operatorType.FAIL.CREATE
        ) {
          return { Code: updateOnePublicInfoResponseEnum.SERVER_ERROR };
        }
        return { Code: updateOnePublicInfoResponseEnum.SUCCESS };
      } else {
        console.log(request.body.Description);
        if (request.body.Description) {
          publicInfo[0].Description = request.body.Description;
        }
        if (
          (await publicInfoRepository.updatePublicInfoByUserId(
            request.id,
            publicInfo[0]
          )) === operatorType.FAIL.UPDATE
        ) {
          return { Code: updateOnePublicInfoResponseEnum.SERVER_ERROR };
        }
        return { Code: updateOnePublicInfoResponseEnum.SUCCESS };
      }
    } catch (e) {
      console.log(e);
    }
  },
  async getPublicInfo(request) {
    try {
      const user = await _entityRepository("Users").getEntity(request.id);
      if (user.length == 0) {
        return { Code: getPublicInfoResponseEnum.USER_IS_NOT_EXISTS };
      }
      const publicInfo = await publicInfoRepository.getPublicInfoByUserId(
        request.id
      );
      if (publicInfo.length == 0) {
        return { Code: getPublicInfoResponseEnum.PUBLIC_INFO_IS_NOT_EXISTS };
      }
      console.log(publicInfo);
      return {
        Code: getPublicInfoResponseEnum.SUCCESS,
        resultResponse: publicInfo[0].Description,
      };
    } catch (e) {
      console.log(e);
      return { Code: getPublicInfoResponseEnum.SERVER_ERROR };
    }
  },
};
module.exports = publicInfoService;
