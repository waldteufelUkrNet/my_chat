const express    = require('express'),
      controller = require('../controllers/authController.js'),
      router     = express.Router();

router.post("/login", controller.loginUser);
router.post("/register", controller.registerUser);
router.post("/existUser", controller.existUser);

module.exports = router;