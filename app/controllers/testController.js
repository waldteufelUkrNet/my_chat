const User = require("../models/user.js").User,
      path = require('path');

exports.test = function(req, res) {
  let dirArr = __dirname.split(path.sep);
  console.log("dirArr", dirArr);
  dirArr.splice(-1);

  res.sendFile( path.join( dirArr.join('/'), '/public/html/app.html' ) );
}