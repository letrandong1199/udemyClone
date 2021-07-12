const jwt = require("jsonwebtoken");
const entityRepository = require("../../repositories/entity.repository");
const operatorType = require("../../utils/enums/operatorType");
require("dotenv").config();
module.exports = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      console.log(payload);
      if (
        (await entityRepository("Role").getEntity(payload.User_Id)) ===
        operatorType.FAIL.READ
      ) {
        return res.json({ Code: "Unauthorized" }).end();
      }
    } catch (e) {
      console.log(e);
      return res.json({ message: "Somethingwrong" });
    }
  }
  next();
};
