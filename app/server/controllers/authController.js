const User = require("../models/user.js").User;

exports.loginUser = function(req, res) {
  console.log("authController: loginUser");
  console.log("req.body", req.body);
  const userName = req.body.name,
        userPass = req.body.pass;

  User.find({}, function(err,result){
    if (err) throw err;
    console.log(result);
  });
}

exports.registerUser = function(req, res) {
  console.log("authController: registerUser");
  console.log("req.body", req.body);
  const userName = req.body.name,
        userPass = req.body.pass,
        userLang = req.body.lang;
}