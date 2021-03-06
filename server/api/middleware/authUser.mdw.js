const jwt = require("jsonwebtoken");
const operatorType = require("../../utils/enums/operatorType");
require("dotenv").config();
module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(token);
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      req.id = payload.User_Id;
      console.log('I here');
      next();
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: "Invalid_token" });
    }
  } else {
    return res.json({ message: "Token is not found" }).end();
  }
};
