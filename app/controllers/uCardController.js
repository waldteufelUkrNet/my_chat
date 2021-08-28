const log      = require('../libs/log')(module),
      objectId = require("mongodb").ObjectId,
      User     = require("../models/user.js").User;

exports.addToBlockList = function(req, res) {
  const userID    = req.session.user._id,
        contactID = req.body.id;

  User.findByIdAndUpdate(new objectId(userID), {$push: {blocklist: contactID}}, function(err, user){
    if (err) {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      throw err;
    }
    res.sendStatus(200);
  });
}

exports.removeFromBlockList = function(req, res) {
  const userID    = req.session.user._id,
        contactID = req.body.id;
  User.findByIdAndUpdate(new objectId(userID), {$pull: {blocklist: contactID}}, function(err, user){
    if (err) {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      throw err;
    }
    res.sendStatus(200);
  });
}

exports.addToContacts = function(req, res) {
  const userID    = req.session.user._id,
        contactID = req.body.id;

  User.findByIdAndUpdate(new objectId(userID), {$push: {contacts: contactID}}, function(err, user){
    if (err) {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      throw err;
    }
    res.sendStatus(200);
  });
}

exports.removeFromContacts = function(req, res) {
  const userID    = req.session.user._id,
        contactID = req.body.id;
  User.findByIdAndUpdate(new objectId(userID), {$pull: {contacts: contactID}}, function(err, user){
    if (err) {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      throw err;
    }
    res.sendStatus(200);
  });
}