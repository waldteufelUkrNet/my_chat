const config       = require('../config'),
      cookie       = require('cookie'),
      cookieParser = require('cookie-parser'),
      log          = require('../libs/log')(module),
      objectId     = require("mongodb").ObjectId,
      sessionStore = require('../libs/sessionStore'),
      User         = require('../models/user.js').User;

let httpServer, io;

exports.init = function(app) {

  httpServer = require("http").createServer(app);
  io         = require("socket.io")(httpServer);

  io.on("connection", async socket => {

    // спроба одразу залогінити новий сокет (напр. після ctrl+f5)
    let isAuthorized = await authSocket(socket);
    if (isAuthorized) {
      joinRooms(socket);
    }
    // socket.emit('hello', 'hello, your socket.id is: ' + socket.id);

    socket.on('login', () => {
      loginSocket(socket);
    });

    // усі події починаються з перевірки на залогінення
    // let a = checkAuth(socket);
    // console.log("auth, login", a);

    socket.on('logout', () => {
      logoutSocket(socket);
    });

    // спрацьовує при обриві сокета, напр. при ctrl+f5
    socket.on('disconnect', () => {
      socket.disconnect(true);
    });
  });

  return httpServer;
}

async function authSocket(socket) {
  let handshake = socket.handshake,
      cookies   = cookie.parse(handshake.headers.cookie) || '',
      sidCookie = cookies[ config.get('session:name') ],
      sid       = cookieParser.signedCookie(sidCookie, config.get('session:secret'));

  let auth = await new Promise( (resolve, reject) => {
    sessionStore.load(sid, (err, session) => {
      if (err) {
        reject(false)
      } else {
        if (!session) {
          reject(false)
        } else {
          if (!session.user) {
            reject(false);
          } else {
            // console.log('session.user: ', session.user.username);
            handshake.session = session;
            resolve(true)
          }
        }
      }
    });
  })
  .then( result => {
    return result
  })
  .catch( err => {
    return err
  });

  return auth;
}

function checkAuth(socket) {
  let handshake = socket.handshake;
  if (handshake.session && handshake.session.user) {
    return true
  } else {
    return false
  }
}

function joinRooms(socket) {
  let user = socket.handshake.session.user;
  // console.log('userId/socketId: ', user._id + '/' + socket.id);
  // console.log("user rooms length: ", user.contacts.length + user.monochats.length + user.groupchats.length);

  socket.join(user._id);

  user.contacts.forEach(chat => {
    socket.join(chat);
  });

  user.monochats.forEach(chat => {
    socket.join(chat);
  });

  user.groupchats.forEach(chat => {
    socket.join(chat);
  });
}

async function loginSocket(socket){
  console.log("login-event : ", socket.id);
  // спочатку залогінитися
  let isAuthorized = await authSocket(socket);
  // користувач ввів пароль і залогінився
  if (isAuthorized) {
    joinRooms(socket);
    let user = socket.handshake.session.user;

    // 1. змінити статус в базі даних на true
    await User.findByIdAndUpdate( new objectId(user._id), {status:true})
    .catch(err => {
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
      throw err;
    });

    // 2. розіслати усім контактам повідомлення про онлайн статус
    socket.to(user._id).emit('contactLogin', user._id);
  }
}

async function logoutSocket(socket){
  console.log("logout-event: ", socket.id);
  joinRooms(socket);
  let user = socket.handshake.session.user;

  // 1. змінити статус в базі даних на false
  await User.findByIdAndUpdate( new objectId(user._id), {status:false})
  .catch(err => {
    log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
    throw err;
  });

  // 2. розіслати усім контактам повідомлення про онлайн статус
  socket.to(user._id).emit('contactLogout', user._id);

  socket.removeAllListeners();
  socket.disconnect(true);
}