const express    = require('express'),
      config     = require('../config'),
      controller = require('../controllers/settingsController.js'),
      multer     = require('multer'),
      router     = express.Router();

const storageConfig = multer.diskStorage({
        destination : (req, res, cb) => {
          cb(null, config.get('avatarPathFromServer'));
        },
        filename    : (req, res, cb) => {
          cb(null, req.session.user._id + '.jpg');
        }
      });

const storageGroupConfig = multer.diskStorage({
        destination : (req, res, cb) => {
          cb(null, config.get('avatarPathFromServer'));
        },
        filename    : (req, res, cb) => {
          cb(null, req.header('group') + '.jpg');
        }
      });

const upload = multer({storage:storageConfig});
const uploadGroup = multer({storage:storageGroupConfig});

router.post('/checkOldPassword', controller.checkOldPassword);
router.post('/changePassword', controller.changePassword);
router.post('/changeUserName', controller.changeUserName);
router.post('/manageGroup', controller.manageGroup);
router.post('/changeAva', upload.single('ava'), controller.changeAva);
router.post('/changeGroupAva', uploadGroup.single('ava'), controller.changeGroupAva);

module.exports = router;