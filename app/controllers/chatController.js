const config    = require('../config'),
      fs        = require('fs'),
      fs_promis = require('fs/promises'),
      io        = require('../socket/index.js').getIO,
      log       = require('../libs/log')(module),
      objectId  = require('mongodb').ObjectId,

      File      = require('../models/file.js').File,
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
    // ???? ???????????????? ??????
    let date       = new Date(),
        // datatime   = date.getTime() + (date.getTimezoneOffset() * 60000);
        datatime   = date.getTime();

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
    // ????????-??????
    let date       = new Date(),
        // datatime   = date.getTime() + (date.getTimezoneOffset() * 60000);
        datatime   = date.getTime();

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

    // ???????????????? ?? ???????????????? ?????????? ?????? ???????????????? ?????????? ??????????
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
    // ?????????? ?????????????? ???????????????????????? ?????????????????? ????????

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
    // ?????????? ?????????????? ???????????????????????? ???????? ????????
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

exports.file = async function(req, res) {
  if(req.file) {
    const userID   = req.session.user._id,
          chatID   = req.headers.chatid,
          fileName = req.headers.filename,
          fileExt  = req.headers.fileext,
          fileID   = req.headers.fileID;

    await File.create({fileid   : fileID,
                       filename : fileName,
                       fileext  : fileExt
                     })
          .catch(err => {
            res.sendStatus(500);
            log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
            throw err;
          });

    let messageObj = {
      "who"     : userID,
      "message" : 'FILE:' + fileName + '.' + fileExt + 'FILEID:' + fileID,
    };
    let chatsID;

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

    if ( await isGroupChat(chatID, res) ) {
      // ???? ???????????????? ??????
      let date       = new Date(),
          // datatime   = date.getTime() + (date.getTimezoneOffset() * 60000);
          datatime   = date.getTime();

      messageObj.datatime = datatime;
      messageObj.status   = {};

      let members = await GroupChat.findById(new objectId(chatID), { interlocutors: 1})
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

      GroupChat.findByIdAndUpdate(new objectId(chatID), {$push: {chat: messageObj}})
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });

      messageObj.group = chatID;
      delete messageObj.status;
      chatsID = chatID;
    } else {
      // ????????-??????
      let date       = new Date(),
          datatime   = date.getTime();

      messageObj.datatime = datatime;
      messageObj.whom     = chatID;
      messageObj.status   = "delivered";

      let chat = await MonoChat.find({ interlocutors: { $all: [userID, chatID] } })
                       .then(result => {
                         return result;
                       })
                       .catch(err => {
                          res.sendStatus(500);
                          log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
                          throw err;
                       });

      // ???????????????? ?? ???????????????? ?????????? ?????? ???????????????? ?????????? ??????????
      if (chat.length) {
        chatsID = await MonoChat.findOneAndUpdate({ interlocutors: { $all: [userID, chatID] } }, {$push: {chat: messageObj}})
          .then(chat => {
            return String(chat._id);
          })
          .catch(err => {
            res.sendStatus(500);
            log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
            throw err;
          });
      } else {
        chatsID = await MonoChat.create({
          "interlocutors": [userID, chatID],
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

        await User.findByIdAndUpdate(new objectId(userID), {$push: {monochats: chatID}})
        .catch(err => {
          res.sendStatus(500);
          log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
          throw err;
        });

        await User.findByIdAndUpdate(new objectId(chatID), {$push: {monochats: userID}})
        .catch(err => {
          res.sendStatus(500);
          log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
          throw err;
        });
      }
    }

    io().in(chatsID).emit('message', messageObj);
    res.status(200).send(req.file.filename);
  } else {
    res.sendStatus(500);
  }
}

exports.fileDownload = async function(req,res) {
  const fileID  = req.body.fileID,
        fileExt = req.body.fileExt;

  if( await isFileExist(fileID,fileExt) ) {
    const filePath = config.get('dataStoragePath') + fileID + '.' + fileExt;
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.sendStatus(404);
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

async function isFileExist(id, ext) {
  const filePath = config.get('dataStoragePath') + id + '.' + ext;
  let result;

  try {
    await access(filePath, constants.F_OK);
    result = true;
  } catch {
    result = false;
  }
  return result;
}