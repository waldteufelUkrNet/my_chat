const User = require('../models/user.js').User;

exports.checkOldPassword = function(req, res) {
  const userID = req.session.user._id,
        pass   = req.body.pass;

  User.findById(userID, function(err, user) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    let result = user.checkPassword(pass);
    res.status(200).send(result);
  });
}

exports.changePassword = function(req, res) {
  const userID = req.session.user._id,
        pass   = req.body.pass;

  User.findById(userID, function(err, user){
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    user.set('password',pass);
    user.save(function(err){
      if(err) {
        res.sendStatus(500);
        throw err;
      }
    });
    res.sendStatus(200);
  });
}

exports.changeUserName = function(req,res) {
  const user = req.session.user;
  console.log(user);
}
exports.changeAva = function(req, res) {}