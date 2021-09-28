const config  = require('../config'),
    fs        = require('fs'),
    fs_promis = require('fs/promises'),
    log       = require('../libs/log')(module),
    objectId  = require('mongodb').ObjectId,

    GroupChat = require('../models/groupchat.js').GroupChat,
    MonoChat  = require('../models/monochat.js').MonoChat,
    User      = require('../models/user.js').User,

    access    = fs_promis.access,
    constants = fs.constants;

exports.renderContactsList = async function(req, res) {
  let userID = req.session.user._id;

  let usersIDArr = await User.findById(new objectId(userID), {contacts:1})
  .then(user => {
    return user.contacts
  })
  .catch(err => {
    res.sendStatus(500);
    log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
    throw err;
  });

  if (!usersIDArr.length) {
    res.status(200).send('');
  } else {
    let userArr = [];
    for (let i = 0; i < usersIDArr.length; i++) {
      let userfromDB = await User.findById(new objectId(usersIDArr[i]),{username:1, status: 1})
        .then(user => {
          return user
        })
        .catch(err => {
          res.sendStatus(500);
          log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
          throw err;
        });

      let user = {
        _id: usersIDArr[i]
      };

      user.imgURL = await getAvaFileClientURL(usersIDArr[i])
        .catch(err => {
          res.sendStatus(500);
          log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
          throw err;
        });

      user.username = userfromDB.username;
      user.status = userfromDB.status;
      userArr.push(user);
    }
    userArr.sort(function(a, b) {
      if (a.username > b.username) return 1;
      if (a.username < b.username) return -1;
      if (a.username == b.username) return 0;
    });
    res.status(200).render('contactlist/contactlist.pug', { users: userArr });
  }
}

exports.renderChatsList = async function(req, res) {
  const userID   = req.session.user._id,
        tzOffset = req.body.tzOffset;
  let chatsArr = [];
  let chats = await User.findById(new objectId(userID), { monochats: 1, groupchats: 1 })
    .then(result => {
      return result
    })
    .catch(err => {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
      throw err;
    });

  for (let i = 0; i < chats.monochats.length; i++) {
    let chatObj = {
      _id: chats.monochats[i],
      meta: 'mono'
    };
    chatObj.name = await User.findById(new objectId(chats.monochats[i]), { username: 1 })
      .then(user => {
        return user.username;
      })
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });
    chatObj.imgURL = await getAvaFileClientURL(chats.monochats[i])
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });

    let chat = await MonoChat.find({ interlocutors: { $all: [userID, chats.monochats[i]] } })
      .then(result => {
        if (result[0] && result[0].chat) {
          return result[0].chat;
        } else {
          return []
        }
      })
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });

    let monochatLastMessage;
    let badge = 0;
    if (chat.length) {
      monochatLastMessage = chat[chat.length - 1];
      chatObj.datetime = +monochatLastMessage.datatime + tzOffset * 60000;
      chatObj.message = monochatLastMessage.message;
      chatObj.status = monochatLastMessage.status;

      if (monochatLastMessage.who != userID && monochatLastMessage.status == 'delivered') {
        for (let i = chat.length - 1; i > -1; i--) {
          if (chat[i].who != userID && chat[i].status == 'delivered') {
            badge = badge + 1
          } else {
            break
          }
        }
      }
    } else {
      chatObj.datetime = '';
      chatObj.message = '...';
      chatObj.status = 'read';
    }

    chatObj.badge = badge;
    chatsArr.push(chatObj);
  }
  for (let i = 0; i < chats.groupchats.length; i++) {
    let chat = {
      _id: chats.groupchats[i],
      meta: 'group'
    };
    let chatItem = await GroupChat.findById(new objectId(chats.groupchats[i]), { meta: 1, chat: 1 })
      .then(group => {
        let message, datetime, text, status;
        let name  = group.meta.name,
            badge = 0;
        if (group.chat.length) {
          message  = group.chat[group.chat.length - 1],
          datetime = +message.datatime + tzOffset * 60000,
          text     = message.message,
          status   = message.status[userID];
        } else {
          message  = '';
          datetime = '';
          text     = '...';
          status   = 'read';
        }
        let lastMessage = group.chat[group.chat.length - 1];
        if (lastMessage && lastMessage.who != userID && lastMessage.status[userID] == 'delivered') {
          for (let i = group.chat.length - 1; i > -1; i--) {
            if (group.chat[i].who != userID && group.chat[i].status[userID] == 'delivered') {
              badge = badge + 1
            } else {
              break
            }
          }
        }
        return {
          name,
          datetime,
          message: text,
          status,
          badge
        }
      })
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });
    chat.name = chatItem.name;
    chat.datetime = chatItem.datetime;
    chat.message = chatItem.message;
    chat.status = chatItem.status;
    chat.badge = chatItem.badge;
    chat.imgURL = await getAvaFileClientURL(chats.groupchats[i])
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });
    chatsArr.push(chat);
  }
  chatsArr.sort(function(a, b) {
    if (a.datatime > b.datatime) return 1;
    if (a.datatime < b.datatime) return -1;
    if (a.datatime == b.datatime) return 0;
  });
  res.status(200).render('chatlist/chatlist.pug', { chats: chatsArr });
}

exports.renderBlackList = function(req, res) {
    let userID = req.session.user._id;

    User.findById(new objectId(userID), { blocklist: 1 }, function(err, users) {
        if (err) {
            res.sendStatus(500);
            log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
            throw err;
        }
        let usersIDArr = users.blocklist;

        if (!usersIDArr.length) {
            res.status(200).send('');
        } else {
            let userArr = [];

            usersIDArr.forEach(async (id, i) => {

                await User.findById(new objectId(id), { username: 1, status: 1 })
                    .then(async function(user) {
                        let clone = {};
                        clone.username = user.username;
                        clone._id = user._id;

                        if (await isAvaFileAviable(id)) {
                            clone.imgURL = config.get('avatarPathFromClient') + id + '.jpg';
                        } else {
                            clone.imgURL = '';
                        }
                        userArr.push(clone);
                    })
                    .catch(function(err) {
                        res.sendStatus(500);
                        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
                        throw err;
                    });
                if (i == usersIDArr.length - 1) {
                    userArr.sort(function(a, b) {
                        if (a.username > b.username) return 1;
                        if (a.username < b.username) return -1;
                        if (a.username == b.username) return 0;
                    });

                    res.status(200).render('blackList/blackList.pug', { users: userArr });
                }
            });
        }
    });
}

exports.renderUserCard = async function(req, res) {
    const userID = req.session.user._id,
        contactID = req.body.id;

    let contactObj = { id: contactID };

    await User.findById(new objectId(contactID), {})
        .then(user => {
            contactObj.name = user.username;
            contactObj.initials = user.username.slice(0, 2).toUpperCase();
        })
        .catch(err => {
            res.sendStatus(500);
            log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
            throw err;
        });

    if (await isAvaFileAviable(contactID)) {
        contactObj.imgURL = config.get('avatarPathFromClient') + contactID + '.jpg';
    } else {
        contactObj.imgURL = '';
    }

    if (await isInContactList(userID, contactID, res)) {
        contactObj.isInContacts = true
    } else {
        contactObj.isInContacts = false
    }

    if (await isInBlockList(userID, contactID, res)) {
        contactObj.isInBlockList = true
    } else {
        contactObj.isInBlockList = false
    }

    res.status(200).render('usercard/usercard.pug', contactObj);
}

exports.renderGroupCard = async function(req, res) {
  const userID  = req.session.user._id,
        groupID = req.body.id;

  let imgURL    = await getAvaFileClientURL(groupID);
  let groupName = await GroupChat.findById(new objectId(groupID), {meta:1} )
    .then(group => {
      return group.meta.name;
    })
    .catch(err => {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      throw err;
    });

  let isUserAdmin = await isAdmin(userID, groupID, res)
    .then(result => {
      return result
    })
    .catch(err => {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      throw err;
    });

  let params = {groupID, imgURL, groupName, isUserAdmin};

  res.status(200).render('groupcard/groupcard.pug', params);
}

exports.renderContactSubheader = async function(req, res) {
    const contactID = req.body.id;

    let user = await User.findById(new objectId(contactID), { username: 1 })
        .then(user => {
            return user;
        })
        .catch(err => {
            res.sendStatus(500);
            log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
            throw err;
        });

    let clone = {};
    clone.name = user.username;
    clone._id = user._id;
    if (await isAvaFileAviable(contactID)) {
        clone.imgURL = config.get('avatarPathFromClient') + contactID + '.jpg';
    } else {
        clone.imgURL = '';
    }
    user = clone;
    res.status(200).render('subheader/subheader.pug', user);
}

exports.renderGroupSubheader = async function(req, res) {
    const groupID = req.body.id;

    let name = await GroupChat.findById(new objectId(groupID), { meta: 1 })
        .then(group => {
            return group.meta.name;
        })
        .catch(err => {
            res.sendStatus(500);
            log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
            throw err;
        });

    let imgURL = await getAvaFileClientURL(groupID);

    let params = { _id: groupID, group: true, name, imgURL };
    res.status(200).render('subheader/subheader.pug', params);
}

exports.renderMonoChat = async function(req, res) {
    const contactID = req.body.id,
          userID    = req.session.user._id,
          tzOffset  = req.body.tzOffset;

    let isChatExist = await User.findById(new objectId(userID), { monochats: 1 })
        .then(function(user) {
            if (user.monochats.indexOf(contactID) < 0) {
                return false
            } else {
                return true
            }
        })
        .catch(function(err) {
            res.sendStatus(500);
            log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
            throw err;
        });

    if (isChatExist) {

        // імена співрозмовників
        const userName = req.session.user.username;
        const contactName = await User.findById(new objectId(contactID), { username: 1 })
            .then(function(user) {
                return user.username
            })
            .catch(function(err) {
                res.sendStatus(500);
                log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
                throw err;
            });

        // аватарки співрозмовників
        let userAvaImg    = await getAvaFileClientURL(userID),
            contactAvaImg = await getAvaFileClientURL(contactID);

        // тіло чату
        let chat = await MonoChat.find({ interlocutors: { $all: [userID, contactID] } })
            .then(function(chatObj) {
                return chatObj[0].chat
            })
            .catch(function(err) {
                res.sendStatus(500);
                log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
                throw err;
            });

        // підготовка чату до рендерингу
        chat.forEach(message => {
            message.datatime = +message.datatime + tzOffset * 60000;
            if (message.who == userID) {
                message.whoName = userName;
                message.whomName = contactName;
                message.whoImg = userAvaImg;
                message.messageType = 'chat-list__item_sent';
            } else {
                message.whoName = contactName;
                message.whomName = userName;
                message.whoImg = contactAvaImg;
                message.messageType = 'chat-list__item_received'
            }
        });

        let params = {
            meta: 'mono',
            interlocutors: { user: userID, contact: contactID },
            chat: chat
        };

        res.status(200).render('chat/chat.pug', params);

    } else {
      // такого чату в колекції нема
      let params = {
          meta: 'mono',
          interlocutors: { user: userID, contact: contactID },
          chat: []
      };

      res.status(200).render('chat/chat.pug', params);
    }
}

exports.renderGroupChat = async function(req, res) {
  const groupID  = req.body.id,
        userID   = req.session.user._id,
        tzOffset = req.body.tzOffset;

  let isChatExist = await GroupChat.findById(new objectId(groupID))
    .then(function(chat) {
      if (chat) {
        return true
      } else {
        return false
      }
    })
    .catch(function(err) {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
      throw err;
    });

  if (isChatExist) {

    // interlocutors data
    let iLocObj = {};

    let interlocutors = await GroupChat.findById(new objectId(groupID), { interlocutors: 1 })
      .then(chat => {
        return chat.interlocutors
      })
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });

    for (let i = 0; i < interlocutors.length; i++) {
      let iID = interlocutors[i];

      let iName = await User.findById(new objectId(iID), { username: 1 })
        .then(user => {
          return user.username;
        })
        .catch(err => {
          res.sendStatus(500);
          log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
          throw err;
        });

      let iImgURL = await getAvaFileClientURL(iID);
      iLocObj[iID] = { username: iName, imgURL: iImgURL };
    }

    // тіло чату
    let chat = await GroupChat.findById(new objectId(groupID))
      .then(function(chatObj) {
        return chatObj.chat
      })
      .catch(function(err) {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });

    // підготовка чату до рендерингу
    chat.forEach(message => {
      message.datatime = +message.datatime + tzOffset * 60000;
      message.whoName = iLocObj[message.who].username;
      message.whoImg = iLocObj[message.who].imgURL;
      message.status = message.status[userID];
      if (message.who == userID) {
        message.messageType = 'chat-list__item_sent';
      } else {
        message.messageType = 'chat-list__item_received'
      }
    });

    let params = {
      meta: 'group',
      interlocutors: {},
      chat: chat
    };

    res.status(200).render('chat/chat.pug', params);

  } else {
    // чату нема
    console.log('такого чату в колекції нема');
  }
}

exports.renderGList = async function(req, res) {
  const groupID = req.body.id;
  let users = [];
  const groupMembersID = await GroupChat.findById( new objectId(groupID), {interlocutors:1} )
    .then(group => {
      return group.interlocutors
    })
    .catch(err => {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
      throw err;
    });

  for (let i = 0; i < groupMembersID.length; i++) {
    let member = {
      _id: groupMembersID[i]
    };

    member.username = await User.findById(  new objectId(member._id), {username:1} )
      .then(user => {
        return user.username
      })
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
        throw err;
      });

    member.imgURL = await getAvaFileClientURL(member._id);
    users.push(member);
  }
  res.status(200).render('memberslist/memberslist.pug', {users:users});
}

exports.contactsListGroupPopup = async function(req, res) {
  let userID = req.session.user._id;

  let usersIDArr = await User.findById(new objectId(userID), {contacts:1})
  .then(user => {
    return user.contacts
  })
  .catch(err => {
    res.sendStatus(500);
    log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
    throw err;
  });

  let userArr = [];
  for (let i = 0; i < usersIDArr.length; i++) {
    let user = {
      _id: usersIDArr[i]
    };

    user.username = await User.findById(new objectId(usersIDArr[i]),{username:1})
      .then(user => {
        return user.username
      })
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });

    userArr.push(user);
  }
  userArr.sort(function(a, b) {
    if (a.username > b.username) return 1;
    if (a.username < b.username) return -1;
    if (a.username == b.username) return 0;
  });

  res.status(200).render('lists/contactsInGroupPopup.pug', { users: userArr });
}

exports.contactsListGroupPopupPost = async function(req, res) {
  let userID  = req.session.user._id,
      groupID = req.body.id;

  let membersIDArr = await GroupChat.findById(new objectId(groupID), {interlocutors:1})
    .then(group => {
      return group.interlocutors
    })
    .catch(err => {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
      throw err;
    });

  let usersIDArr = await User.findById(new objectId(userID), {contacts:1})
    .then(user => {
      return user.contacts
    })
    .catch(err => {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
      throw err;
    });

  let userArr = [];
  for (let i = 0; i < usersIDArr.length; i++) {
    let user = {
      _id: usersIDArr[i]
    };

    user.username = await User.findById(new objectId(usersIDArr[i]),{username:1})
      .then(user => {
        return user.username
      })
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });

    if ( membersIDArr.indexOf(usersIDArr[i]) >= 0  ) {
      user.isMember = true
    } else {
      user.isMember = false
    }

    userArr.push(user);
  }
  userArr.sort(function(a, b) {
    if (a.username > b.username) return 1;
    if (a.username < b.username) return -1;
    if (a.username == b.username) return 0;
  });

  res.status(200).render('lists/contactsInGroupPopup.pug', { users: userArr });
}

exports.membersListGroupPopup = async function(req, res) {
  let groupID = req.body.id;

  let usersIDArr = await GroupChat.findById(new objectId(groupID), {interlocutors:1})
  .then(group => {
    return group.interlocutors
  })
  .catch(err => {
    res.sendStatus(500);
    log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
    throw err;
  });

  let userArr = [];
  for (let i = 0; i < usersIDArr.length; i++) {
    let user = {
      _id: usersIDArr[i]
    };

    user.username = await User.findById(new objectId(usersIDArr[i]),{username:1})
      .then(user => {
        return user.username
      })
      .catch(err => {
        res.sendStatus(500);
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });

    userArr.push(user);
  }
  userArr.sort(function(a, b) {
    if (a.username > b.username) return 1;
    if (a.username < b.username) return -1;
    if (a.username == b.username) return 0;
  });

  res.status(200).render('lists/membersInGroupPopup.pug', { users: userArr });
}

exports.matchedIDList = async function(req, res) {
  const searchedID = req.body.id;
  console.log("searchedID", searchedID);
  let regexp = new RegExp(`^${searchedID}`, 'ui');

  let user = await User.findById(new objectId(searchedID), {_id:1, username:1})
  .then(user => {
    return user;
  })
  .catch(err => {
    res.sendStatus(500);
    log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
    throw err;
  });

  res.status(200).render('lists/searchResultInGroupPopup.pug', user);
}

async function getAvaFileClientURL(id) {
  if (await isAvaFileAviable(id)) {
    return config.get('avatarPathFromClient') + id + '.jpg';
  }
  return ''
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

async function isAdmin(userID, groupID, res) {
  let result;
  await GroupChat.findById( new objectId(groupID) )
  .then(group => {
    let admins = group.meta.admins;
    if ( admins.indexOf(userID) < 0 ) {
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

async function isInContactList(userID, contactID, res) {
  let result;
  await User.findById(new objectId(userID), { contacts: 1 })
    .then(user => {
      if (user.contacts.indexOf(contactID) < 0) {
        result = false
      } else {
        result = true
      }
    })
    .catch(err => {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
      throw err;
    });
  return result;
}

async function isInBlockList(userID, contactID, res) {
  let result;
  await User.findById(new objectId(userID), { blocklist: 1 })
    .then(user => {
      if (user.blocklist.indexOf(contactID) < 0) {
        result = false
      } else {
        result = true
      }
    })
    .catch(err => {
      res.sendStatus(500);
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
      throw err;
    });
  return result;
}