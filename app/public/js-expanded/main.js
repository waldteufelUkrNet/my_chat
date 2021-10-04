"use strict"; // main.js
////////////////////////////////////////////////////////////////////////////////
if( document.querySelector('.left-side')) {
  showContactsList();
}
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  document.addEventListener('click', function(event){

    // toggle lef-side menus
    if ( event.target.closest('[data-target-group]') ) {
      let elem   = event.target.closest('[data-target-group]'),
          group  = elem.dataset.targetGroup,
          target = elem.dataset.target;
      showMenuItem(group, target);
    }

    // open mono chat (contactlist)
    if ( event.target.closest('.contact-item__name') ) {
      let contactId = event.target.closest('.contact-item').dataset.id;
      openChat(contactId, 'mono');
    }

    // open usercard (contactlist)
    if ( event.target.closest('.logo')
         && event.target.closest('.contact-item') ) {
      let id = event.target.closest('.contact-item').dataset.id;
      openUserCard(id);
    }

    // open group chat / mono chat (chatlist)
    if ( !event.target.closest('.logo')
         && event.target.closest('.chat-item') ) {
      let chatId  = event.target.closest('.chat-item').dataset.id,
          isGroup = event.target.closest('.chat-item').dataset.group;
      if (isGroup == 'true') {
        openChat(chatId, 'group');
      } else {
        openChat(chatId, 'mono');
      }
    }

    // open groupcard / usercard (chatlist)
    if ( event.target.closest('.logo')
         && event.target.closest('.chat-item') ) {
      let id      = event.target.closest('.chat-item').dataset.id,
          isGroup = event.target.closest('.chat-item').dataset.group;
      if (isGroup == 'true') {
        openGroupCard(id);
      } else {
        openUserCard(id);
      }
    }

    // open usercard (chat)
    if ( event.target.closest('.logo')
         && event.target.closest('.chat-list__item_received') ) {
      let id = event.target.closest('.chat-list__item_received').dataset.id;
      openUserCard(id);
    }

    // open groupcard / usercard (subheader)
    if ( event.target.closest('.subheader') ) {
      let id      = event.target.closest('.subheader').dataset.id,
          isGroup = event.target.closest('.subheader').dataset.group;
      if (isGroup == 'true') {
        openGroupCard(id);
      } else {
        openUserCard(id);
      }
    }

    // open mono chat
    if (event.target.closest('.round-btn[data-group="false"]')) {
      let contactId = event.target.closest('.round-btn[data-group="false"]').dataset.id;
      openChat(contactId, 'mono');
    }

    // open group chat
    if (event.target.closest('.round-btn[data-group="true"]')) {
      let contactId = event.target.closest('.round-btn[data-group="true"]').dataset.id;
      openChat(contactId, 'group');
    }
  });

  if ( document.querySelector('[data-list="chatP"] .wjs-scroll__content') ) {
    document.querySelector('[data-list="chatP"] .wjs-scroll__content').addEventListener('scroll', function(event){
      scrollMessages();
    });
  }

  if ( document.querySelector('[data-list="chat"] .wjs-scroll__content') ) {
    document.querySelector('[data-list="chat"] .wjs-scroll__content').addEventListener('scroll', function(event){
      scrollMessages();
    });
  }
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  function showMenuItem(group, target) {
    // це свого роду затичка: код для сторінок з формою входу і чатом один і той
    // же. Для показу контактів викликається функція showContactsList(), а їй
    // потрібна бокова панель, якої нема на сторінці з формою
    if( ! document.querySelector('.left-side')) return;

    document.querySelector('.left-side').classList.remove('left-side_with-subheader');
    if ( document.querySelector('.left-side .subheader') ) {
      document.querySelector('.left-side .subheader').style.display = 'none';
    }
    let targetGroup = document.querySelectorAll('.list[data-list-group="' + group + '"]'),
        targetItem  = document.querySelector('[data-list="' + target + '"]');

    targetGroup.forEach(item => {
      item.classList.remove('list_active');
    });
    targetItem.classList.add('list_active');

    if (group == 'aside' && target == 'contactlist') showContactsList();

    if (group == 'aside' && target == 'chatlist') showChatsList();

    wSetScroll(document.querySelector('.lists-wrapper'), {right:true, overflowXHidden:true})
  }

  async function openUserCard(id) {
    let userCardRequest = await renderUserCard(id);
    if (userCardRequest.status == 200) {
      document.querySelector('[data-list-group="aside"][data-list="usercard"]').innerHTML = userCardRequest.html;
      document.querySelector('[data-list-group="page"][data-list="usercardP"]').innerHTML = userCardRequest.html;
    } else {
      // помилка
    }

    if ( isSmallView() ) {
      showMenuItem('aside', 'usercard')
      wSetScroll( document.querySelector('.lists-wrapper.wjs-scroll'),
                  { right:true,
                    overflowXHidden:true
                });
    } else {
      showMenuItem('page', 'usercardP')
    }
  }

  async function openGroupCard(id) {
    let groupCardRequest = await renderGroupCard(id);
    if (groupCardRequest.status == 200) {
      document.querySelector('[data-list-group="aside"][data-list="groupcard"]').innerHTML = groupCardRequest.html;
      document.querySelector('[data-list-group="page"][data-list="groupcardP"]').innerHTML = groupCardRequest.html;
    } else {
      // помилка
    }

    if ( isSmallView() ) {
      showMenuItem('aside', 'groupcard')
      wSetScroll( document.querySelector('.lists-wrapper.wjs-scroll'),
                  { right:true,
                    overflowXHidden:true
                });
    } else {
      showMenuItem('page', 'groupcardP')
    }
  }

  async function openChat(id, meta) {

    await showSubheader(id, meta);

    let tzOffset = new Date().getTimezoneOffset();

    document.querySelector('.right-side .chat-wrapper .wjs-scroll__content').innerHTML = '';
    document.querySelector('.chat-wrapper_small-view').innerHTML = '';


    let openChatRequest = await loadChat(id, meta, tzOffset);
    if (openChatRequest.status == 200) {
      document.querySelector('.right-side .chat-wrapper .wjs-scroll__content').innerHTML = openChatRequest.html;
      document.querySelector('.chat-wrapper_small-view').innerHTML = openChatRequest.html;
    } else {
      showPopupInfo('something went wrong with chat downloading');
    }

    if ( isSmallView() ) {
      showMenuItem('aside', 'chat');
      document.querySelector('.left-side').classList.add('left-side_with-subheader');
      if ( document.querySelector('.left-side .subheader') ) {
        document.querySelector('.left-side .subheader').style.display = 'flex';
      }
      wSetScroll( document.querySelector('.lists-wrapper.wjs-scroll'),
                  { right:true, overflowXHidden:true });
    } else {
      showMenuItem('page', 'chatP')

      wSetScroll( document.querySelector('.right-side .chat-wrapper.wjs-scroll'),
                  { right:true, overflowXHidden:true });
      wSetScroll( document.querySelector('.right-side .chat-wrapper.wjs-scroll'),
                  { right:true, overflowXHidden:true });
    }

    let unreadMessageArr;

    if ( isSmallView() ) {
      unreadMessageArr = document.querySelectorAll('[data-list="chat"] .chat-list__item_received[data-status="delivered"]');
    } else {
      unreadMessageArr = document.querySelectorAll('[data-list="chatP"] .chat-list__item_received[data-status="delivered"]');
    }

    if (unreadMessageArr) {
      for (let msg of unreadMessageArr) {
        if ( isMessageHidden(msg) ) {
          msg.scrollIntoView({behavior: 'smooth', block: 'end'});
        }
        await handleUnreadMessage(msg);
        break
      }
    }
  }

  async function showSubheader(id, meta) {
    let showSubheaderRequest = await loadContactSubheader(id, meta);
    if (showSubheaderRequest.status == 200) {
      document.querySelector('.left-side .subheader__wrapper').innerHTML = showSubheaderRequest.html;
      document.querySelector('.right-side .subheader__wrapper').innerHTML = showSubheaderRequest.html;
      // document.querySelector('.left-side .subheader').style.display = 'flex';
    } else {
      //
    }
  }

  async function showContactsList() {
    let contactsListRequest = await renderContactsList();
    if (contactsListRequest.status == 200) {
      if (contactsListRequest.html.length > 0) {
        // показ списку
        document.querySelector('.left-side .list_active').innerHTML = contactsListRequest.html;
        wSetScroll( document.querySelector('.lists-wrapper.wjs-scroll'),
                    { right:true,
                      overflowXHidden:true
                  });
      } else {
        showMenuItem('aside', 'startL');
      }
    } else {
      showMenuItem('aside', 'startL');
    }
  }

  async function showChatsList() {
    let chatsListRequest = await renderChatsList();
    if (chatsListRequest.status == 200) {
      if (chatsListRequest.html.length > 0) {
        // показ списку
        document.querySelector('.left-side .list_active').innerHTML = chatsListRequest.html;
        wSetScroll( document.querySelector('.lists-wrapper.wjs-scroll'),
                    { right:true,
                      overflowXHidden:true
                  });
      } else {
        showMenuItem('aside', 'startL');
      }
    } else {
      showMenuItem('aside', 'startL');
    }
  }

  function isMessageHidden(elem) {

    let w        = elem.closest('.wjs-scroll__content'),
        ww       = elem.closest('.wjs-scroll__content-wrapper'),
        wTop     = w.getBoundingClientRect().top,
        wHeight  = ww.scrollHeight,
        elTop    = elem.getBoundingClientRect().top,
        elHeight = elem.scrollHeight;

    return (elTop > wHeight + wTop - elHeight)
  }

  async function handleUnreadMessage(msg) {
    // data-status="delivered" -> "read"
    // зменшити лічильник badge (якщо його видно)
    // запит до бд зі зміною статусу повідомлення

    let contactID = msg.dataset.id,
        messageID = msg.dataset.msgid;

    let changeMessageStatusRequest = await changeMessageStatus(contactID, messageID);
    if (changeMessageStatusRequest.status == 200) {
      // ok
      msg.setAttribute('data-status','read');

      if( isChatListOpen() ) {
        let badge = document.querySelector('.chat-item[data-id="' + msg.dataset.id + '"] .chat-item__badge');
        if ( badge.classList.contains('chat-item__badge_active') ) {
          let count = +badge.innerHTML - 1;
          badge.innerHTML = count;
          if (count == 0) {
            badge.classList.remove('chat-item__badge_active');
          }
        }
      }

    } else {
      // not ok ;-)
    }
  }

  function isChatListOpen() {
    return document.querySelector('[data-list="chatlist"]').classList.contains('list_active');
  }

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
          await handleUnreadMessage(msg);
        }
      }
    }

    isScrollMessagesFuncAtWork = false;
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////