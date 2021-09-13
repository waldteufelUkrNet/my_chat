const log       = require('../libs/log')(module),
      GroupChat = require('../models/groupchat.js').GroupChat,
      objectId  = require("mongodb").ObjectId,
      User      = require('../models/user.js').User;

exports.changeAva = function(req,res){
  if(req.file) {
    res.status(200).send(req.file.filename);
  } else {
    res.sendStatus(500);
  }
}

exports.changeGroupAva = function(req,res){
  if(req.file) {
    res.status(200).send(req.file.filename);
  } else {
    res.sendStatus(500);
  }
}

exports.checkOldPassword = function(req, res) {
  const userID = req.session.user._id,
        pass   = req.body.pass;

  User.findById(userID, function(err, user) {
    if (err) {
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      res.sendStatus(500);
      throw err;
    } else {
      let result = user.checkPassword(pass);
      res.status(200).send(result);
    }
  });
}

exports.changePassword = function(req, res) {
  const userID = req.session.user._id,
        pass   = req.body.pass;

  User.findById(userID, function(err, user){
    if (err) {
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      res.sendStatus(500);
      throw err;
    } else {
      user.set('password',pass);
      user.save(function(err){
        if (err) {
          log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
          res.sendStatus(500);
          throw err;
        }
      });
    res.sendStatus(200);
    }
  });
}

exports.changeUserName = function(req, res) {
  const userID  = req.session.user._id,
        newName = req.body.username;

  User.findByIdAndUpdate(userID, {username: newName}, function(err, user){
    if (err) {
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      res.sendStatus(500);
      throw err;
    } else {
      res.sendStatus(200);
    }
  });
}

exports.manageGroup = async function(req,res) {
  const userID  = req.session.user._id,
        groupID = req.body.id,
        name    = req.body.name || 'unnamed',
        members = req.body.members;

  if (members.indexOf(userID) < 0) {
    members.push(userID);
  }

console.log("groupID : ", groupID);
console.log("name    : ", name);
console.log("members : ", members);

  if (groupID) {
    console.log('update');
  } else {
    // create new group chat

    let item = {
      meta: {
        name  : name,
        admins: [userID]
      },
      interlocutors: members,
      chat: []
    };

    let groupID = await GroupChat.create(item)
      .then(group => {
        return String(group._id);
      })
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
        throw err;
      });

    console.log("created groupID: ", typeof groupID);

    for (let i = 0; i < members.length; i++) {
      await User.findByIdAndUpdate( new objectId(members[i]), {$push: {groupchats: groupID}} )
        .catch(err => {
          res.sendStatus(500);
          log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
          throw err;
        });
    }
    res.sendStatus(200);
  }
}