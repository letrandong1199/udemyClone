const jwt = require("jsonwebtoken");
const entityRepository = require("../../repositories/entity.repository");
const operatorType = require("../../utils/enums/operatorType");
require("dotenv").config();
module.exports = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      const Role = await entityRepository("Role").getEntity(payload.Role_Id);
      console.log(Role[0].Name);
      if (Role[0].Name != "Admin") {
        return res.json({ message: "Unauthorize" }).end();
      }
      req.id = payload.User_Id;
      next();
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: "Invalid_token" });
    }
  } else {
    return res.json({ message: "Token is not found" }).end();
  }
};
