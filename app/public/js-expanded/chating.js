////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  // if ( document.querySelector('[data-list="chatP"] .wjs-scroll__content') ) {
  //   document.querySelector('[data-list="chatP"] .wjs-scroll__content').addEventListener('scroll', function(event){
  //     scrollMessages();
  //   });
  // }

  // if ( document.querySelector('[data-list="chat"] .wjs-scroll__content') ) {
  //   document.querySelector('[data-list="chat"] .wjs-scroll__content').addEventListener('scroll', function(event){
  //     scrollMessages();
  //   });
  // }
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ sockets ↓↓↓ */
  // var, а не let, бо socket використовується в багатьох місцях коду.
  var socket = io();

  socket.on('contactLogin', contactID => {
    toggleContactStatus(contactID, 'on');
  });

  socket.on('contactLogout', contactID => {
    toggleContactStatus(contactID, 'off');
  });

  socket.on('message', msg => {
    handleMessage(msg)
  });
/* ↑↑↑ sockets ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  /**
   * [toggleContactStatus змінює візуалізацію статусу контакта (червона/зелена
   * пімпочка біля іконки)]
   * @param  {[String]} contactID [ідентифікатор контакту]
   * @param  {[String]} status    [on/off]
   */
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

  /**
   * [handleMessage обробляє подію сокета "вхідне повідомлення"]
   * @param  {[Object]} msg [об'єкт з параметрами для побудови html повідомлення
   * для моночатів:
   * {datatime  : 1633637202888,
   *  who       : "6128f4b586b0640204c57ed9",
   *  whoImgSrc : "img/users/6127f48dd770f515a0458394.jpg",
   *  whoName   : "name",
   *  whom      : "6127f48dd770f515a0458394",
   *  message   : "text",
   *  status    : "delivered"
   * }
   *  для групового чату:
   *  {datatime  : 1633637326955,
   *   who       : "6128f4b586b0640204c57ed9",
   *   whoImgSrc : "img/users/6127f48dd770f515a0458394.jpg",
   *   whoName   : "name",
   *   message   : "text",
   *   group     : "61531b750eb6f027ac74b35c"
   *  }]
   */
  function handleMessage(msg) {
    let userID = document.querySelector('.header__info .header__subheader').innerHTML.slice(1),
        chatID = msg.group || msg.who;

    if(userID == msg.who) {
      // own message
      addMessageToChat(msg, 'outgoing');

      if ( !isUnreadMessageExist() ) {
        scrollChatToBottom();
      }

      if ( isChatListOpen() ) {
        addMetaToList(chatID, msg.message, msg.datatime);
        // боковий статус 1 пташка
      }
    } else {
      // incoming message
      if( isChatAreaOpen() && getChatID() == msg.who) {

        if ( isUnreadMessageExist() ) {
          addMessageToChat(msg, 'incoming');

          if ( isChatListOpen() ) {
            addMetaToList(chatID, msg.message, msg.datatime);
            increaseBadge(chatID);
            // боковий статус 1 пташка
          }
        } else {
          addMessageToChat(msg, 'incoming');
          let msgDOM = document.querySelector('.chat-list__item_received[data-id="' + msg.who + '"][data-msgid="' + msg.datatime + '"]');
          makeMessageRead(msgDOM);
          if( isMessageHidden(msgDOM) ) {
            scrollChatToBottom();
          }
          if ( isChatListOpen() ) {
            addMetaToList(chatID, msg.message, msg.datatime);
            // боковий статус 2 пташки
          }
        }
      } else {
        if ( isChatListOpen() ) {
          addMetaToList(chatID, msg.message, msg.datatime);
          increaseBadge(chatID);
          // боковий статус 1 пташка
        }
      }
    }
  }

  /**
   * [isChatListOpen визначає, чи список чатів активний]
   * @return {Boolean} [результат перевірки]
   */
  function isChatListOpen() {
    return document.querySelector('[data-list="chatlist"]').classList.contains('list_active');
  }

  /**
   * [isChatAreaOpen визначає, чи область переписки видима]
   * @return {Boolean/DOM-Object} [false, якщо область не видима, або
   * DOM-object, якщо область видима]
   */
  function isChatAreaOpen() {
    let list_small = document.querySelector('.list_active[data-list="chat"]');
    if (list_small) return list_small;

    let list_big = document.querySelector('.list_active[data-list="chatP"]');
    if (list_big) return list_big

    return false
  }

  /**
   * [getChatID повертає ідентифікатор відкритої розмови]
   * @return {[String/Boolean]} [ідентифікатор відкритої розмови або false]
   */
  function getChatID() {
    let list = document.querySelector('.list_active ul.chat-list[data-chatid]');
    if (!list) return false;
    return list.dataset.chatid;
  }

  /**
   * [isUnreadMessageExist перевірка наявності не прочитаних повідомленнях]
   * @return {Boolean} [результат перевірки]
   */
  function isUnreadMessageExist() {
    let message;
    if ( isSmallView() ) {
      message = document.querySelector('[data-list="chat"] .chat-list__item_received[data-status="delivered"]');
    } else {
      message = document.querySelector('[data-list="chatP"] .chat-list__item_received[data-status="delivered"]');
    }

    if (message) {
      return true
    } else {
      return false
    }
  }

  /**
   * [isMessageHidden визначає, чи дане повідомлення знаходиться в зоні
   * видимості]
   * @param  {[DOM-node]} elem [повідомлення]
   * @return {Boolean}         [результат перевірки]
   */
  function isMessageHidden(elem) {

    let w        = elem.closest('.wjs-scroll__content'),
        ww       = elem.closest('.wjs-scroll__content-wrapper'),
        wTop     = w.getBoundingClientRect().top,
        wHeight  = ww.scrollHeight,
        elTop    = elem.getBoundingClientRect().top,
        elHeight = elem.scrollHeight;

    return (elTop > wHeight + wTop - elHeight)
  }

  /**
   * [increaseBadge збільшення лічильника повідомлень]
   * @param  {[String]} id [ідентифікатор розмови]
   */
  function increaseBadge(id) {
    let badge = document.querySelector('.chat-item[data-id="' + id + '"] .chat-item__badge');
    if (!badge) return;

    let count = +badge.innerHTML || 0;
    count = count + 1;

    badge.innerHTML = count;
    badge.classList.add('chat-item__badge_active');
  }

  /**
   * [increaseBadge зменшення лічильника повідомлень]
   * @param  {[String]} id [ідентифікатор розмови]
   */
  function decreaseBadge(id) {
    let badge = document.querySelector('.chat-item[data-id="' + id + '"] .chat-item__badge');
    if (!badge) return;

    let count = +badge.innerHTML || 0;
    count = count - 1;

    badge.innerHTML = count;
    if (count <= 0) {
      badge.innerHTML = '';
      badge.classList.remove('chat-item__badge_active');
    }
  }

  /**
   * [addMetaToList додає метадані в список чатів]
   * @param {[String]} id   [ідентифікатор розмови]
   * @param {[String]} text [текст останнього повідомлення в розмові]
   * @param {[Number]} date [час останнього повідомлення у мілісекундах]
   */
  function addMetaToList(id, text, date) {
    let listItemMessage = document.querySelector('.chat-item[data-id="' + id + '"] .chat-item__message'),
        listItemDate    = document.querySelector('.chat-item[data-id="' + id + '"] .chat-item__date');

    let dateObj = new Date(date),
        dd      = dateObj.getUTCDate(),
        mm      = dateObj.getUTCMonth() + 1,
        yy      = String(dateObj.getUTCFullYear()).slice(2);

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    let dateStr = dd + '.' + mm + '.' + yy;

    listItemDate.innerHTML = dateStr;
    listItemMessage.innerHTML = text;
  }

  /**
   * [addMessageToChat додає html-код повідомлення в кінець чату]
   * @param {[Object]} msg  [дані для побудови html повідомлення]
   * @param {[String]} type [тип повідомлення (вхідне/вихідне)]
   */
  function addMessageToChat(msg, type) {

    let date = new Date(msg.datatime),
        hh   = date.getUTCHours(),
        mm   = date.getMinutes();
    if (hh < 10) {
      hh = '0' + hh
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    let time = hh + ':' + mm;

    let html;
    if (type == 'incoming') {
      html = '\
              <li class="chat-list__item chat-list__item_received" data-id="' + msg.who + '" data-status="delivered" data-msgid="' + msg.datatime + '">\
                <div class="logo">\
                  <p class="logo__name">' + msg.whoName.toUpperCase().slice(0,2) + '</p>\
                  <img class="logo__img" src="' + msg.whoImgSrc + '">\
                </div>\
                <div class="chat-list__message">\
                  <div class="chat-list__message-text">' + msg.message + '</div>\
                  <div class="chat-list__message-date">' + time + '</div>\
                </div>\
              </li>\
            ';
    } else if (type == 'outgoing') {
      html = '\
        <li class="chat-list__item chat-list__item_sent" data-id="' + msg.who + '">\
         <div class="logo">\
           <p class="logo__name">' + msg.whoName.toUpperCase().slice(0,2) + '</p>\
           <img class="logo__img" src="' + msg.whoImgSrc + '">\
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
    }

    let list = isChatAreaOpen();
    if ( !list ) return
    list.querySelector('.chat-list').insertAdjacentHTML('beforeEnd', html);
  }

  /**
   * [makeMessageRead звертається до бд і змінює статус повідомлення, якщо ок,
   * змінює data-атрибут в html повідомлення]
   * @param  {[DOM-node]} msg [html повідомлення]
   */
  async function makeMessageRead(msg) {
    let contactID = msg.dataset.id,
        messageID = msg.dataset.msgid;

    let changeMessageStatusRequest = await changeMessageStatus(contactID, messageID);
    if (changeMessageStatusRequest.status == 200) {
      // ok
      msg.setAttribute('data-status','read');

    } else {
      // not ok ;-)
    }
  }

  /**
   * [scrollChatToBottom прокручує область чату до самого низу]
   */
  function scrollChatToBottom() {
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

  /**
   * [getUnreadMessagesNodesArr повертає масив непрочитаних повідомлень у
   * форматі DOM-вузлів]
   * @return {[Array]} [масив DOM-елементів, непрочитані повідомлення]
   */
  function getUnreadMessagesNodesArr() {
    let unreadMessageArr = [];

    if ( isSmallView() ) {
      unreadMessageArr = document.querySelectorAll('[data-list="chat"] .chat-list__item_received[data-status="delivered"]');
    } else {
      unreadMessageArr = document.querySelectorAll('[data-list="chatP"] .chat-list__item_received[data-status="delivered"]');
    }

    return unreadMessageArr;
  }

  /**
   * [handleMessagesList під час відкриття чату перевіряє наявність не
   * прочитаних повідомлень і відповідає за прокрутку]
   */
  async function handleMessagesList() {
    console.log("handleMessagesList");

    if ( isUnreadMessageExist() ) {

      let chatID = getChatID();

      let unreadMessageArr = getUnreadMessagesNodesArr();
      for (let i = 0; i < unreadMessageArr.length; i++) {
        let msg = unreadMessageArr[i];
        if ( isMessageHidden(msg) ) {
          await makeMessageRead(msg);
          if (isChatListOpen()) {
            decreaseBadge(chatID);
          }
          if ( isUnreadMessageExist() ) {
            // кнопка+
          } else {
            // кнопка-
          }
          return
        } else {
          await makeMessageRead(msg);
          if (isChatListOpen()) {
            decreaseBadge(chatID);
          }
        }
      }
      // кнопка-
    } else {
      scrollChatToBottom();
      // кнопка-
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////


var isScrollMessagesFuncAtWork = false;
async function scrollMessages() {

  if (isScrollMessagesFuncAtWork) { console.log('at work');return; }

  console.log('not at work');

  isScrollMessagesFuncAtWork = true;

  let unreadMessageArr;

  if ( isSmallView() ) {
    unreadMessageArr = document.querySelectorAll('[data-list="chat"] .chat-list__item_received[data-status="delivered"]');
  } else {
    unreadMessageArr = document.querySelectorAll('[data-list="chatP"] .chat-list__item_received[data-status="delivered"]');
  }

  console.log("unreadMessageArr", unreadMessageArr);

  if (unreadMessageArr && unreadMessageArr.length > 0) {
    console.log("unreadMessageArr2", unreadMessageArr);
    for (let msg of unreadMessageArr) {
      if ( !isMessageHidden(msg) ) {
        // await handleUnreadMessage(msg);
      }
    }
  }

  isScrollMessagesFuncAtWork = false;
}