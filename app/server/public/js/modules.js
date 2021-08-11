"use strict"
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ chat-form module ↓↓↓ */
  document.addEventListener('click', function(event){
    // open form
    if ( event.target.closest('.chat-form__textarea')
         && ! document.querySelector('.chat-form__textarea_active') ) {
      let ta  = document.querySelector('.chat-form__textarea'),
          btn = document.querySelector('.chat-form__btn');
      ta.classList.add('chat-form__textarea_active');
      btn.classList.add('chat-form__btn_active');
      ta.focus();
      return
    }
  // close
  if( document.querySelector('.chat-form__textarea_active')
      && !event.target.closest('.chat-form__textarea_active') ) {
    let ta  = document.querySelector('.chat-form__textarea'),
        btn = document.querySelector('.chat-form__btn');
    ta.classList.remove('chat-form__textarea_active');
    btn.classList.remove('chat-form__btn_active');
    ta.blur();
  }
  });
/* ↑↑↑ chat-form module ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
"use strict"
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ header module ↓↓↓ */
  document.addEventListener('click', function(event){
    // open
    if ( event.target.closest('.header__menu-btn_secondary')
         && ! document.querySelector('.header__search_active') ) {
      let input   = document.querySelector('.header__search');
      input.classList.add('header__search_active');
      input.focus();
      return
    }


    // close
    if( document.querySelector('.header__search_active')
        && !event.target.closest('.header__search_active') ) {
      let input   = document.querySelector('.header__search');
      input.classList.remove('header__search_active');
      input.blur();
    }
  });
/* ↑↑↑ header module ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
"use strict";
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */

  const roles = {
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
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////