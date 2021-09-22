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
    await loginSocket(socket);

    // socket.emit('hello', 'hello, your socket.id is: ' + socket.id);

    socket.on('login', async () => {
      console.log("login-event", socket.id);
      // спочатку залогінитися
      let isLogged = await loginSocket(socket);
      // користувач ввів пароль і залогінився
      if (isLogged) {
        let user = socket.handshake.session.user;
        console.log("user", user);

        // 1. створити кімнату з id користувача
        socket.join(user._id);

        // 2. змінити статус в базі даних на true
        await User.findByIdAndUpdate( new objectId(user._id), {status:true})
        .catch(err => {
          log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
          throw err;
        });

        // 3. зайти в усі кімнати моно- і групових чатів
        user.contacts.forEach(chat => {
          socket.join(chat);
        });
        user.monochats.forEach(chat => {
          socket.join(chat);
        });
        user.groupchats.forEach(chat => {
          socket.join(chat);
        });

        // 4. розіслати усім контактам повідомлення про онлайн статус
        user.contacts.forEach(contactRoom => {
          socket.to(contactRoom).emit('contactLogin', user._id);
        });

      }

      // усі події починаються з перевірки на залогінення
      // let a = checkAuth(socket);
      // console.log("auth, login", a);
    });

    socket.on('logout', async () => {
      console.log("logout-event", socket.id);

      // змінити статус в базі даних на false
      let user = socket.handshake.session.user;
      await User.findByIdAndUpdate( new objectId(user._id), {status:false})
      .catch(err => {
        log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' + err.stack);
        throw err;
      });

      socket.disconnect(true);
    });

    // спрацьовує при обриві сокета, напр. при ctrl+f5
    socket.on('disconnect', () => {
      socket.disconnect(true);
    });
  });

  return httpServer;
}

async function loginSocket(socket) {
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