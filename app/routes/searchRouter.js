const express    = require('express'),
      controller = require('../controllers/searchController.js'),
      router     = express.Router();

router.post("/", controller.searchInDB);


module.exports = router;