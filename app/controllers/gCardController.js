const log       = require('../libs/log')(module),
      objectId  = require("mongodb").ObjectId,
      GroupChat = require("../models/groupchat.js").GroupChat,
      MonoChat  = require("../models/monochat.js").MonoChat,

      User      = require('../models/user.js').User;

exports.leaveGroup = async function(req, res) {
  const userID  = req.session.user._id,
        groupID = req.body.id;

  await GroupChat.findByIdAndUpdate(new objectId(groupID), {$pull: {interlocutors: userID}})
  .catch(err => {
    res.sendStatus(500);
    log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
    throw err;
  });

  await User.findByIdAndUpdate(new objectId(userID), {$pull: {groupchats: groupID}})
  .catch(err => {
    res.sendStatus(500);
    log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
    throw err;
  });
  res.sendStatus(200);
}

exports.deleteGroup = async function (req,res) {
  const groupID = req.body.id;
  await User.updateMany({groupchats:groupID}, {$pull: {groupchats: groupID} })
  .catch(err => {
    res.sendStatus(500);
    log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
    throw err;
  });
  await GroupChat.findByIdAndDelete(new objectId(groupID))
  .catch(err => {
    res.sendStatus(500);
    log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
    throw err;
  });
  res.sendStatus(200);
}

exports.removeHistory = async function(req, res) {
  const userID = req.session.user._id,
        gOrCID = req.body.id;

  // спочатку шукаємо груповий чат
  let arr = new Array();
  let groupSearchResult = await GroupChat.findByIdAndUpdate(new objectId(gOrCID), {chat: arr})
  .then(group => {
    return group
  })
  .catch(err => {
    res.sendStatus(500);
    log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
    throw err;
  });

  if (groupSearchResult) {
    res.sendStatus(200);
    return
  }

  // якщо не знайдено груповий чат - пошук моночату
  await MonoChat.findOneAndUpdate({ interlocutors: { $all: [userID, gOrCID] } }, {chat: arr})
  .then(chat => {
    res.sendStatus(200);
  })
  .catch(err => {
    res.sendStatus(500);
    log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
    throw err;
  });
}