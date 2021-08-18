const User = require('../models/user.js').User;

exports.checkOldPassword = function(req, res) {
  const userID = req.session.user._id,
        pass   = req.body.pass;

  User.findById(userID, function(err,user) {
    if (err) throw err;
    let result = user.checkPassword(pass);
    res.status(200).json( {result:result} );
  });
}

exports.changePassword = function(req, res) {
  const userID = req.session.user._id,
        pass   = req.body.pass;

  User.findById(userID, function(err, user){
    if(err) throw err;
    user.set('password',pass);
    user.save(function(err){
      if(err) throw err;
    });
    res.send({result:'changed'});
  });
}