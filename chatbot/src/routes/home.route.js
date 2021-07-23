const homeController = require('../controllers/home.controller');
const express = require('express');

homeRouter = express.Router();
homeRouter.get('/', homeController.homeGet);

module.exports = homeRouter;