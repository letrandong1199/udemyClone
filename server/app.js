const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userController = require("./api/controller/user.controller");
const roleController = require("./api/controller/role.controller");
const categoryController = require("./api/controller/category.controller");
const languageController = require("./api/controller/language.controller");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000 || process.env.PORT;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api/user-controller", userController);
app.use("/api/role-controller", roleController);
app.use("/api/category-controller", categoryController);
app.use("/api/language-controller", languageController);

app.get("/err", function (req, res) {
  throw new Error("Error!!!");
});
app.use(function (req, res, next) {
  res.status(404).json({
    error_message: "Endpoint not found",
  });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    error_message: "Something broke !!!!!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
