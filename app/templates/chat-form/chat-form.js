"use strict"; // chat-form module
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  document.addEventListener('click', function(event){
    // open form
    if ( event.target.closest('.chat-form__textarea')
         && ! document.querySelector('.chat-form__textarea_active') ) {

      let ta  = event.target.closest('.chat-form__textarea'),
          btn = ta.closest('.chat-form').querySelector('.chat-form__btn');
      ta.classList.add('chat-form__textarea_active');
      btn.classList.add('chat-form__btn_active');
      ta.focus();
      return
    }

    // close form
    if( document.querySelector('.chat-form__textarea_active')
        && !event.target.closest('.chat-form__textarea_active') ) {

      let ta  = document.querySelector('.chat-form__textarea_active'),
          btn = ta.closest('.chat-form').querySelector('.chat-form__btn');
      ta.classList.remove('chat-form__textarea_active');
      btn.classList.remove('chat-form__btn_active');
      ta.blur();
    }
  });

  document.addEventListener('submit', function(event){
    event.preventDefault();
    if ( event.target.closest('.chat-form') ) {
      event.preventDefault();
      sendMessage(event);
    }
  });
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  async function sendMessage(event) {
    let message = event.target.querySelector('[name="chat-form-ta"]').value;

    event.target.querySelector('[name="chat-form-ta"]').value = '';

    if (message.length <= 0 || message.length > 3000) return;

    let contactID;
    if ( isSmallView() ) {
      contactID = document.querySelector('.left-side_with-subheader .subheader').dataset.id;
    } else {
      contactID = document.querySelector('[data-list="chatP"] .subheader').dataset.id;
    }

    let sendMessageRequest = await sendMessageToServer(contactID, message);
    if (sendMessageRequest.status == 200) {
      // додати повідомлення на сторінку
    } else {
      // показати попап з помилкою
      showPopupInfo('Помилка при відправці повідомлення');
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */