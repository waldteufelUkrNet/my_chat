// var, а не let, бо socket використовується в багатьох місцях коду.
var socket = io();

socket.on('hello', msg => {
  console.log(msg)
});

socket.on('contactLogin', contactID => {
  console.log("contactID, this user is online", contactID);
});