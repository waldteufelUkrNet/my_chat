const User = require("../models/user.js").User;

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
        res.sendStatus(200);
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