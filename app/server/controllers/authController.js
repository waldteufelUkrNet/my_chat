const User = require("../models/user.js").User;

exports.loginUser = function(req, res) {
  console.log("authController: loginUser");
  const userName = req.body.name,
        userPass = req.body.pass;

  User.findOne({'username':userName}, function(err,result){
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    console.log('result find: ', result);
    if (!result) {
      res.sendStatus(404);
      console.log('qw12');
    }
    if (result) {
      res.status(200).json(result);
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
    console.log('result create: ', result);
  });
}