const log  = require('../libs/log')(module),
      path = require('path'),
      User = require("../models/user.js").User;

exports.test = function(req, res) {
  let dirArr = __dirname.split(path.sep);
  console.log("dirArr", dirArr);
  dirArr.splice(-1);

  res.sendFile( path.join( dirArr.join('/'), '/public/html/app.html' ) );
}