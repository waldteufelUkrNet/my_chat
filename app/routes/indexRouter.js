const express    = require("express"),
      controller = require("../controllers/indexController.js"),
      router     = express.Router();

router.get("/", controller.index);

module.exports = router;