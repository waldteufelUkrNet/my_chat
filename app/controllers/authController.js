const log  = require('../libs/log')(module),
      User = require('../models/user.js').User;

exports.loginUser = function(req, res) {
  const userName = req.body.name,
        userPass = req.body.pass;

  User.findOne({'username':userName}, function(err,user){
    if (err) {
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      res.sendStatus(500);
      throw err;
    } else {
      if (!user) {
        res.sendStatus(404);
      }
      if (user) {
        if( !user.checkPassword(userPass) ) {
          res.sendStatus(403);
        } else {
          // користувач існує, пароль вірний
          renderBody(req, res, user);
        }
      }
    }
  });
}

exports.logoutUser = function(req,res) {
  req.session.destroy();
  res.status(200).render('notSignedPageBody/notSignedPageBody.pug')
}

exports.deleteUser = function(req,res) {
  let userID = req.session.user._id;

  User.findByIdAndDelete(userID, function(err, user){
    if (err) {
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      throw err;
    } else {
      req.session.destroy();
      res.status(200).render('notSignedPageBody/notSignedPageBody.pug')
    }
  });
}

exports.registerUser = function(req, res) {
  const userName = req.body.name,
        userPass = req.body.pass,
        userLang = req.body.lang;

  User.create({username: userName,password: userPass, language: userLang},function(err,user) {
    if (err) {
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
    } else {
      renderBody(req, res, user)
    }
  });
}

exports.existUser = function(req, res) {
  const userName = req.body.name;

  User.findOne({'username':userName}, function(err,user){
    if (err) {
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      res.status(500);
      throw err;
    } else {
      if (!user) {
        res.status(200).send('free');
      }
      if (user) {
        res.status(200).send('used');
      }
    }
  });
}

function renderBody(req, res, user) {
  req.session.user = res.locals.user = user;
  req.session.save();

  let params = {
    username: user.username,
    id: user._id
  };

  res.status(200).render('signedPageBody/signedPageBody.pug', params)
}