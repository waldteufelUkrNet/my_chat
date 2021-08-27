const config   = require('../config'),
      fs       = require('fs'),
      log      = require('../libs/log')(module),
      objectId = require("mongodb").ObjectId,
      User     = require('../models/user.js').User;

exports.searchInDB = async function(req, res) {
  const query         = req.body.query,
        userArr       = new Array(),
        outputFormat  = {_id: 1, username: 1},
        currentUserID = req.session.user._id;

  if ( (query.length == 24 && !query.startsWith('@') )
       ||
       (query.length == 25 && query.startsWith('@') )
     ) {
    let searchedID = query;
    if ( query.length == 25 && query.startsWith('@') ) {
      searchedID = query.slice(1);
    }
    searchedID = new objectId(searchedID);

    await User.findById(searchedID, outputFormat, function(err, user){
      if (err) {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
        throw err;
      }
      if (user._id != currentUserID) {
        userArr.push(user);
      }
    });
  }

  // search by name
  const regexp = new RegExp(query, 'ui');
  await User.find({username:regexp}, outputFormat, function(err,users){
    if (err) {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      throw err;
    } else {
      users.forEach(user => {
        if (user._id != currentUserID) {
          userArr.push(user);
        }
      });
    }
  });
  res.status(200).send( userArr );
}

exports.searchAva = async function(req, res) {
  const avatarPath = config.get('avatarPathFromServer') + req.body.id + '.jpg';
  fs.access(avatarPath, fs.constants.F_OK, function(err){
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });
}