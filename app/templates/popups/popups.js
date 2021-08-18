"use strict";
// template: popups
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  var roles = {
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

    // toggle password visibility
    if ( event.target.closest('#popupChangePass .popup__pass-wrapper i.ico') ) {
      let inputWrapper = event.target.closest('.popup__pass-wrapper');
      toggleInputVisibility(inputWrapper);
    }

    // logout
    if ( event.target.closest('#popupLogout button[type="submit"]') ) {
      logoutUser();
    }

    // delete account
    if ( event.target.closest('#popupDeleteAcc button[type="submit"]') ) {
      event.preventDefault();
      deleteAccount();
    }

    // change password
    if ( event.target.closest('#popupChangePass button[type="submit"]') ) {
      event.preventDefault();
      changePassword();
    }
  });

  document.addEventListener('input', function(event){
    if ( event.target.closest('#popupChangePass [name="oldPass"]') ) {
      let password = event.target.closest('#popupChangePass [name="oldPass"]').value;
      if (password.length >=6) {
        checkOldPassword(password);
      }
    }
    if ( event.target.closest('#changePass_new') ) {
      let value = event.target.closest('#changePass_new').value;
      if (value.length >= 6) {
        hidePopupError('popupChangePass', 1);
      }
    }
    if ( event.target.closest('#changePass_repeat') ) {
      let value1 = document.querySelector('#changePass_new').value,
          value2 = event.target.closest('#changePass_repeat').value;
      if (value1 == value2) {
        hidePopupError('popupChangePass', 2);
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

  function toggleInputVisibility(inputWrapper) {
    if ( inputWrapper.classList.contains('popup__pass-wrapper_hidden') ) {
      inputWrapper.classList.remove('popup__pass-wrapper_hidden');
      inputWrapper.classList.add('popup__pass-wrapper_shown');
      inputWrapper.querySelector('input').setAttribute('type','text');
    } else if ( inputWrapper.classList.contains('popup__pass-wrapper_shown') ) {
      inputWrapper.classList.remove('popup__pass-wrapper_shown');
      inputWrapper.classList.add('popup__pass-wrapper_hidden');
      inputWrapper.querySelector('input').setAttribute('type','password');
    }
  }

  function showPopupError(popupId, messageNumber) {
    let popup    = document.getElementById(popupId),
        messages = popup.querySelectorAll('.popup__message'),
        message  = messages[messageNumber];

    message.className = 'popup__message popup__message_active popup__message_error';
  }

  function hidePopupError(popupId) {
    let popup    = document.getElementById(popupId),
        messages = popup.querySelectorAll('.popup__message');
    messages.forEach(message => {
      message.classList.remove('popup__message_active');
    });
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

  async function logoutUser() {
    let response = await fetch('/api/authorization/logout');
    if (response.status == 200) {
      let htmlString = await response.text();
      document.querySelector('body').innerHTML = htmlString;
      // eslint-disable-next-line no-undef
      wSetScroll(document.querySelector('.login-main__inner'), {right:true, overflowXHidden:true});
    } else {
      window.location.href = 'about:blank';
    }
  }

  async function deleteAccount() {
    let response = await fetch('/api/authorization/deleteUser', {
      method: "DELETE"
    });
    if (response.status == 200) {
      let htmlString = await response.text();
      document.querySelector('body').innerHTML = htmlString;
      // eslint-disable-next-line no-undef
      wSetScroll(document.querySelector('.login-main__inner'), {right:true, overflowXHidden:true});
    } else {
      window.location.href = 'about:blank';
    }
  }

  async function checkOldPassword(pass) {
    let response = await fetch('/api/settings/checkOldPassword', {
      method: 'POST',
      body: JSON.stringify({pass:pass}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    if (response.status == 500) {
      // error DB?
      showPopupError('popupChangePass', 3);
    } else if (response.status == 200) {
      let answer = await response.json();
      if(answer.result) {
        // correct pass
        hidePopupError('popupChangePass');
      } else {
        // wrond pass
        showPopupError('popupChangePass', 0);
      }
    }
  }

  async function changePassword() {

    let oldPass  = document.querySelectorAll('#popupChangePass .popup__pass-wrapper input')[0].value || '',
        newPass1 = document.querySelectorAll('#popupChangePass .popup__pass-wrapper input')[1].value || '',
        newPass2 = document.querySelectorAll('#popupChangePass .popup__pass-wrapper input')[2].value || '';

    await checkOldPassword(oldPass);
    if ( document.querySelector('#popupChangePass .popup__message_active') ) return;

    if (newPass1.length < 6) {
      showPopupError('popupChangePass', 1);
      return
    }
    if (newPass1 != newPass2) {
      showPopupError('popupChangePass', 2);
      return
    }

    let response = await fetch('/api/settings/changePassword', {
      method: 'POST',
      body: JSON.stringify({pass:newPass2}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    if (response.status == 500) {
      // error DB?
      showPopupError('popupChangePass', 3);
    } else if (response.status == 200) {
      let answer = await response.json();
      if(answer.result == 'changed') {
        // correct pass
        closePopup('popupChangePass');
        showPopupInfo('Пароль успішно змінено');
      }
    }
  }

/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
