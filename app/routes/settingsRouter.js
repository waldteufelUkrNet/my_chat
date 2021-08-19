const express    = require('express'),
      controller = require('../controllers/settingsController.js'),
      router     = express.Router();

router.post("/checkOldPassword", controller.checkOldPassword);
router.post("/changePassword", controller.changePassword);
router.post("/changeUserName", controller.changeUserName);
router.post("/changeAva", controller.changeAva);

module.exports = router;