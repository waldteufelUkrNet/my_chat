const express    = require('express'),
      controller = require('../controllers/renderController.js'),
      router     = express.Router();

router.get("/contactsList", controller.renderContactsList);

module.exports = router;