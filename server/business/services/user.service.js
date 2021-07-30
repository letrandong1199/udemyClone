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
const watchlistRepository = require("../../repositories/watchlist.repository");
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
      const listWatchlist = await watchlistRepository.getWatchlistByUserId(
        request.id
      );
      const listWatchlistResponse = await Promise.all(
        listWatchlist.map(async (watchlist) => {
          let course = await _entityRepository("Courses").getEntity(
            watchlist.Course_Id
          );
          let category = await _entityRepository("Categories").getEntity(
            course[0].Category_Id
          );
          let author = await _entityRepository("Users").getEntity(
            course[0].Author_Id
          );
          return {
            Course_Id: course[0].Id,
            Name: course[0].Title,
            Image: course[0].Thumbnail_Small,
            Author: author[0].Name,
            Category: category[0].Name,
            Sub_Description: course.Sub_Description,
            //Promote: promote[0].Promote,
          };
        })
      );
      const userResponse = {
        Id: user[0].Id,
        Email: user[0].Email,
        Name: user[0].Name,
        Password: user[0].Password,
        Watch_Lists: listWatchlistResponse,
      };
      console.log(userResponse);
      return {
        Code: getOneUserResponseEnum.SUCCESS,
        resultResponse: userResponse,
      };
    } catch (e) {
      console.log(e);
    }
  },
  //Update one user
  async updateInfo(request) {
    try {
      const resultValidator = updateOneUserValidator.validate(
        request.id,
        request.body.Name,
        request.body.Password
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
      user[0].Name = request.body.Name;
      user[0].Password = bcrypt.hashSync(request.body.Password);
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

  async updateOneUser(request) {
    try {
      const resultValidator = updateOneUserValidator.validate(
        request.params.id,
        request.body.Name,
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
      user[0].Name = request.body.Name;
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
            Id: user.Id,
            Email: user.Email,
            Name: user.Name,
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
        request.Email,
        request.Name,
        request.Password
      );
      //console.log(resultValidator.IsSuccess);
      if (!resultValidator.IsSuccess) {
        console.log(resultValidator, "in user.service");
        return { Code: resultValidator.Code };
      }
      console.log("Now, I'm in the door of repository");
      var user = await userRepository.getUserByEmail(request.Email);
      if (user != "") {
        return { Code: createOneUserResponseEnum.EMAIL_IS_EXIST };
      }
      const roleOfUser = await roleRepository.getRoleByName("User");
      if (roleOfUser.length == 0) {
        return { Code: createOneUserResponseEnum.ROLE_OFUSER_IS_INVALID };
      }
      console.log(roleOfUser[0]);
      const newUser = {
        Email: request.Email,
        Name: request.Name,
        Password: bcrypt.hashSync(request.Password, 8),
        Role_Id: roleOfUser[0].Id,
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
        request.Email,
        request.Password
      );
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const user = await userRepository.getUserByEmail(request.Email);
      if (user.length == 0) {
        return { Code: signInResponseEnum.WRONG_EMAIL };
      }
      if (!bcrypt.compareSync(request.Password, user[0].Password)) {
        return { Code: signInResponseEnum.WRONG_PASSWORD };
      }
      const payload = {
        User_Id: user[0].Id,
        Email: user[0].Email,
        Role_Id: user[0].Role_Id,
      };

      const jwToken = await jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIR || 60 * 2,
      });
      const refreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIR || 60 * 60 * 24,
      });
      // Store refresh token in ...
      tokenList[refreshToken] = payload;
      console.log(jwToken);
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
    console.log('Client: ', refreshToken);
    if (refreshToken && refreshToken in tokenList) {
      try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
        const payload = tokenList[refreshToken];
        const token = await jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIR || 60 * 2,
        });
        return {
          Code: signInResponseEnum.SUCCESS,
          token: token,
          refreshToken: refreshToken,
        };
      } catch (error) {
        console.error(err);
        return {
          Code: "Invalid refresh token",
        };
      }
    } else {
      return {
        Code: "Invalid request",
      };
    }
  },
};
module.exports = userService;
