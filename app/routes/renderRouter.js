const express    = require('express'),
      controller = require('../controllers/renderController.js'),
      router     = express.Router();

router.get("/contactsList", controller.renderContactsList);
router.get("/blackList", controller.renderBlackList);
router.post("/userCard", controller.renderUserCard);

module.exports = router;