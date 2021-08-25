const express    = require('express'),
      controller = require('../controllers/testController.js'),
      router     = express.Router();

router.use("/test", controller.test);

module.exports = router;