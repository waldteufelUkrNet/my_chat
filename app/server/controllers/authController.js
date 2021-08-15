const User = require("../models/user.js").User,
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
        req.session.user = res.locals.user = user._id;
        req.session.save();

        // res.status(200).render();
        // res.status(200).send('<p>Hello</p>');
        // res.sendStatus(200);

        // let dirArr = __dirname.split(path.sep);
        // dirArr.splice(-1);
        // res.setHeader('Content-type', 'text/html; charset=utf-8');
        // res.sendFile( path.join( dirArr.join('/'), '/public/html/app.html' ) );

        res.status(200).render('header', {username:'Dona Princevalle'})

      }
    }
  });
}

exports.registerUser = function(req, res) {
  console.log("authController: registerUser");
  const userName = req.body.name,
        userPass = req.body.pass,
        userLang = req.body.lang;

  User.create({username: userName,password: userPass, language: userLang},function(err,result){
    if (err) throw err;
    // res.sendFile('B:/files/work_area/my_chat/app/server/public/html/app.html');
  });
}

exports.existUser = function(req, res) {
  console.log("authController: existUser");
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

exports.logoutUser = function(req,res) {
  //
}