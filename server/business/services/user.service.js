const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const moment = require("moment");

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
const updateInfoValidator = require("../../api/validators/userValidators/updateInfoValidator");
const updateOneUserResponseEnum = require("../../api/validators/enums/userEnums/updateOneUserResponseEnum");
const getOneUserResponseEnum = require("../../api/validators/enums/userEnums/getOneUserResponseEnum");
const getOneUserValidator = require("../../api/validators/userValidators/getOneUserValidator");
const wishlistRepository = require("../../repositories/wishlist.repository");
const changePasswordResponseEnum = require("../../api/validators/enums/userEnums/changePasswordResponseEnum");
const changePasswordValidator = require("../../api/validators/userValidators/changePasswordValidator");
const redisClient = require("../../api/extensions/redis");
const { client } = require("../../api/extensions/redis");
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

      /*
      const listWishlist = await wishlistRepository.getWishlistByUserId(
        request.id
      );
      const listWishlistResponse = await Promise.all(
        listWishlist.map(async (wishlist) => {
          let course = await _entityRepository("Courses").getEntity(
            wishlist.Course_Id
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
      */

      const userResponse = {
        Id: user[0].Id,
        Email: user[0].Email,
        Name: user[0].Name,
        //Password: user[0].Password,
        //Wishlists: listWishlistResponse,
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
      const resultValidator = updateInfoValidator.validate(
        request.id,
        request.body.Name
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
      user[0].Name = request.body.Name;
      user[0].Updated_At = moment().format("YYYY-MM-DD");
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
        request.body.Name
      );
      console.log(request.body);
      if (!resultValidator.IsSuccess) {
        return { Code: resultValidator.Code };
      }
      const user = await _entityRepository("Users").getEntity(
        request.params.id
      );
      console.log(user);
      if (user.length == 0) {
        return { Code: updateOneUserResponseEnum.ID_IS_INVALID };
      }
      console.log(new Date());
      user[0].Name = request.body.Name;
      user[0].Updated_At = moment().format("YYYY-MM-DD");
      if (
        (await _entityRepository("Users").updateEntity(
          request.params.id,
          user[0]
        )) === operatorType.FAIL.UPDATE
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
  async signUp(request) {
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
      //Generate token
      const payload = {
        user: {
          Email: request.Email,
          Name: request.Name,
          Password: bcrypt.hashSync(request.Password, 8),
          Role_Id: roleOfUser[0].Id,
        },
      };

      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: 60 * 5,
      });
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "udemyclone2021@gmail.com", // generated ethereal user
          pass: "Udemyclone1234", // generated ethereal password
        },
      });
      const url = `https://udemy-apis.herokuapp.com/api/user-controller/confirm-email/${token}`;
      const mail = {
        from: "udemyclone2021@gmail.com",
        to: `${request.Name} <${request.Email}>`,
        subject: "Confirmation Email",
        html: `<h1>Welcome to Udemy Clone</h1>
        <h2>Hello ${request.Name}</h2>
        <h3>This confirmation email is going to be invalid in 5 minutes</h3>
        <p>Thank you for registering. Please confirm your email by clicking on the under button</p>
        <form action=${url} method="post">
          <button type="submit">Confirm</button>
          </form>
        </div>`,
      };
      transporter.sendMail(mail, (error, info) => {
        if (error) {
          console.log("Moaaaaaaaaaaa", error);
          return { Code: createOneUserResponseEnum.CONFIRM_IS_ERROR };
        }
      });
      return { Code: createOneUserResponseEnum.SUCCESS };
    } catch (e) {
      console.log("mMoaaaa", e);
      return { Code: createOneUserResponseEnum.SERVER_ERROR };
    }
  },
  //Confirm email
  async confirmEmail(request) {
    try {
      const decode = jwt.verify(request.params.token, process.env.SECRET_KEY);
      const time = Date.now();
      if (time >= decode.exp * 1000) {
        return { Code: createOneUserResponseEnum.TOKEN_IS_EXPIRED };
      } else {
        const newUser = {
          Email: decode.user.Email,
          Name: decode.user.Name,
          Password: decode.user.Password,
          Role_Id: decode.user.Role_Id,
        };
        ret = await _entityRepository("Users").addEntity(newUser);
        console.log(ret);
        // console.log(newUser);
        if (ret === operatorType.FAIL.CREATE) {
          return { Code: createOneUserResponseEnum.SERVER_ERROR };
        }
        return { Code: createOneUserResponseEnum.SUCCESS };
      }
    } catch (e) {
      console.log(e);
      return { Code: createOneUserResponseEnum.SERVER_ERROR };
    }
  },

  //Create one instructor
  async createOneInstructor(request) {
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
      const roleOfUser = await roleRepository.getRoleByName("Instructor");
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
      const refreshTokenLife = process.env.REFRESH_TOKEN_EXPIR || 60 * 60 * 24;
      const refreshToken = await jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_KEY,
        {
          expiresIn: refreshTokenLife,
        }
      );
      // Store refresh token in ...
      // Redis
      try {
        redisClient.set(refreshToken, JSON.stringify(payload), (err, reply) => {
          if (err) throw err;
          console.log(reply);
          redisClient.expire(refreshToken, refreshTokenLife, (err, reply) => {
            if (err) throw err;
            console.log(reply);
            redisClient.get(refreshToken, (err, reply) => {
              if (err) throw err;
              console.log(JSON.parse(reply));
            });
          })
        });
      } catch (error) {
        console.log(error);
      }

      // tokenList[refreshToken] = payload;
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
    console.log("Client: ", refreshToken);
    let payload = null;

    payload = await new Promise((resolve, reject) => {
      try {
        redisClient.get(refreshToken, (err, reply) => {
          payload = JSON.parse(reply);
          resolve(payload);
        });
      } catch (error) {
        reject(error);
      }

    })
    console.log('redis', payload);
    if (refreshToken && payload) {
      try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
        const token = await jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIR || 60 * 5,
        });
        return {
          Code: signInResponseEnum.SUCCESS,
          token: token,
          refreshToken: refreshToken,
        };
      } catch (error) {
        console.error(error);
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
  async rejectRefreshToken(req) {
    const { refreshToken } = req.body;
    console.log(req.body);
    try {
      redisClient.get(refreshToken, (err, reply) => {
        if (err) throw err;
        redisClient.del(refreshToken, (err, reply) => {
          console.log('reject', reply);
        })
      })
    } catch (error) {
      console.log(error);
    }

  },

  async changePassword(request) {
    try {
      const resultValidator = changePasswordValidator.validate(
        request.body.Password,
        request.body.New_Password
      );
      if (!resultValidator.Isuccess) {
        return { Code: resultValidator.Code };
      }
      const user = await _entityRepository("Users").getEntity(request.id);
      if (user.length == 0) {
        return { Code: changePasswordResponseEnum.USER_IS_NOT_EXIST };
      }
      if (!bcrypt.compareSync(request.body.Password, user[0].Password)) {
        return { Code: changePasswordResponseEnum.PASSWORD_IS_WRONG };
      }
      user[0].Password = bcrypt.hashSync(request.body.New_Password, 8);
      if (
        (await _entityRepository("Users").updateEntity(request.id, user[0])) ===
        operatorType.FAIL.UPDATE
      ) {
        return { Code: changePasswordResponseEnum.SERVER_ERROR };
      }
      return { Code: changePasswordResponseEnum.SUCCESS };
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = userService;
