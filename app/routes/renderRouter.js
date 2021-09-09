const express    = require('express'),
      controller = require('../controllers/renderController.js'),
      router     = express.Router();

router.get('/contactsList', controller.renderContactsList);
router.post('/chatsList', controller.renderChatsList);
router.get('/blackList', controller.renderBlackList);
router.post('/userCard', controller.renderUserCard);
router.post('/groupCard', controller.renderGroupCard);
router.post('/monoChat', controller.renderMonoChat);
router.post('/groupChat', controller.renderGroupChat);
router.post('/contactSubheader', controller.renderContactSubheader);
router.post('/groupSubheader', controller.renderGroupSubheader);
router.post('/loadGList', controller.renderGList);

module.exports = router;