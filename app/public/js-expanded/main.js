"use strict";
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  document.addEventListener('click', function(event){
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
      let contactId = event.target.closest('.contact-item').dataset.id;
      console.log(`Відкрити usercard id: ${contactId}`);
    }

    // open group chat / mono chat (chatlist)
    if ( !event.target.closest('.logo')
         && event.target.closest('.chat-item') ) {
      let chatId  = event.target.closest('.chat-item').dataset.id,
          isGroup = event.target.closest('.chat-item').dataset.group;
      if (isGroup) {
        openChat(chatId, 'group');
      } else {
        openChat(chatId, 'mono');
      }
    }

    // open groupcard / usercard (chatlist)
    if ( event.target.closest('.logo')
         && event.target.closest('.chat-item') ) {
      let chatId  = event.target.closest('.chat-item').dataset.id,
          isGroup = event.target.closest('.chat-item').dataset.group;
      if (isGroup) {
        openGroupCard(chatId);
      } else {
        openUserCard(chatId);
      }
    }

    // open usercard (chat)
    if ( event.target.closest('.logo')
         && event.target.closest('.chat-list__item_received') ) {
      let contactId = event.target.closest('.chat-list__item_received').dataset.id;
      openUserCard(contactId);
    }

    // open groupcard / usercard (subheader)
    if ( event.target.closest('.subheader') ) {
      let contactId = event.target.closest('.subheader').dataset.id,
          isGroup   = event.target.closest('.subheader').dataset.group;
      if (isGroup) {
        openGroupCard(contactId);
      } else {
        openUserCard(contactId);
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
    document.querySelector('.left-side').classList.remove('left-side_with-subheader');
    document.querySelector('.left-side .subheader').style.display = 'none';
    let targetGroup = document.querySelectorAll('.list[data-list-group="' + group + '"]'),
        targetItem  = document.querySelector('[data-list="' + target + '"]');

    targetGroup.forEach(item => {
      item.classList.remove('list_active');
    });
    targetItem.classList.add('list_active');

    wSetScroll(document.querySelector('.lists-wrapper'), {right:true, overflowXHidden:true})
  }

  function isSmallView() {
    let indicator = document.getElementById('widthIndicator');
    if (getComputedStyle(indicator).display == 'none') {
      return true
    }
    return false
  }

  function openUserCard(id) {
    console.log(`Відкрити usercard id: ${id}`);
    if ( isSmallView() ) {
      showMenuItem('aside', 'usercard')
    } else {
      showMenuItem('page', 'usercardP')
    }
  }

  function openGroupCard(id) {
    console.log(`Відкрити groupcard id: ${id}`);
    if ( isSmallView() ) {
      showMenuItem('aside', 'groupcard')
    } else {
      showMenuItem('page', 'groupcardP')
    }
  }

  function openChat(id, meta) {
    console.log(`Відкрити ${meta}-чат з id ${id}`)
    if ( isSmallView() ) {
      showMenuItem('aside', 'chat');
      document.querySelector('.left-side').classList.add('left-side_with-subheader');
      document.querySelector('.left-side .subheader').style.display = 'flex';
      wSetScroll( document.querySelector('.lists-wrapper.wjs-scroll'),
                  { right:true,
                    overflowXHidden:true
                });
    } else {
      showMenuItem('page', 'chatP')
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////





































function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function test() {
  await showMenuItem('aside', 'menu');
  await sleep(2000);
  await showMenuItem('aside', 'settings');
  await sleep(2000);
  await showMenuItem('aside', 'chatlist');
  await sleep(2000);
  await showMenuItem('aside', 'contactlist');
  await sleep(2000);
  await showMenuItem('aside', 'usercard');
  await sleep(2000);
  await showMenuItem('aside', 'groupcard');
  await sleep(2000);
  await showMenuItem('aside', 'chat');
  await sleep(2000);
  await showMenuItem('page', 'startP');
  await sleep(2000);
  await showMenuItem('page', 'usercardP');
  await sleep(2000);
  await showMenuItem('page', 'groupcardP');
  await sleep(2000);
  await showMenuItem('page', 'chatP');
}
// test();