const express    = require('express'),
      controller = require('../controllers/chatController.js'),
      router     = express.Router();

router.post('/sendMessageToServer', controller.getMessageFromClient);
router.post('/changeMessageStatus', controller.changeMessageStatus);

module.exports = router;