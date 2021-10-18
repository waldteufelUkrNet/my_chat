const config       = require('../config'),
      cookie       = require('cookie'),
      cookieParser = require('cookie-parser'),
      log          = require('../libs/log')(module),
      objectId     = require("mongodb").ObjectId,
      sessionStore = require('../libs/sessionStore'),
      MonoChat     = require('../models/monochat.js').MonoChat,
      User         = require('../models/user.js').User;

let httpServer, io;

exports.init = function(app) {

  httpServer = require("http").createServer(app);
  io         = require("socket.io")(httpServer);

  io.on("connection", async socket => {

    loginSocket(socket);
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
      logoutSocket(socket);
    });
  });

  return httpServer;
}

exports.getIO = function() {
  return io;
};

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

async function joinRooms(socket) {
  let userID = socket.handshake?.session?.user?._id;

  if (!userID) return;

  let rooms = [userID];

  // Для того, щоб сформувати кімнати для сокета, логічно було б використовувати
  // user.contacts, user.groupchats та user.monochats. Але тут є проблема: ці
  // дані беруться з сесії, яка не зміниться, поки не закінчиться. Тому при
  // створенні нових чатів вони у socket.handshake.session.user присутні не
  // будуть. Тому потрібно завантажувати дані з б.д.
  let user = await User.findById(new objectId(userID), {contacts:1, groupchats: 1, monochats: 1} )
  .then(user => {
    return user
  })
  .catch(err => {
    log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
    throw err;
  });


  user.contacts.forEach(room => {
    rooms.push(room);
  });

  user.groupchats.forEach(room => {
    rooms.push(room);
  });

  for (let i = 0; i < user.monochats.length; i++) {
    await MonoChat.find({ interlocutors: { $all: [userID, user.monochats[i]] } })
    .then(chat => {
      if (chat.length > 0) {
        rooms.push(chat[0]._id + '');
      }
    })
    .catch(err => {
      log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
      throw err;
    });
  }

  rooms.forEach(room => {
    socket.join(room);
  });
}

async function loginSocket(socket){
  // спочатку залогінитися
  let isAuthorized = await authSocket(socket);
  // користувач ввів пароль і залогінився
  if (isAuthorized) {
    await joinRooms(socket);
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
  await joinRooms(socket);
  let user = socket.handshake?.session?.user;

  if (!user) return;

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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}