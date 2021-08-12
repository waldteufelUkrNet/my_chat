const express    = require('express'),
      controller = require('../controllers/authController.js'),
      router     = express.Router();

router.use("/login", controller.loginUser);
router.use("/register", controller.registerUser);

module.exports = router;