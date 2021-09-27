const config    = require('../config'),
      fs        = require('fs'),
      fs_promis = require('fs/promises'),
      io        = require('../socket/index.js').getIO,
      log       = require('../libs/log')(module),
      objectId  = require('mongodb').ObjectId,

      GroupChat = require('../models/groupchat.js').GroupChat,
      MonoChat  = require('../models/monochat.js').MonoChat,
      User      = require('../models/user.js').User,

      access    = fs_promis.access,
      constants = fs.constants;

exports.getMessageFromClient = async function(req, res) {
  const userID    = req.session.user._id,
        contactID = req.body.contactID,
        message   = req.body.message;

  let chatID;

  if ( await isGroupChat(contactID, res) ) {
    // це груповий чат
  } else {
    // моно-чат

    let date       = new Date(),
        datatime   = date.getTime() + (date.getTimezoneOffset() * 60000),
        messageObj = {
          "datatime" : datatime,
          "who"      : userID,
          "whom"     : contactID,
          "message"  : message,
          "status"   : "delivered"
        };

    let chat = await MonoChat.find({ interlocutors: { $all: [userID, contactID] } })
      .then(result => {
        return result;
      })
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });

    // дописати у існуючий запис або створити новий запис
    if (chat.length) {
      chatID = await MonoChat.findOneAndUpdate({ interlocutors: { $all: [userID, contactID] } }, {$push: {chat: messageObj}})
      .then(chat => {
        return chat._id
      })
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });
    } else {
      chatID = await MonoChat.create({
        "interlocutors": [userID, contactID],
        "chat": [messageObj]
      })
      .then(chat => {
        return chat._id
      })
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });

      await User.findByIdAndUpdate(new objectId(userID), {$push: {monochats: contactID}})
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });

      await User.findByIdAndUpdate(new objectId(contactID), {$push: {monochats: userID}})
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });
    }
  }

  const sockets = await io.fetchSockets();
  console.log("sockets", sockets);

  // io().to(chatID).emit('message', message);
  res.sendStatus(200);
}

async function isGroupChat(id, res) {
  let gchat = await GroupChat.findById( new objectId(id) )
      .then(result => {
        if (result) {
          return true
        } else {
          return false
        }
      })
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });
  return gchat;
}