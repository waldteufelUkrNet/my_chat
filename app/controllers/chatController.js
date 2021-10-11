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

  let messageObj = {
    "who"     : userID,
    "message" : message,
  };

  messageObj.whoName =  await User.findById(new objectId(userID), {username:1})
                        .then(user => {
                          return user.username;
                        })
                        .catch(err => {
                          res.sendStatus(500);
                          log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
                          throw err;
                        });

  messageObj.whoImgSrc =  await isAvaFileAviable(userID)
                          .then(condition => {
                            if ( condition ) {
                              return config.get('avatarPathFromClient') + userID + '.jpg';
                            } else {
                              return '';
                            }
                          })
                          .catch(err => {
                            res.sendStatus(500);
                            log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
                            throw err;
                          });

  if ( await isGroupChat(contactID, res) ) {
    // це груповий чат
    let date       = new Date(),
        datatime   = date.getTime() + (date.getTimezoneOffset() * 60000);

    messageObj.datatime = datatime;
    messageObj.status   = {};

    let members = await GroupChat.findById(new objectId(contactID), { interlocutors: 1})
      .then(result => {
        return result.interlocutors
      })
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });

    members.forEach(memberID => {
      messageObj.status[memberID] = "delivered"
    });

    GroupChat.findByIdAndUpdate(new objectId(contactID), {$push: {chat: messageObj}})
    .catch(err => {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
      throw err;
    });

    messageObj.group = contactID;
    delete messageObj.status;
    chatID = contactID;
  } else {
    // моно-чат
    let date       = new Date(),
        datatime   = date.getTime() + (date.getTimezoneOffset() * 60000);

    messageObj.datatime = datatime;
    messageObj.whom     = contactID;
    messageObj.status   = "delivered";

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
        return String(chat._id);
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
        return String(chat._id)
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

  io().in(chatID).emit('message', messageObj);
  res.sendStatus(200);
}

exports.changeMessageStatus = async function(req, res) {
  let userID    = req.session.user._id,
      contactID = req.body.contactID,
      messageID = req.body.messageID;

  if ( await isGroupChat(contactID, res) ) {
    // зміна статусу повідомлення групового чату

    await GroupChat.findById( new objectId(contactID) )
    .then(doc => {
      let chat = doc.chat;
      for (let i in chat) {
        if ( chat[i].datatime == messageID ) {
          chat[i].status[userID] = 'read';
          doc.markModified("chat");
          doc.save();
          break
        }
      }
      res.sendStatus(200)
    })
    .catch(err => {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
      throw err;
    });

  } else {
    // зміна статусу повідомлення моно чату
    await MonoChat.findOne({ interlocutors: { $all: [userID, contactID] }})
    .then(doc => {
      let chat = doc.chat;
      for (let i in chat) {
        if ( chat[i].datatime == messageID ) {
          chat[i].status = 'read';
          doc.markModified("chat");
          doc.save();
          break
        }
      }
      let chatID = String(doc._id);
      let msgStatus = {
        messageID,
        contact: userID
      };
      io().in(chatID).emit('msgStatus', msgStatus);
      res.sendStatus(200)
    })
    .catch(err => {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
      throw err;
    });
  }
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

async function isAvaFileAviable(id) {
  const avatarPath = config.get('avatarPathFromServer') + id + '.jpg';
  let result;

  try {
    await access(avatarPath, constants.F_OK);
    result = true;
  } catch {
    result = false;
  }
  return result;
}