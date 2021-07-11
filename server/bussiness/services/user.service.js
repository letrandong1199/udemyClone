const createOneUserValidator = require("../../api/validators/createOneUserValidator");
const signInValidator = require("../../api/validators/signInValidator");
const createOneUserResponseEnum = require("../../api/validators/enums/createOneUserResponseEnum");
const userRepository = require("../../repositories/user.repository");
const roleRepository = require("../../repositories/role.repository");
const operatorType = require("../../utils/enums/operatorType");
const _entityRepository = require("../../repositories/entity.repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signInResponseEnum = require("../../api/validators/enums/signInResponseEnum");
const { JsonWebTokenError } = require("jsonwebtoken");
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

  async signIn(request) {
    try {
      const resultValidator = signInValidator.validate(
        request.email,
        request.password
      );
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const user = await userRepository.getUserByEmail(request.email);
      console.log(user);
      if (user == "") {
        return { Code: signInResponseEnum.WRONG_EMAIL };
      }
      if (!bcrypt.compareSync(request.password, user[0].Password)) {
        return { Code: signInResponseEnum.WRONG_PASSWORD };
      }
      const payload = { Email: user[0].Email };
      return {
        Code: signInResponseEnum.SUCCESS,
        token: jwt.sign(payload, "SECRET_KEY", { expiresIn: 60 * 60 * 24 }),
      };
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = userServeice;
