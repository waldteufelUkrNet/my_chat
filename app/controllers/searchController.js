const log  = require('../libs/log')(module),
      User = require('../models/user.js').User;

exports.searchInDB = function(req, res) {
  const query = req.body.query;
  console.log("query", query);

    // if (err) {
    //   log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);

  // User.find({$text: {$search: query}}, function(err, docs){
  //   if(err) return console.log("err: ", err);
  //   console.log('docs: ', docs);
  // });

  // const MongoClient = require('mongodb').MongoClient,
  //       url         = 'mongodb://localhost:27017/';
  // MongoClient.connect(url, function(err, client) {
  //   if (err) throw err;
  //   let db = client.db('my-cha-cha');
  //   let collection = db.collection('users');

  //   collection.createIndex({username: "text"});

  //   let cursor = collection.find({$text: {$search: query}});
  //   cursor.forEach(function(obj){
  //     print(obj);
  //   })

  // });

}
// https://www.youtube.com/watch?v=neroaFo5ELc&list=PL0lO_mIqDDFXcxN3fRjc-EOWZLqW8dLVV&index=7
// https://mongoosejs.com/docs/guide.html#indexes
// https://stackoverflow.com/questions/51349764/createindex-in-mongoose
// https://docs.mongodb.com/manual/indexes/