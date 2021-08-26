const express    = require('express'),
      controller = require('../controllers/searchController.js'),
      router     = express.Router();

router.post("/user", controller.searchInDB);
router.post("/ava", controller.searchAva);


module.exports = router;