const express    = require('express'),
      config     = require('../config'),
      controller = require('../controllers/chatController.js'),
      multer     = require('multer'),
      objectId   = require('mongodb').ObjectId,
      router     = express.Router();

const storageConfig = multer.diskStorage({
        destination : (req, res, cb) => {
          cb(null, config.get('dataStoragePath'));
        },
        filename    : (req, res, cb) => {
          let fileID = String( new objectId() );
          req.headers.fileID = fileID;
          cb(null, fileID + '.' + req.headers.fileext);
        }
      });

const upload = multer({storage:storageConfig});

router.post('/sendMessageToServer', controller.getMessageFromClient);
router.post('/changeMessageStatus', controller.changeMessageStatus);
router.post('/file', upload.single('file'), controller.file);
router.post('/fileDownload', controller.fileDownload);

module.exports = router;