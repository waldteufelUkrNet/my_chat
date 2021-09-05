const express    = require('express'),
      controller = require('../controllers/renderController.js'),
      router     = express.Router();

router.get('/contactsList', controller.renderContactsList);
router.post('/chatsList', controller.renderChatsList);
router.get('/blackList', controller.renderBlackList);
router.post('/userCard', controller.renderUserCard);
router.post('/monoChat', controller.renderMonoChat);
router.post('/contactSubheader', controller.renderContactSubheader);

module.exports = router;