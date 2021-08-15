const path = require('path');

exports.index = function (req, res) {
  let dirArr = __dirname.split(path.sep);
  console.log("dirArr", dirArr);
  dirArr.splice(-1);

  res.status(200).sendFile( path.join( dirArr.join('/'), '/public/index.html' ) );
}