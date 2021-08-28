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
    showBlackList ()   { showPopup('popupBlackList') },
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
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////