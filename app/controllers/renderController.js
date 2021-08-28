const config    = require('../config'),
      fs        = require('fs'),
      fs_promis = require('fs/promises'),
      log       = require('../libs/log')(module),
      objectId  = require("mongodb").ObjectId,

      User      = require('../models/user.js').User,

      access    = fs_promis.access,
      constants = fs.constants;

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

exports.renderUserCard = async function(req,res) {
  const userID    = req.session.user._id,
        contactID = req.body.id;

  let contactObj = {id: contactID};

  await User.findById( new objectId(contactID), {})
    .then(user => {
      contactObj.name = user.username;
      contactObj.initials = user.username.slice(0,2).toUpperCase();
    })
    .catch(err => {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      throw err;
    });

  if ( await isAvaFileAviable(contactID) ) {
    contactObj.imgURL = config.get('avatarPathFromClient') + contactID + '.jpg';
  } else {
    contactObj.imgURL = '';
  }

  if ( await isInContactList(userID, contactID, res) ) {
    contactObj.isInContacts = true
  } else {
    contactObj.isInContacts = false
  }

  if ( await isInBlockList(userID, contactID, res) ) {
    contactObj.isInBlockList = true
  } else {
    contactObj.isInBlockList = false
  }

  res.status(200).render('usercard/usercard.pug', contactObj);
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

async function isInContactList(userID, contactID, res) {
  let result;
  await User.findById( new objectId(userID), {contacts:1} )
    .then(user => {
      if (user.contacts.indexOf(contactID) < 0) {
        result = false
      } else {
        result = true
      }
    })
    .catch(err => {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      throw err;
    });
  return result;
}

async function isInBlockList(userID, contactID, res) {
  let result;
  await User.findById( new objectId(userID), {blocklist:1} )
    .then(user => {
      if (user.blocklist.indexOf(contactID) < 0) {
        result = false
      } else {
        result = true
      }
    })
    .catch(err => {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      throw err;
    });
  return result;
}