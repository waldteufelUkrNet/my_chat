"use strict"; // main.js
////////////////////////////////////////////////////////////////////////////////
showContactsList();
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

  function isSmallView() {
    let indicator = document.getElementById('widthIndicator');
    if (getComputedStyle(indicator).display == 'none') {
      return true
    }
    return false
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
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////