const createOneRoleResponseEnum = require("../../api/validators/enums/roleEnums/createOneRoleResponseEnum");
const deleteOneRoleResponseEnum = require("../../api/validators/enums/roleEnums/deleteOneRoleResponseEnum");
const getAllRoleResponseEnum = require("../../api/validators/enums/roleEnums/getAllRoleResponseEnum");
const operatorType = require("../../utils/enums/operatorType");

const createOneRoleValidator = require("../../api/validators/roleValidators/createOneRoleValidator");
const deleteOneRoleValidator = require("../../api/validators/roleValidators/deleteOneRoleValidator");
const updateOneRoleValidator = require("../../api/validators/roleValidators/updateOneRoleValidator");

const roleRepository = require("../../repositories/role.repository");
const _entityRepository = require("../../repositories/entity.repository");
const updateOneRoleResponseEnum = require("../../api/validators/enums/roleEnums/updateOneRoleResponseEnum");
//require("dotenv").config();
const roleService = {
  //Update one Role
  async updateOneRole(request) {
    try {
      const resultValidator = updateOneRoleValidator.validate(
        request.params.id,
        request.body.Name
      );
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const role = await _entityRepository("Role").getEntity(request.params.id);
      console.log(role);
      if (role.length == 0) {
        return { Code: updateOneRoleResponseEnum.ID_IS_INVALID };
      }
      console.log(request.body.Name);
      const ret = await roleRepository.getRoleByName(request.body.Name);
      console.log("Ret:", ret);
      if (ret.length != 0) {
        return { Code: updateOneRoleResponseEnum.ROLE_NAME_IS_EXIST };
      }
      role[0].Name = request.body.Name;

      if (
        (await _entityRepository("Role").updateEntity(
          request.params.id,
          role[0]
        )) === operatorType.FAIL.UPDATE
      ) {
        return { Code: updateOneRoleResponseEnum.SERVER_ERROR };
      }
      return { Code: updateOneRoleResponseEnum.SUCCESS, newRole: role[0] };
    } catch (e) {
      console.log(e);
    }
  },

  //Get all Role
  async getAllRole() {
    try {
      const listRole = await _entityRepository("Role").getEntities();
      let listRoleResponse = listRole.map((role) => {
        return {
          Id: role.Id,
          Name: role.Name,
        };
      });
      return {
        Code: getAllRoleResponseEnum.SUCCESS,
        listAllResponse: listRoleResponse,
      };
    } catch (e) {
      console.log(e);
      return { Code: getAllRoleResponseEnum.SERVER_ERROR };
    }
  },
  //Delete one Role
  async deleteOneRole(request) {
    try {
      const resultValidator = deleteOneRoleValidator.validate(
        request.params.id
      );
      console.log(request.params.id);
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const role = await _entityRepository("Role").getEntity(request.params.id);
      console.log("Role:", role);
      if (role.length == 0) {
        return { Code: deleteOneRoleResponseEnum.ROLE_IS_NOT_EXIST };
      }
      if (
        (await _entityRepository("Role").deleteEntity(request.params.id)) ===
        operatorType.FAIL.DELETE
      ) {
        return { Code: deleteOneRoleResponseEnum.SERVER_ERROR };
      }
      return { Code: deleteOneRoleResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  //Create one Role
  async createOneRole(request) {
    try {
      const resultValidator = createOneRoleValidator.validate(request.Name);
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const role = await roleRepository.getRoleByName(request.Name);
      if (role.length != 0) {
        return { Code: createOneRoleResponseEnum.ROLE_IS_EXIST };
      }
      const newRole = {
        Name: request.Name,
      };
      ret = await _entityRepository("Role").addEntity(newRole);
      if (ret === operatorType.FAIL.CREATE) {
        return { Code: createOneRoleResponseEnum.SERVER_ERROR };
      }
      return { Code: createOneRoleResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = roleService;
