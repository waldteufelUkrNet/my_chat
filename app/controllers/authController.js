const User = require('../models/user.js').User,
      path = require('path');

exports.loginUser = function(req, res) {
  const userName = req.body.name,
        userPass = req.body.pass;

  User.findOne({'username':userName}, function(err,user){
    if (err) {
      res.sendStatus(500);
      throw err;
    }
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
  });
}

exports.logoutUser = function(req,res) {
  req.session.destroy();
  res.status(200).render('notSignedPageBody/notSignedPageBody.pug')
}

exports.registerUser = function(req, res) {
  const userName = req.body.name,
        userPass = req.body.pass,
        userLang = req.body.lang;

  User.create({username: userName,password: userPass, language: userLang},function(err,user){
    if (err) throw err;

    renderBody(req, res, user)
  });
}

exports.existUser = function(req, res) {
  const userName = req.body.name;

  User.findOne({'username':userName}, function(err,user){
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    if (!user) {
      res.status(200).json({slot:'free'});
    }
    if (user) {
      res.status(200).json({slot:'used'});
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