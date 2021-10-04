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
  let user = {};
  user.id = document.querySelector('.header__info .header__subheader').innerHTML.slice(1);
  user.imgSrc = document.querySelector('.header__info .logo__img').getAttribute('src');
  user.name = document.querySelector('.header__info .logo__name').innerHTML;

  if(user.id == msg.who) {
    // own message
    addOwnMessageToList(msg, user);

    if ( isChatListOpen() ) {
      addMetaToList_ownMessage(msg);
    }
  } else {
    // incomming message
    addIncommingMessageToList(msg);

    let message;
    if ( isSmallView() ) {
      message = document.querySelector('[data-list="chat"] .chat-list__item_received[data-status="delivered"]');
    } else {
      message = document.querySelector('[data-list="chatP"] .chat-list__item_received[data-status="delivered"]');
    }

    if (message) {
      handleUnreadMessage(message);
    }

    if ( isChatListOpen() ) {
      addMetaToList_incommingMessage(msg);
    }
  }
}

function addOwnMessageToList(msg, user) {
  let date = new Date(msg.datatime);
  let hh = date.getUTCHours(),
      mm = date.getMinutes();
  if (hh < 10) {
    hh = '0' + hh
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  let time = hh + ':' + mm


  let html = '\
    <li class="chat-list__item chat-list__item_sent" data-id="' + user.id + '">\
     <div class="logo">\
       <p class="logo__name">' + user.name + '</p>\
       <img class="logo__img" src="' + user.imgSrc + '">\
     </div>\
     <div class="chat-list__message">\
       <div class="chat-list__message-text">' + msg.message + '</div>\
       <div class="chat-list__message-date">' + time + '</div>\
       <div class="message-status message-status_delivered">\
         <i class="ico">N</i>\
         <i class="ico">N</i>\
       </div>\
     </div>\
    </li>\
  ';

  // якщо я відправляю, список одразу активний той, що треба
  let list = isChatOpen();
  if ( !list ) return
  list.querySelector('.chat-list').insertAdjacentHTML('beforeEnd', html);
  scrollChat();
}

function addIncommingMessageToList(msg) {
  let contact = {
    id: msg.who || msg.group
  };

  if ( document.querySelector('.list_active[data-list="chatP"] .subheader') ) {
    contact.name = document.querySelector('.list_active[data-list="chatP"] .subheader .logo__name').innerHTML;
    contact.imgSrc = document.querySelector('.list_active[data-list="chatP"] .subheader .logo__img').getAttribute('src');
  } else if ( document.querySelector('li.contact-item[data-id="' + contact.id + '"]') ) {
    contact.name = document.querySelector('li.contact-item[data-id="' + contact.id + '"] .logo__name').innerHTML;
    contact.imgSrc = document.querySelector('li.contact-item[data-id="' + contact.id + '"] .logo__img').getAttribute('src');
  } else {
    contact.name = '';
    contact.imgSrc = '';
  }

  let date = new Date(msg.datatime);
  let hh = date.getUTCHours(),
      mm = date.getMinutes();
  if (hh < 10) {
    hh = '0' + hh
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  let time = hh + ':' + mm;

  let html = '\
    <li class="chat-list__item chat-list__item_received" data-id="' + contact.id + '" data-status="delivered" data-msgid="' + msg.datatime + '">\
      <div class="logo">\
        <p class="logo__name">' + contact.name + '</p>\
        <img class="logo__img" src="' + contact.imgSrc + '">\
      </div>\
      <div class="chat-list__message">\
        <div class="chat-list__message-text">' + msg.message + '</div>\
        <div class="chat-list__message-date">' + time + '</div>\
      </div>\
    </li>\
  ';

  let list = isChatOpen();
  if ( !list ) return

  // якщо мені відправляють, не факт, що чат одразу активний той, що треба
  let el1 = document.querySelector('.left-side_with-subheader .subheader[data-id="' + contact.id + '"]'); // display: flex
  let condition1 = el1 && el1.style.display == 'flex';

  let condition2 = document.querySelector('.list_active[data-list="chatP"] .subheader[data-id="' + contact.id + '"]');
  if (condition1 || condition2) {
    list.querySelector('.chat-list').insertAdjacentHTML('beforeEnd', html);
    scrollChat();
  }
}

function addMetaToList_incommingMessage(msg) {
  let id = msg.group || msg.who;
  let listItemMessage = document.querySelector('.chat-item[data-id="' + id + '"] .chat-item__message'),
      listItemData    = document.querySelector('.chat-item[data-id="' + id + '"] .chat-item__date');

  let date = new Date(msg.datatime),
      dd   = date.getUTCDate(),
      mm   = date.getUTCMonth() + 1,
      yy   = String(date.getUTCFullYear()).slice(2);

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  let dateStr = dd + '.' + mm + '.' + yy;

  listItemData.innerHTML = dateStr;
  listItemMessage.innerHTML = msg.message;
}

function addMetaToList_ownMessage(msg) {
  let id = msg.whom || msg.group;

  let listItemMessage = document.querySelector('.chat-item[data-id="' + id + '"] .chat-item__message'),
      listItemData    = document.querySelector('.chat-item[data-id="' + id + '"] .chat-item__date');

  let date = new Date(msg.datatime),
      dd   = date.getUTCDate(),
      mm   = date.getUTCMonth() + 1,
      yy   = String(date.getUTCFullYear()).slice(2);

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  let dateStr = dd + '.' + mm + '.' + yy;

  listItemData.innerHTML = dateStr;
  listItemMessage.innerHTML = msg.message;
}

function isChatOpen() {
  let list_small = document.querySelector('[data-list="chat"]');
  if (list_small) {
    if (list_small.classList.contains("list_active")) {
      return list_small
    }
  }
  let list_big = document.querySelector('[data-list="chatP"]');
  if (list_big) {
    if (list_big.classList.contains("list_active")) {
      return list_big
    }
  }
  return false
}

function scrollChat() {
  // big list
  let bListPage = document.querySelector('.list_active[data-list="chatP"]');
  if ( bListPage ) {
    wSetScroll(document.querySelector('[data-list="chatP"] .chat-wrapper'), {right:true, overflowXHidden:true});
    let scrolledEl = document.querySelector('[data-list="chatP"] .chat-wrapper .wjs-scroll__content');
    scrolledEl.scrollTop = scrolledEl.scrollHeight;
  }
  // small list
  let sListPage = document.querySelector('.list_active[data-list="chat"]');
  if ( sListPage ) {
    wSetScroll(document.querySelector('.left-side_with-subheader .lists-wrapper.wjs-scroll'), {right:true, overflowXHidden:true});
    let scrolledEl = document.querySelector('.left-side_with-subheader .lists-wrapper.wjs-scroll .wjs-scroll__content');
    scrolledEl.scrollTop = scrolledEl.scrollHeight;
  }

  if ( document.querySelector('.round-btn_active') ) {
    document.querySelector('.round-btn').classList.remove('round-btn_active');
  }
}