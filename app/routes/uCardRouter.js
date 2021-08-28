const express    = require('express'),
      controller = require('../controllers/uCardController.js'),
      router     = express.Router();

router.post('/addToBlockList', controller.addToBlockList);
router.post('/removeFromBlockList', controller.removeFromBlockList);
router.post('/addToContacts', controller.addToContacts);
router.post('/removeFromContacts', controller.removeFromContacts);

module.exports = router;