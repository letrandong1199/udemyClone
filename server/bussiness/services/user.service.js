const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const operatorType = require("../../utils/enums/operatorType");
const createOneUserValidator = require("../../api/validators/userValidators/createOneUserValidator");
const signInValidator = require("../../api/validators/userValidators/signInValidator");
const deleteOneUserValidator = require("../../api/validators/userValidators/deleteOneUserValidator");

const createOneUserResponseEnum = require("../../api/validators/enums/userEnums/createOneUserResponseEnum");
const signInResponseEnum = require("../../api/validators/enums/userEnums/signInResponseEnum");
const deleteOneUserResponseEnum = require("../../api/validators/enums/userEnums/deleteOneUserResponseEnum");

const userRepository = require("../../repositories/user.repository");
const roleRepository = require("../../repositories/role.repository");
const _entityRepository = require("../../repositories/entity.repository");
const getAllUserResponseEnum = require("../../api/validators/enums/userEnums/getAllUserResponseEnum");
const updateOneUserValidator = require("../../api/validators/userValidators/updateOneUserValidator");
const updateOneUserResponseEnum = require("../../api/validators/enums/userEnums/updateOneUserResponseEnum");
const getOneUserResponseEnum = require("../../api/validators/enums/userEnums/getOneUserResponseEnum");
const getOneUserValidator = require("../../api/validators/userValidators/getOneUserValidator");
require("dotenv").config();
const tokenList = {};

const userService = {
  //Get one user
  async getOneUser(request) {
    try {
      const resultValidator = getOneUserValidator.validate(request.id);
      if (!resultValidator.IsSuccess) {
        return { Code: getOneUserResponseEnum.Code };
      }
      const user = await _entityRepository("Users").getEntity(request.id);
      if (user.length == 0) {
        return { Code: getOneUserResponseEnum.ID_IS_INVALID };
      }
      const userResponse = {
        Id: user[0].Id,
        Email: user[0].Email,
        Full_Name: user[0].Full_Name,
        Password: user[0].Password,
      };
      return {
        Code: getOneUserResponseEnum.SUCCESS,
        resultResponse: userResponse,
      };
    } catch (e) {
      console.log(e);
    }
  },
  //Update one user
  async updateOneUser(request) {
    try {
      const resultValidator = updateOneUserValidator.validate(
        request.id,
        request.body.fullname,
        request.body.password
      );
      console.log(request.body);
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const user = await _entityRepository("Users").getEntity(request.id);
      console.log(user);
      if (user.length == 0) {
        return { Code: updateOneUserResponseEnum.ID_IS_INVALID };
      }
      console.log(new Date());
      user[0].Full_Name = request.body.fullname;
      user[0].Password = bcrypt.hashSync(request.body.password);
      user[0].updated_at = new Date();
      if (
        (await _entityRepository("Users").updateEntity(request.id, user[0])) ===
        operatorType.FAIL.UPDATE
      ) {
        return { Code: updateOneUserResponseEnum.SERVER_ERROR };
      }
      return { Code: updateOneUserResponseEnum.SUCCESS, newUser: user[0] };
    } catch (e) {
      console.log(e);
    }
  },

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
      const resultValidator = deleteOneUserValidator.validate(
        request.params.id
      );
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const user = await _entityRepository("Users").getEntity(
        request.params.id
      );
      console.log(user);
      if (user.length == 0) {
        return { Code: deleteOneUserResponseEnum.ID_IS_NOT_EXIST };
      }
      if (
        (await _entityRepository("Users").deleteEntity(request.params.id)) ===
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
    console.log("I'm here");
    try {
      const resultValidator = createOneUserValidator.validate(
        request.email,
        request.name,
        request.password
        // request.roleOfUser
      );
      //console.log(resultValidator.IsSuccess);
      if (!resultValidator.IsSuccess) {
        console.log(resultValidator, "in user.service");
        return { Code: resultValidator.Code };
      }
      console.log("Now, I'm in the door of repository");
      var user = await userRepository.getUserByEmail(request.email);
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
        Full_Name: request.name,
        Password: bcrypt.hashSync(request.password, 8),
        Role_Id: 1,
      };
      ret = await _entityRepository("Users").addEntity(newUser);
      console.log(ret);
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
      if (user.length == 0) {
        return { Code: signInResponseEnum.WRONG_EMAIL };
      }
      if (!bcrypt.compareSync(request.password, user[0].Password)) {
        return { Code: signInResponseEnum.WRONG_PASSWORD };
      }
      const payload = {
        User_Id: user[0].Id,
        Email: user[0].Email,
        Role_Id: user[0].Role_Id,
      };

      const jwToken = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIR || 60 * 5,
      });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIR || 60 * 60 * 24,
      });
      // Store refresh token in ...
      tokenList[refreshToken] = payload;
      return {
        Code: signInResponseEnum.SUCCESS,
        token: jwToken,
        refreshToken: refreshToken,
      };
    } catch (e) {
      console.log(e);
    }
  },

  async refreshToken(req) {
    const { refreshToken } = req.body;
    if ((refreshToken) && (refreshToken in tokenList)) {
      try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
        const payload = tokenList[refreshToken];
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIR || 60 * 5,
        });
        return {
          token,
        }

      } catch (error) {
        console.error(err);
        return {
          Code: 'Invalid refresh token',
        }
      }

    } else {
      return {
        Code: 'Invalid request',
      }
    }

  },
};
module.exports = userService;
