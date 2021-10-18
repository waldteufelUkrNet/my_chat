"use strict"; // chat-form module
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  document.addEventListener('click', function(event){
    // open form
    if ( event.target.closest('.chat-form__textarea')
         && ! document.querySelector('.chat-form__textarea_active') ) {

      let ta  = event.target.closest('.chat-form__textarea'),
          btn = ta.closest('.chat-form').querySelector('.chat-form__btn_text');
      ta.classList.add('chat-form__textarea_active');
      btn.classList.add('chat-form__btn_active');
      ta.focus();
      return
    }

    // close form
    if( document.querySelector('.chat-form__textarea_active')
        && !event.target.closest('.chat-form__textarea_active') ) {

      let ta  = document.querySelector('.chat-form__textarea_active'),
          btn = ta.closest('.chat-form').querySelector('.chat-form__btn_text');
      ta.classList.remove('chat-form__textarea_active');
      btn.classList.remove('chat-form__btn_active');
      ta.blur();
    }

    // toggle select file area
    if ( event.target.closest('.chat-form__btn_file')
         && !document.querySelector('.chat-form__file-input-wrapper_active') ) {
      if ( isSmallView() ) {
        document.querySelector('[data-list="chatP] .chat-form__file-input-wrapper').classList.add('chat-form__file-input-wrapper_active');
        document.querySelector('.chat-form__btn_file').classList.add('chat-form__btn_active');
      } else {
        document.querySelector('[data-list="chatP"] .chat-form__file-input-wrapper').classList.add('chat-form__file-input-wrapper_active');
        document.querySelector('.chat-form__btn_file').classList.add('chat-form__btn_active');
      }
    } else if (
         ( document.querySelector('.chat-form__file-input-wrapper_active')
           && !event.target.closest('.chat-form__btn_file')
           && !event.target.closest('[type="file"]')
         ) || (
           document.querySelector('.chat-form__file-input-wrapper_active')
           && event.target.closest('.chat-form__btn_file')
         )
       ) {
      if ( isSmallView() ) {
        document.querySelector('[data-list="chatP] .chat-form__file-input-wrapper').classList.remove('chat-form__file-input-wrapper_active');
        document.querySelector('.chat-form__btn_file').classList.remove('chat-form__btn_active');
      } else {
        document.querySelector('[data-list="chatP"] .chat-form__file-input-wrapper').classList.remove('chat-form__file-input-wrapper_active');
        document.querySelector('.chat-form__btn_file').classList.remove('chat-form__btn_active');
      }
    }

    // send file
    if ( event.target.closest('.chat-form__btn_send-file') ) {
      sendFile(event);
    }
  });

  // send message
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
      // додати повідомлення на сторінку - реалізація в сокетах
    } else {
      // показати попап з помилкою
      showPopupInfo('Помилка при відправці повідомлення');
    }
  }

  async function sendFile(event) {
    let fileInput = event.target.closest('.chat-form__file-input-wrapper')
                                .querySelector('[type="file"]');

    if (!fileInput.value) return;

    let formData     = new FormData( event.target.closest('form[name="chat-form"]') ),
        chatID       = getChatID(),
        filePath     = fileInput.value,
        fullfileName = filePath.match(/[ !\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}\.]+\.[\w\d]+$/ui)?.[0],
        fileExt      = fullfileName.match(/[^\.]+$/ui)[0],
        fileName     = fullfileName.slice(0, fullfileName.indexOf('.' + fileExt) );

    let sendFileRequest = await sendFileToServer(formData, chatID, fileName, fileExt);

    if (sendFileRequest.status == 200) {
      // додати повідомлення на сторінку - реалізація в сокетах
    } else {
      // показати попап з помилкою
      showPopupInfo('Помилка при відправці повідомлення');
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */