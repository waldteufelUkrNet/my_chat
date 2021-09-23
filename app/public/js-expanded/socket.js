// var, а не let, бо socket використовується в багатьох місцях коду.
var socket = io();

socket.on('hello', msg => {
  console.log(msg)
});

socket.on('contactLogin', contactID => {
  toggleContactStatus(contactID, 'on');
});

socket.on('contactLogout', contactID => {
  toggleContactStatus(contactID, 'off');
});

// .contact-list .contact-item[data-id=""]
// .logo__status .logo__status_online
// .logo__status .logo__status_offline

function toggleContactStatus(contactID, status) {
  if ( !document.querySelector('.contact-list .contact-item[data-id="' + contactID + '"]') ) return;
  let statusMarker = document.querySelector('.contact-list .contact-item[data-id="' + contactID + '"]  .logo__status');

  if (status == 'on') {
    statusMarker.classList.remove('logo__status_offline');
    statusMarker.classList.add('logo__status_online');
  } else if (status == 'off') {
    statusMarker.classList.remove('logo__status_online');
    statusMarker.classList.add('logo__status_offline');
  }
}