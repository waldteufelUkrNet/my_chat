const express    = require('express'),
      controller = require('../controllers/gCardController.js'),
      router     = express.Router();

router.post('/leaveGroup', controller.leaveGroup);
router.delete('/deleteGroup', controller.deleteGroup);
router.post('/removeHistory', controller.removeHistory);

module.exports = router;