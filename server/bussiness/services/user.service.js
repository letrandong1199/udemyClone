const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const operatorType = require("../../utils/enums/operatorType");
const createOneUserValidator = require("../../api/validators/createOneUserValidator");
const signInValidator = require("../../api/validators/signInValidator");
const deleteOneUserValidator = require("../../api/validators/deleteOneUserValidator");

const createOneUserResponseEnum = require("../../api/validators/enums/createOneUserResponseEnum");
const signInResponseEnum = require("../../api/validators/enums/signInResponseEnum");
const deleteOneUserResponseEnum = require("../../api/validators/enums/deleteOneUserResponseEnum");

const userRepository = require("../../repositories/user.repository");
const roleRepository = require("../../repositories/role.repository");
const _entityRepository = require("../../repositories/entity.repository");
const getAllUserResponseEnum = require("../../api/validators/enums/getAllUserResponseEnum");
require("dotenv").config();
const userService = {
  //Get all User
  async getAllUser() {
    try {
      const listUser = await _entityRepository("Users").getEntities();
      console.log(listUser.length);
      //let listUserResponse = [];
      //console.log(listUser);

      let listUserResponse = await Promise.all(
        listUser.map(async (user) => {
          let roleOfUser = await _entityRepository("Role").getEntity(
            user.Role_Id
          );
          return {
            Email: user.Id,
            Full_Name: user.Full_Name,
            Role: roleOfUser[0].Name,
          };
        })
      );
      console.log(listUserResponse);

      // for (user of listUser) {
      //   let roleOfUser = await _entityRepository("Role").getEntity(
      //     user.Role_Id
      //   );
      //   listUserResponse.push({
      //     Id: user.Id,
      //     Email: user.Email,
      //     Full_Name: user.Full_Name,
      //     Role: roleOfUser[0].Name,
      //   });
      // }
      return {
        Code: getAllUserResponseEnum.SUCCESS,
        listAllResponse: listUserResponse,
      };
    } catch (e) {
      console.log(e);
      return { Code: getAllUserResponseEnum.SERVER_ERROR };
    }
  },
  //Delete one user
  async deleteOneUser(request) {
    try {
      const resultValidator = deleteOneUserValidator.validate(request.email);
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const user = await userRepository.getUserByEmail(request.email);
      console.log(user);
      if (user[0] == null) {
        return { Code: deleteOneUserResponseEnum.EMAIL_IS_NOT_EXIST };
      }
      if (
        (await userRepository.deleteUserByEmail(request.email)) ===
        operatorType.FAIL.DELETE
      ) {
        return { Code: deleteOneUserResponseEnum.SERVER_ERROR };
      }
      return { Code: deleteOneUserResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
  //Create one user
  async createOneUser(request) {
    try {
      const resultValidator = createOneUserValidator.validate(
        request.email,
        request.fullname,
        request.password
        //request.roleOfUser
      );
      //console.log(resultValidator.IsSuccess);
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      var user = await userRepository.getUserByEmail(request.email);
      console.log(`Useerrrrrrrrrrrr`, user);
      if (user != "") {
        return { Code: createOneUserResponseEnum.EMAIL_IS_EXIST };
      }
      // const roleOfUser = await roleRepository.getRoleByName(request.roleOfUser);
      // if (roleOfUser == "") {
      //   return { Code: createOneUserResponseEnum.ROLE_OFUSER_IS_INVALID };
      // }
      // console.log(roleOfUser[0]);
      const newUser = {
        Email: request.email,
        Full_Name: request.fullname,
        Password: bcrypt.hashSync(request.password, 8),
        // Role_Id: roleOfUser[0].Id,
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
  //Sign in
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
      const payload = { User_Id: user[0].Id, Email: user[0].Email };
      return {
        Code: signInResponseEnum.SUCCESS,
        token: jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 60 * 60 * 24,
        }),
      };
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = userService;
