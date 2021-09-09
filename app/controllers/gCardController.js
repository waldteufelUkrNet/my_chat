const log       = require('../libs/log')(module),
      objectId  = require("mongodb").ObjectId,
      GroupChat = require("../models/groupchat.js").GroupChat,
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