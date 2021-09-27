const express    = require('express'),
      controller = require('../controllers/chatController.js'),
      router     = express.Router();

router.post('/', controller.getMessageFromClient);

module.exports = router;