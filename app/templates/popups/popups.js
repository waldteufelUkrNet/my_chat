"use strict";
////////////////////////////////////////////////////////////////////////////////
// template: popups
/* ↓↓↓ event listeners ↓↓↓ */

  const roles = {
    login() {},        // обробник знаходиться в файлі login.js
    register() {},     // обробник знаходиться в файлі login.js
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

  document.addEventListener('click', function(event){
    if ( event.target.closest('[data-role]') ) {
      let foo = event.target.closest('[data-role]').dataset.role;
      roles[foo](event)
    }

    // close popup
    if ( event.target.closest('.popup__close') ) {
      let id = event.target.closest('.popup').getAttribute('id');
      closePopup(id);
    }

    // logout
    if ( event.target.closest('#popupLogout button[type="submit"]') ) {
      logoutUser();
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
    document.getElementById(id).classList.remove('popup_active');
  }

  async function logoutUser() {
    let response = await fetch('/api/authorization/logout');
    if (response.status == 200) {
      let htmlString = await response.text();
      document.querySelector('body').innerHTML = htmlString;
      wSetScroll(document.querySelector('.login-main__inner'), {right:true, overflowXHidden:true});
    } else {
      window.location.href = 'about:blank';
    }

  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
