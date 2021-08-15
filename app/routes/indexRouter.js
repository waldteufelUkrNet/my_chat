const express = require("express");
const indexController = require("../controllers/indexController.js");
const indexRouter = express.Router();

indexRouter.get("/", indexController.index);

module.exports = indexRouter;