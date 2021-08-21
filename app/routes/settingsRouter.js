const express    = require('express'),
      config     = require('../config'),
      controller = require('../controllers/settingsController.js'),
      multer     = require('multer'),
      router     = express.Router();

const storageConfig = multer.diskStorage({
        destination : (req, res, cb) => {
          cb(null, config.get('avatarPath'));
        },
        filename    : (req, res, cb) => {
          cb(null, req.session.user._id + '.jpg');
        }
      });

const upload = multer({storage:storageConfig});

router.post('/checkOldPassword', controller.checkOldPassword);
router.post('/changePassword', controller.changePassword);
router.post('/changeUserName', controller.changeUserName);
router.post('/changeAva', upload.single('ava'), controller.changeAva);

module.exports = router;