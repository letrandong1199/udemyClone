const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userController = require("./api/controller/user.controller");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());
const PORT = 3000 || process.env.PORT;
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api/user-controller", userController);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
