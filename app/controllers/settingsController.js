const log  = require('../libs/log')(module),
      User = require('../models/user.js').User;

exports.changeAva = function(req,res){
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