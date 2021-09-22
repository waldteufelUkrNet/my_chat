// var, а не let, бо socket використовується в багатьох місцях коду.
var socket = io();

socket.on('hello', msg => {
  console.log(msg)
});