const path = require('path');

exports.index = function (req, res) {
  let dirArr = __dirname.split(path.sep);
  dirArr.splice(-1);

    if(!req.session.user) {
    // авторизації нема
    res.status(200).sendFile( path.join( dirArr.join('/'), '/public/app.html' ) );
  } else {
    // авторизація є. Завантаження авторизованої сторінки
    let user   = req.session.user,
        params = {
      username: user.username,
      id: user._id
    };
    res.status(200).render('signedPage/signedPage.pug', params);
  }
}