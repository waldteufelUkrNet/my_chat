"use strict"; // forms.js
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  document.addEventListener('click', async function(event) {
    if ( event.target.closest('form[name="loginForm"] button[type="submit"]') ) {
      event.preventDefault();
      formValidation();
      return
    }

    // toggle password visibility
    if ( event.target.closest('#popupChangePass .popup__pass-wrapper i.ico') ) {
      let inputWrapper = event.target.closest('.popup__pass-wrapper');
      toggleInputVisibility(inputWrapper);
    }

    // logout
    if ( event.target.closest('#popupLogout button[type="submit"]') ) {
      let logoutRequest = await logoutUser();
      if (logoutRequest.status == 200) {
        socket.emit('logout');
        document.querySelector('body').innerHTML = logoutRequest.html;
        document.querySelector('head title').innerHTML = 'Login';
        wSetScroll(document.querySelector('.login-main__inner'), {right:true, overflowXHidden:true});
      } else {
        window.location.href = 'about:blank';
      }
    }

    // delete account
    if ( event.target.closest('#popupDeleteAcc button[type="submit"]') ) {
      event.preventDefault();
      let deleteRequest = await deleteUser();
      if (deleteRequest.status == 200) {
        document.querySelector('body').innerHTML = deleteRequest.html;
        wSetScroll(document.querySelector('.login-main__inner'), {right:true, overflowXHidden:true});
      } else {
        window.location.href = 'about:blank';
      }
    }

    // change password
    if ( event.target.closest('#popupChangePass button[type="submit"]') ) {
      event.preventDefault();
      let oldPass  = document.querySelectorAll('#popupChangePass .popup__pass-wrapper input')[0].value || '',
          newPass1 = document.querySelectorAll('#popupChangePass .popup__pass-wrapper input')[1].value || '',
          newPass2 = document.querySelectorAll('#popupChangePass .popup__pass-wrapper input')[2].value || '';

      let checkOldPassRequest = await checkOldPass(oldPass);
      if (checkOldPassRequest.status == 200) {
        if(checkOldPassRequest.result != 'true') {
          // wrond pass
          showPopupError('popupChangePass', 0);
          return
        }
      } else {
        // error DB?
        showPopupError('popupChangePass', 3);
        return
      }

      if (newPass1.length < 6) {
        showPopupError('popupChangePass', 1);
        return
      }
      if (newPass1 != newPass2) {
        showPopupError('popupChangePass', 2);
        return
      }

      if ( document.querySelector('#popupChangePass .popup__message_active') ) return;

      let changePassRequest = await changePass(newPass2);
      if (changePassRequest.status == 500) {
        // error DB?
        showPopupError('popupChangePass', 3);
      } else if (changePassRequest.status == 200) {
        closePopup('popupChangePass');
        showPopupInfo('Пароль успішно змінено');
      }
    }

    // change username
    if ( event.target.closest('#popupChangeName button[type="submit"]') ) {
      event.preventDefault();
      let newLogin = document.querySelector('#changeUserNameForm input[name="name"]').value;

      if (!newLogin || newLogin.lengtn < 3) {
        showPopupError('popupChangeName', 0);
        return
      }

      let changeNameRequest = await changeName(newLogin);
      if (changeNameRequest.status == 500) {
        // error DB?
        showPopupError('popupChangeName', 2);
      } else if (changeNameRequest.status == 200) {
        closePopup('popupChangeName');
        showPopupInfo('Ім\'я успішно змінено');
        document.querySelector('h1.header__header').textContent = newLogin;
      }
    }

    // change avatar
    if ( event.target.closest('#popupChangeAva button[type="submit"]') ) {
      event.preventDefault();
      let input = document.querySelector('#popupChangeAva input[type="file"]');

      if (!input.files[0]) {
        // файл не обрано
        showPopupError('popupChangeAva', 0);
        return
      }

      let image = input.files[0];

      if (image.type != 'image/png' && image.type != 'image/jpeg') {
        // не підходящий mime-тип файлу
        showPopupError('popupChangeAva', 1);
        return
      }

      if (image.size > 5242880) {
        // розмір більше 5мб
        showPopupError('popupChangeAva', 2);
        return
      }

      // така милиця, що просто жах. Причому, якщо активна карточка групи і зліва список налаштувань, буде конфлікт
      let groupID;
      if ( document.querySelector('[data-list="groupcardP"]').classList.contains('list_active') ) {
        groupID = document.querySelector('[data-list="groupcardP"] .user-info__id').innerHTML.slice(1);
      } else if (document.querySelector('[data-list="groupcard"]').classList.contains('list_active') ) {
        groupID = document.querySelector('[data-list="groupcard"] .user-info__id').innerHTML.slice(1);
      }

      let changeAvaRequest = await changeAva(groupID);
      if (changeAvaRequest.status == 500) {
        // error DB?
        showPopupError('popupChangeAva', 2);
      } else if (changeAvaRequest.status == 200) {
        closePopup('popupChangeAva');
        showPopupInfo('Аватарку успішно змінено');
        if (groupID) {
          document.querySelector('[data-list="groupcardP"] .logo__img').setAttribute('src', userConfig.pathToUserLogo + changeAvaRequest.filename + '?v=' + Date.now());
          document.querySelector('[data-list="groupcard"] .logo__img').setAttribute('src', userConfig.pathToUserLogo + changeAvaRequest.filename + '?v=' + Date.now());
          document.querySelector('[data-list="chatlist"] [data-id="' + groupID + '"] .logo__img').setAttribute('src', userConfig.pathToUserLogo + changeAvaRequest.filename + '?v=' + Date.now());
        } else {
          document.querySelector('.header .logo__img').setAttribute('src', userConfig.pathToUserLogo + changeAvaRequest.filename + '?v=' + Date.now());
        }
      }
    }
  });

  document.addEventListener('input', async function(event){

    // check inputs in login/regster form
    if (event.target.name == 'name' && event.target.closest('[name="loginForm"]') ) {
      checkInpName();
    }
    if (event.target.name == 'pass1') {
      checkInpPass();
    }
    if (event.target.name == 'pass2') {
      checkInpRepP();
    }

    // check change password inputs
    if ( event.target.closest('#popupChangePass [name="oldPass"]') ) {
      let password = event.target.closest('#popupChangePass [name="oldPass"]').value;
      if (password.length >=6) {
        let checkOldPassRequest = await checkOldPass(password);
        if (checkOldPassRequest.status == 500) {
          // error DB?
          showPopupError('popupChangePass', 3);
        } else if (checkOldPassRequest.status == 200) {
          if(checkOldPassRequest.result == 'true') {
            // correct pass
            hidePopupError('popupChangePass');
          } else if (checkOldPassRequest.result == 'false') {
            // wrond pass
            showPopupError('popupChangePass', 0);
          }
        }
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

    // check change name input
    if (event.target.name == 'name' && event.target.closest('#changeUserNameForm')) {

      let input     = event.target,
          newLogin  = input.value,
          submitBtn = input.closest('#popupChangeName').querySelector('[form="changeUserNameForm"]');
      // перевірка зайнятості логіна
      if (newLogin.length >= 3 ) {

        let loginStatus = await isLoginFree(newLogin);
        if (loginStatus) {
          submitBtn.setAttribute('type','submit');
          hidePopupError('popupChangeName')
        } else if (loginStatus == false) {
          submitBtn.setAttribute('type','button');
          showPopupError('popupChangeName', 1)
        } else {
          // error DB?
          showPopupError('popupChangeName', 2)
        }
      }
    }

    // check file input (avatar img)
    if (event.target.name == "ava" && event.target.closest('#popupChangeAva') ) {
      let input = event.target;
      if (input.files[0]) {
        hidePopupError('popupChangeAva', 0);
      }

      let image = input.files[0];
      if (image.type == 'image/png' || image.type == 'image/jpeg') {
        hidePopupError('popupChangeAva', 1);
      }

      if (image.size <= 5242880) {
        hidePopupError('popupChangeAva', 2);
      }
    }
  });
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  async function showError(elem,text) {
    if (elem.clientHeight != 0) {
      elem.querySelector('span').innerText = text;
    } else {
      let height = 0;

      new Promise( (resolve, reject) => {
        elem.querySelector('span').innerText = text;
        elem.style.height = 'auto';
        height = elem.clientHeight + 20;
        elem.style.height = 0;
        resolve();
      }).then( () => {
        elem.style.height = height + 'px';
        elem.style.padding = '10px';
        elem.style.marginBottom = '10px';
      });
    }
  }

  function hideError(elem) {
    elem.style.height = 0;
    elem.style.paddingTop = 0;
    elem.style.paddingBottom = 0;
    elem.style.marginBottom = 0;
    elem.querySelector('span').innerText = '';
  }

  function hideAllErrors() {
    let errors = document.querySelectorAll('.error-info');
    errors.forEach( elem => hideError(elem) );
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

  function formValidation() {
    let lang     = document.querySelector('html').getAttribute('lang'),
        form     = document.forms.loginForm,
        formType = form.dataset.action,
        inpName  = form.querySelector('input[name="name"]'),
        inpPass  = form.querySelector('input[name="pass1"]'),
        inpRepP  = form.querySelector('input[name="pass2"]'),
        errors   = document.querySelectorAll('.error-info');

    // нема імені
    if (!inpName.value) {
      showError(errors[0], dictionary.login[lang]);
      inpName.focus();
      return;
    }

    // которке ім'я
    if ( inpName.value.length < 3 ) {
      showError(errors[0], dictionary.loginLength[lang]);
      inpName.focus();
      return;
    }

    // нема паролю
    if (!inpPass.value) {
      showError(errors[1], dictionary.password[lang]);
      inpPass.focus();
      return;
    }

    // которкий пароль
    if ( inpPass.value.length < 6 ) {
      showError(errors[1], dictionary.passLength[lang]);
      inpPass.focus();
      return;
    }

    // повторення паролю при реєстрації
    if ( formType == 'api/authorization/register' && !inpRepP.value ) {
      showError(errors[2], dictionary.repeat[lang]);
      inpRepP.focus();
      return;
    }

    // однаковість паролів
    if ( formType == 'api/authorization/register' && inpRepP.value != inpPass.value) {
      showError(errors[2], dictionary.notMatch[lang]);
      inpRepP.focus();
      return;
    }

    sendRegistrationData();
  }

  async function checkInpName() {
    let value     = document.querySelector('input[name="name"]').value,
        errors    = document.querySelectorAll('.error-info'),
        lang      = document.querySelector('html').getAttribute('lang'),
        form      = document.forms.loginForm,
        submitBtn = form.querySelector('#submitBtn'),
        formType  = form.dataset.action;
    // сервер: нема такого користувача
    if (value
        && (errors[0].querySelector('span').innerText == dictionary.noUser[lang]
            || errors[2].querySelector('span').innerText == dictionary.serverError[lang]) ) {
      hideError(errors[0]);
    }

    // нема імені
    if (value
        && errors[0].querySelector('span').innerText == dictionary.login[lang]
      ) {
      hideError(errors[0]);
      return;
    }

    // которке ім'я
    if (value.length >= 3
        && errors[0].querySelector('span').innerText == dictionary.loginLength[lang]
      ) {
      hideError(errors[0]);
      return;
    }

    // перевірка зайнятості логіна
    if (formType == 'api/authorization/register' && value.length >= 3 ) {

      let loginStatus = await isLoginFree(value);
      if (loginStatus) {
        hideError(errors[0]);
        submitBtn.setAttribute('type','submit');
      } else if (loginStatus == false) {
        showError(errors[0], dictionary.loginIsUsed[lang]);
        submitBtn.setAttribute('type','button');
      } else {
        // error DB?
        showError(errors[2], dictionary.serverError[lang]);
      }
    }
  }

  function checkInpPass() {
    let value  = document.querySelector('input[name="pass1"]').value,
        errors = document.querySelectorAll('.error-info'),
        lang   = document.querySelector('html').getAttribute('lang');

    // сервер: не вірний пароль
    if (value
        && errors[1].querySelector('span').innerText == dictionary.wrongPass[lang]
      ) {
      hideError(errors[1]);
      return;
    }

    // нема паролю
    if (value
        && errors[1].querySelector('span').innerText == dictionary.password[lang]
      ) {
      hideError(errors[1]);
      return;
    }

    // которкий пароль
    if (value.length >= 6
        && errors[1].querySelector('span').innerText == dictionary.passLength[lang]
      ) {
      hideError(errors[1]);
      return;
    }
  }

  function checkInpRepP() {
    let value1 = document.querySelector('input[name="pass1"]').value,
        value2 = document.querySelector('input[name="pass2"]').value,
        errors = document.querySelectorAll('.error-info'),
        lang   = document.querySelector('html').getAttribute('lang');

    // повторення паролю при реєстрації
    if (value2
        && errors[2].querySelector('span').innerText == dictionary.repeat[lang]
      ) {
      hideError(errors[2]);
      return;
    }

    // однаковість паролів
    if (value2 == value1
        && errors[2].querySelector('span').innerText == dictionary.notMatch[lang]
      ) {
      hideError(errors[2]);
      return;
    }
  }

  async function sendRegistrationData() {
    const form   = document.forms.loginForm,
          url    = form.dataset.action,
          lang   = form.querySelector('input[name="lang"]').value,
          name   = form.querySelector('input[name="name"]').value,
          pass   = form.querySelector('input[name="pass1"]').value,
          errors = document.querySelectorAll('.error-info');

    let user = {name,pass};

    if (url == 'api/authorization/register') {
      user.lang = lang;

      let registerResult = await registerUser(user);
      if (registerResult.status == 200) {
        document.querySelector('body').innerHTML = registerResult.html;
        document.querySelector('head title').innerHTML = 'My-cha-cha :-)';
        showContactsList();
        wSetScroll(document.querySelector('.left-side .lists-wrapper'), {right:true, overflowXHidden:true});
        socket.emit('login');
      } else if (registerResult.status == 500) {
        // error DB?
        showError(errors[2], dictionary.serverError[lang]);
      } else if (registerResult.status == 404) {
        showError(errors[0], dictionary.noUser[lang]);
      } else if (registerResult.status == 403) {
        // не вірний пароль
        showError(errors[1], dictionary.wrongPass[lang]);
      } else {
        // unknown error
        showError(errors[2], dictionary.serverError[lang]);
      }
    } else if (url == 'api/authorization/login') {

      let loginResult = await loginUser(user);
      if (loginResult.status == 200) {
        document.querySelector('body').innerHTML = loginResult.html;
        document.querySelector('head title').innerHTML = 'My-cha-cha :-)';
        showContactsList();
        wSetScroll(document.querySelector('.left-side .lists-wrapper'), {right:true, overflowXHidden:true});
        socket.emit('login');
      } else if (loginResult.status == 500) {
        // error DB?
        showError(errors[2], dictionary.serverError[lang]);
      } else if (loginResult.status == 404) {
        showError(errors[0], dictionary.noUser[lang]);
      } else if (loginResult.status == 403) {
        // не вірний пароль
        showError(errors[1], dictionary.wrongPass[lang]);
      } else {
        // unknown error
        showError(errors[2], dictionary.serverError[lang]);
      }
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
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////