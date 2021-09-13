const express    = require('express'),
      controller = require('../controllers/renderController.js'),
      router     = express.Router();

router.get('/contactsList', controller.renderContactsList);
router.get('/contactsListGroupPopup', controller.contactsListGroupPopup);
router.post('/contactsListGroupPopup', controller.contactsListGroupPopupPost);
router.post('/membersListGroupPopup', controller.membersListGroupPopup);
router.post('/chatsList', controller.renderChatsList);
router.get('/blackList', controller.renderBlackList);
router.post('/userCard', controller.renderUserCard);
router.post('/groupCard', controller.renderGroupCard);
router.post('/monoChat', controller.renderMonoChat);
router.post('/groupChat', controller.renderGroupChat);
router.post('/contactSubheader', controller.renderContactSubheader);
router.post('/groupSubheader', controller.renderGroupSubheader);
router.post('/loadGList', controller.renderGList);
router.post('/matchedIDList', controller.matchedIDList);

module.exports = router;