const log      = require('../libs/log')(module),
      objectId = require("mongodb").ObjectId,
      User     = require('../models/user.js').User;

exports.searchInDB = async function(req, res) {
  const query        = req.body.query,
        userSet      = new Set(),
        outputFormat = {_id: 1, username: 1};

  // search by id 61268061afc2912c881e79ac
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
      userSet.add(user);
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
      userSet.add(users);
    }
  });

  res.status(200).send( Array.from(userSet) );
}