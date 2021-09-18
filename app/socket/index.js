module.exports = function(app) {

  const httpServer = require("http").createServer(app),
        io         = require("socket.io")(httpServer);

  // авторизація
  io.use((socket,next) => {
    let flag = true;
    if (flag) {
      next()
    } else {
      next(new Error('Authentication error'));
    }
  });

  io.on("connection", socket => {
    // console.log('socket.handshake', socket.handshake);
    console.log('socket.handshake.headers.cookie', socket.handshake.headers.cookie);
    socket.emit('hello', 'hello, your socket.id is: ' + socket.id);
  });

  return httpServer;
}