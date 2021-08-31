const express    = require('express'),
      controller = require('../controllers/searchController.js'),
      router     = express.Router();

router.post("/userList", controller.searchInDB);

module.exports = router;