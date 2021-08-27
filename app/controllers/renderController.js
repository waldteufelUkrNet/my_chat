const log      = require('../libs/log')(module),
      objectId = require("mongodb").ObjectId,
      User     = require('../models/user.js').User;

exports.renderContactsList = function(req, res) {
  let userID = req.session.user._id;

  User.findById( new objectId(userID), {contacts:1}, function(err, users) {
    if (err) {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      throw err;
    }
    let usersIDArr = users.contacts;

    if ( !usersIDArr.length ) {
      res.status(200).send('');
    } else {
      let finalHTML = '<ul class="contact-list">';

      usersIDArr.forEach( async (id,i) => {

        await User.findById( new objectId(id), {username: 1, status: 1}, function(err, user){
          if (err) {
            res.sendStatus(500);
            log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
            throw err;
          }
          let statusClass = 'logo__status_offline';
          if (user.status) {
            statusClass = 'logo__status_online';
          }
          let userHTML = '<li class="contact-item" data-id="' + id + '">\
                            <div class="logo">\
                              <p class="logo__name">' + user.username.slice(0,2).toUpperCase() + '</p>\
                              <img class="logo__img" src="">\
                              <div class="logo__status ' + statusClass + '"></div>\
                            </div>\
                            <div class="contact-item__name">' + user.username + '</div>\
                          </li>';
          finalHTML += userHTML;
        });
        if ( i == usersIDArr.length-1) {
          finalHTML = finalHTML.replace(/>\s{1,}</g, '><') + '</ul>';
          res.status(200).send(finalHTML);
        }
      });
    }
  });
}