const config       = require('../config'),
      cookie       = require('cookie'),
      cookieParser = require('cookie-parser'),
      sessionStore = require('../libs/sessionStore'),
      User         = require('../models/user.js').User;

let httpServer, io;

exports.init = function(app) {

  httpServer = require("http").createServer(app);
  io         = require("socket.io")(httpServer);

  io.on("connection", async socket => {
    console.log("connection");
    let r = await loginSocket(socket);
    console.log("r", r);

    let a = checkAuth(socket);
    console.log("auth, connection", a);

    socket.emit('hello', 'hello, your socket.id is: ' + socket.id);

    socket.on('login', async () => {
      let isLogged = await loginSocket(socket);
      console.log("isLogged", isLogged);

      if (isLogged) {
        socket.emit('hello', 'socket is logged');
      }

      let a = checkAuth(socket);
      console.log("auth, login", a);
    });

    socket.on('logout', async () => {});

    socket.on('disconnect', () => {
      // console.log('user disconnected');
      let a = checkAuth(socket);
      console.log("auth, disconnect", a);
      socket.emit('hello', 'socket is logout');
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

// exports.socketInit = function () {

//   // авторизація
//   io.use( async (socket, next) => {
//     console.log("io.use: ", socket.id);
//     // currentSocket = socket;

//     let handshake = socket.handshake,
//         cookies   = cookie.parse(handshake.headers.cookie) || '',
//         sidCookie = cookies[ config.get('session:name') ],
//         sid       = cookieParser.signedCookie(sidCookie, config.get('session:secret'));

//     let auth = await new Promise( (resolve, reject) => {
//       sessionStore.load(sid, (err, session) => {
//         if (err) {
//           reject(false)
//         } else {
//           if (!session) {
//             reject(false)
//           } else {
//             if (!session.user) {
//               reject(false);
//             } else {
//               // console.log('session.user: ', session.user.username);
//               handshake.session = session;
//               resolve(true)
//             }
//           }
//         }
//       });
//     })
//     .then( result => {
//       return result
//     })
//     .catch( err => {
//       return err
//     });
//     console.log("auth", auth);
//     // console.log("io.engine.clientsCount", io.engine.clientsCount);
//     if (auth) {
//       next();
//     } else {
//       next(new Error('Authentication error'));
//     }
//   });
// }