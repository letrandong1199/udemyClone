const createOneUserValidator = require("../../api/validators/createOneUserValidator");
const createOneUserResponseEnum = require("../../api/validators/enums/createOneUserResponseEnum");
const userRepository = require("../../repositories/user.repository");
const roleRepository = require("../../repositories/role.repository");
const operatorType = require("../../utils/enums/operatorType");
const _entityRepository = require("../../repositories/entity.repository");
const bcrypt = require("bcryptjs");
const userServeice = {
  async createOneUser(request) {
    try {
      const resultValidator = createOneUserValidator.validate(
        request.email,
        request.fullname,
        request.password,
        request.roleOfUser
      );
      //console.log(resultValidator.IsSuccess);
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      var user = await userRepository.getUserByEmail(request.email);
      //console.log(user);
      if (user != "") {
        return { Code: createOneUserResponseEnum.EMAIL_IS_EXIST };
      }
      const roleOfUser = await roleRepository.getRoleByName(request.roleOfUser);
      if (roleOfUser == "") {
        return { Code: createOneUserResponseEnum.ROLE_OFUSER_IS_INVALID };
      }
      // console.log(roleOfUser[0]);
      const newUser = {
        Email: request.email,
        Full_Name: request.fullname,
        Password: bcrypt.hashSync(request.password, 8),
        Role_Id: roleOfUser[0].Id,
      };
      ret = await _entityRepository("Users").addEntity(newUser);
      // console.log(ret);
      // console.log(newUser);
      if (ret === operatorType.FAIL.CREATE) {
        return { Code: createOneUserResponseEnum.SERVER_ERROR };
      }
      return { Code: createOneUserResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = userServeice;
