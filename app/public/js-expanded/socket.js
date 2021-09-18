let socket = io();

socket.on('hello', msg => {
  console.log(msg)
});