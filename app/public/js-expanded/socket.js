// var, а не let, бо socket використовується в багатьох місцях коду.
var socket = io();

socket.on('contactLogin', contactID => {
  toggleContactStatus(contactID, 'on');
});

socket.on('contactLogout', contactID => {
  toggleContactStatus(contactID, 'off');
});

socket.on('message', msg => {
  handleIncommingMessage(msg)
});

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

function handleIncommingMessage(msg) {
  console.log("handleIncommingMessage: ", msg);
  const userID = document.querySelector('.header__info .header__subheader')
                         .innerHtml.slice(1);
  console.log("userID", userID);
}