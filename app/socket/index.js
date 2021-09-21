const config       = require('../config'),
      cookie       = require('cookie'),
      cookieParser = require('cookie-parser'),
      sessionStore = require('../libs/sessionStore'),
      User         = require('../models/user.js').User;

let httpServer, io, currentSocket;

exports.init = function(app) {

  httpServer = require("http").createServer(app);
  io         = require("socket.io")(httpServer);

  // авторизація
  io.use( async (socket, next) => {
    currentSocket = socket;
    let auth = await authorization(socket);
    if (auth) {
      createEmittersAndHandlers(io);
      next();
    } else {
      next(new Error('Authentication error'));
    }
  });

  return httpServer;
}

async function authorization(socket) {
  let handshake = socket.handshake,
      cookies   = cookie.parse(handshake.headers.cookie) || '',
      sidCookie = cookies[ config.get('session:name') ],
      sid       = cookieParser.signedCookie(sidCookie, config.get('session:secret'));

  let result = await new Promise( (resolve, reject) => {
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
  console.log("auth", result);
  return result;
}

exports.auth = async function () {
  await authorization(currentSocket);
  createEmittersAndHandlers(io);
}

function createEmittersAndHandlers(io) {
  console.log("createEmittersAndHandlers");

  io.on("connection", async socket => {
    // console.log('socket.handshake', socket.handshake);
    // console.log('socket.handshake.headers.cookie', socket.handshake.headers.cookie);
    socket.emit('hello', 'hello, your socket.id is: ' + socket.id);

    socket.on('login', () => {
      console.log('user is logged');
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}