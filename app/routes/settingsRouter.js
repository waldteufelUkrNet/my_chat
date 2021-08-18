const express    = require('express'),
      controller = require('../controllers/settingsController.js'),
      router     = express.Router();

router.post("/checkOldPassword", controller.checkOldPassword);
router.post("/changePassword", controller.changePassword);

module.exports = router;