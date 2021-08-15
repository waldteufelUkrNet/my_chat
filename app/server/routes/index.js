const express = require('express'),
      path    = require('path'),
      router  = express.Router();

router.get('/', function(req, res) {

  let dirArr = __dirname.split(path.sep);
  dirArr.splice(-1);

  res.sendFile( path.join( dirArr.join('/'), '/public/html/login.html' ) );
});

router.get('/api/app', function(req, res) {

  let dirArr = __dirname.split(path.sep);
  dirArr.splice(-1);

  res.sendFile( path.join( dirArr.join('/'), '/public/html/app.html' ) );
});

module.exports = router;
