const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userController = require("./api/controller/user.controller");
const roleController = require("./api/controller/role.controller");
const categoryController = require("./api/controller/category.controller");
const languageController = require("./api/controller/language.controller");
const promoteController = require("./api/controller/promote.controller");
const courseController = require("./api/controller/course.controller");
const sectionController = require("./api/controller/section.controller");
const lectureController = require("./api/controller/lecture.controller");
const mediaController = require("./api/controller/media.controller");
const feedbackController = require("./api/controller/feedback.controller");
const wishlistController = require("./api/controller/wishlist.controller");
const enrolledcourseController = require("./api/controller/enrolledcourse.controller");
const mediaUserController = require("./api/controller/mediauser.controller");
const publicInfoController = require("./api/controller/publicinfo.controller");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
// app.use(
//   express.urlencoded({
//     limit: "100mb",
//     extended: true,
//     parameterLimit: 100000000,
//   })
// );
var PORT = process.env.PORT || 8080;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api/user-controller", userController);
app.use("/api/role-controller", roleController);
app.use("/api/category-controller", categoryController);
app.use("/api/language-controller", languageController);
app.use("/api/promote-controller", promoteController);
app.use("/api/course-controller", courseController);
app.use("/api/section-controller", sectionController);
app.use("/api/lecture-controller", lectureController);
app.use("/api/media-controller", mediaController);
app.use("/api/feedback-controller", feedbackController);
app.use("/api/wishlist-controller", wishlistController);
app.use("/api/enrolled-course-controller", enrolledcourseController);
app.use("/api/media-user-controller", mediaUserController);
app.use("/api/public-info-controller", publicInfoController);

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
