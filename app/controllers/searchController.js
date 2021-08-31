const config   = require('../config'),
      fs       = require('fs'),
      fs_promis = require('fs/promises'),
      log      = require('../libs/log')(module),
      objectId = require("mongodb").ObjectId,

      User     = require('../models/user.js').User,

      access    = fs_promis.access,
      constants = fs.constants;

exports.searchInDB = async function(req, res) {
  const query         = req.body.query,
        outputFormat  = {_id: 1, username: 1},
        currentUserID = req.session.user._id;

  let userArr = new Array();

  // search by name
  const regexp = new RegExp(query, 'ui');
  await User.find({username:regexp}, outputFormat)
  .then(function(users){
    users.forEach(user => {
      userArr.push(user)
    });
  })
  .catch(function(err){
    res.sendStatus(500);
    log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
    throw err;
  });

  // search by id
  if ( (query.length == 24 && !query.startsWith('@') )
       ||
       (query.length == 25 && query.startsWith('@') )
     ) {
    let searchedID = query;
    if ( query.length == 25 && query.startsWith('@') ) {
      searchedID = query.slice(1);
    }
    searchedID = new objectId(searchedID);

    await User.findById(searchedID, outputFormat)
    .then(function(user){
      if (user._id != currentUserID) {
        userArr.push(user);
      }
    })
    .catch(function(err){
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      throw err;
    });
  }

  let cloneArr = new Array();
  for (let i = 0; i<userArr.length; i++) {
    let clone = {};
    clone.username = userArr[i].username;
    clone._id = userArr[i]._id;

    await isAvaFileAviable(clone._id)
    .then(function(condition){
      if ( condition ) {
        clone.imgURL = config.get('avatarPathFromClient') + clone._id + '.jpg';
      } else {
        clone.imgURL = '';
      }
      cloneArr.push(clone);
    });
  }

  userArr = cloneArr;

  res.status(200).render('searchResultList/searchResultList.pug', {users:userArr});
}

async function isAvaFileAviable(id) {
  const avatarPath = config.get('avatarPathFromServer') + id + '.jpg';
  let result;

  try {
    await access(avatarPath, constants.F_OK);
    result = true;
  } catch {
    result = false;
  }
  return result;
}