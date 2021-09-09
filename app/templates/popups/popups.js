"use strict"; // template: popups
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  var roles = {
    login() {},        // тут - затичка. Обробник знаходиться в файлі login.js
    register() {},     // тут - затичка. Обробник знаходиться в файлі login.js
    showLogout()       { showPopup('popupLogout') },
    showDeleteAcc()    { showPopup('popupDeleteAcc') },
    showChangeAva ()   { showPopup('popupChangeAva') },
    showChangeName ()  { showPopup('popupChangeName') },
    showChangePass ()  { showPopup('popupChangePass') },
    showChangeThema () { showPopup('popupThemaSelect') },
    showChangeLang ()  { showPopup('popupLangSelect') },
    showGroupChat ()   { showPopup('popupGroupChat') },
    showBlackList ()   {
      showPopup('popupBlackList');
      showBList();
    },
    showClearHistory () { showPopup('popupClearHistory') },
    showLeaveGroup () { showPopup('popupLeaveGroup') },
    showGroupList () { showPopup('popupGroupList') },
    showDeleteGroup () { showPopup('popupDeleteGroup') },
    resetPopup (event) {
      let id = event.target.closest('.popup').getAttribute('id');
      closePopup(id);
    }
  };
  document.addEventListener('click', async function(event){
    if ( event.target.closest('[data-role]') ) {

      let foo = event.target.closest('[data-role]').dataset.role;
      if (roles[foo]) {
        roles[foo](event)
      }
    }

    // close popup
    if ( event.target.closest('.popup__close') ) {
      let id = event.target.closest('.popup').getAttribute('id');
      closePopup(id);
    }

    // delete contact from blacklist
    if ( event.target.closest('#popupBlackList li.popup__item button.popup__user-restore') ) {
      let userID = event.target.closest('.popup__item').dataset.id;
      removeFromBL(userID);
      showBList();
    }

    // show usercard
    if ( event.target.closest('#popupBlackList li.popup__item')
         && !event.target.closest('#popupBlackList li.popup__item button.popup__user-restore') ) {
      let userID = event.target.closest('.popup__item').dataset.id;
      openUserCard(userID);
      closePopup('popupBlackList');
    }

    // leave group
    if ( event.target.closest('#popupLeaveGroup button[type="submit"]') ) {
      closePopup('popupLeaveGroup');
      let id = document.querySelector('button[data-role="showLeaveGroup"]').dataset.id;
      let leaveGroupRequest = await leaveGroup(id);
      if (leaveGroupRequest.status != 200) {
        showPopupInfo('something went wrong with leaving group');
      } else {
        if ( document.querySelector('.left-side [data-list="chatlist"]') ) {
          showChatsList();
        }
      }
    }

    // see group members
    if ( event.target.closest('[data-role="showGroupList"]') ) {
      let id = event.target.closest('[data-role="showGroupList"]').dataset.id;
      let gListRequest = await loadGroupList(id);
      if (gListRequest.status = 200) {

      document.querySelector('#popupGroupList ul.popup__list').innerHTML = gListRequest.html;
      wSetScroll(document.querySelector('#popupGroupList .popup__list-wrapper.wjs-scroll'), {right:true, overflowXHidden:true});
      wSetScroll(document.querySelector('#popupGroupList .popup__list-wrapper.wjs-scroll'), {right:true, overflowXHidden:true});

      } else {
        showPopupInfo('something went wrong with downloading members list');
      }
    }

    // delete group
    if ( event.target.closest('#popupDeleteGroup button[type="submit"]') ) {
      let groupID = document.querySelector('[data-role="showDeleteGroup"]').dataset.id;
      let deleteGroupRequest = await deleteGroup(groupID);
      if (deleteGroupRequest.status == 200) {
        if ( document.querySelector('.left-side [data-list="chatlist"]') ) {
          showChatsList();
        }
        closePopup('popupDeleteGroup');
      } else {
        showPopupInfo('something went wrong with groupe deleting');
      }
    }

  });
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  function showPopup(id) {
    document.querySelector('.popups-wrapper').classList
                                             .add('popups-wrapper_active');

    document.querySelector('.body-inner').classList.add('body-inner_active');

    setTimeout(function(){
      document.getElementById(id).classList.add('popup_active');
    },1);
  }

  function closePopup(id) {
    document.querySelector('.popups-wrapper').classList
                                             .remove('popups-wrapper_active');
    document.querySelector('.body-inner').classList.remove('body-inner_active');
    let popup = document.getElementById(id);
    popup.classList.remove('popup_active');
    if ( popup.querySelector('form') ) {
      popup.querySelector('form').reset();
    }
    if ( popup.querySelector('.popup__message_active') ) {
      let messages = document.querySelectorAll('.popup__message_active');
      messages.forEach( message => {
        message.classList.remove('popup__message_active')
      } );
    }
  }

  function showPopupInfo(message) {
    let popup       = document.getElementById('popupShowInfo'),
        messageElem = popup.querySelector('.popup__message');

    messageElem.querySelector('span').textContent = message;
    messageElem.className = 'popup__message popup__message_active popup__message_info';

    document.querySelector('.popups-wrapper').classList
                                             .add('popups-wrapper_active');

    document.querySelector('.body-inner').classList.add('body-inner_active');

    setTimeout(function(){
      popup.classList.add('popup_active');
    },1);
  }

  async function showBList() {
    let showBListRequest = await loadBlackList();
    if (showBListRequest.status == 200) {
      document.querySelector('#popupBlackList ul.popup__list').innerHTML = showBListRequest.html;
      wSetScroll(document.querySelector('#popupBlackList .popup__list-wrapper .wjs-scroll'), {right:true, overflowXHidden:true});
      wSetScroll(document.querySelector('#popupBlackList .popup__list-wrapper .wjs-scroll'), {right:true, overflowXHidden:true});
    } else {
      showPopupInfo('something went wrong with load blacklist');
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////