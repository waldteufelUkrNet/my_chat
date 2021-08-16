"use strict";
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ custom scroll ↓↓↓ */
  // ініціалізація
  document.addEventListener('DOMContentLoaded', function(){
    if ( !document.querySelector('.wjs-scroll') ) return;

    let arrOfScrollableElements = document.querySelectorAll('.wjs-scroll');
    for (let elem of arrOfScrollableElements) {
      wSetScroll(elem);
    }
  });

  // слідкування за змінами в сторінці (елемент може повністю влізти на
  // сторінку або навпаки), відповідно скрол повинен пропасти/з'явитися
  window.addEventListener('resize', function(){
    if ( !document.querySelector('.wjs-scroll') ) return;

    let arrOfScrollableElements = document.querySelectorAll('.wjs-scroll');
    for (let elem of arrOfScrollableElements) {
      wSetScroll(elem);
    }
  });
/* ↑↑↑ custom scroll ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
/**
 * [wSetScroll відповідає за кастомну прокрутку:
 * 1. зчитує з атрибутів елемента, які прокрутки потрібно додати,
 * 2. слідкує за прокруткою елемента і поправляє положення повзунків прокрутки
 * 3. слідкує за положенням повзунків прокрутки і поправляє прокрутку елемента]
 * @param {[DOM-object]} elem [елемент DOM з класом .wjs-scroll]
 * @param {[object]} params [набір налаштувань для одиночного запуску функції
 * формат даних: {top:boolean, bottom:boolean, left:boolean, right:boolean,
 * overflowXHidden:boolean, overvlowYHidden:boolean}]
 */
function wSetScroll(elem, params = {}) {

  if (!elem) return;

  if ( !elem.querySelector('.wjs-scroll__content-wrapper')
       || !elem.querySelector('.wjs-scroll__content') ) {
    console.log('markup error: wrong html structure');
    return;
  }

  let container      = elem,
      contentWrapper = elem.querySelector('.wjs-scroll__content-wrapper'),
      content        = elem.querySelector('.wjs-scroll__content');

  /* ↓↓↓ ПІДГОТОВКА ↓↓↓ */

    // заборона прокрутки (якщо потрібно)
    let settingsString2 = container.dataset.scrollHidden || '';
    let overflowXProhibition = settingsString2.match(/horizontal/i)
                               || params.overflowXHidden;
    let overflowYProhibition = settingsString2.match(/vertical/i)
                               || params.overflowYHidden;

    if (overflowXProhibition && overflowYProhibition) {
      content.style.overflow = 'hidden';
      return
    } else if (overflowXProhibition) {
      content.style.overflowX = 'hidden';
    } else if (overflowYProhibition) {
      content.style.overflowY = 'hidden';
    }
    // корекція розміру контенту: його внутрішній рзмір має бути таким, як і
    // сам контейнер, а скрол повинен бути прихований за межами контейнеру.
    let scrollLineHeight = content.offsetHeight - content.clientHeight,
        scrollLineWidth  = content.offsetWidth - content.clientWidth;

    content.style.height = contentWrapper.clientHeight + scrollLineHeight + 'px';
    content.style.width  = contentWrapper.clientWidth + scrollLineWidth + 'px';
  /* ↑↑↑ /ПІДГОТОВКА ↑↑↑ */

  /* ↓↓↓ ДОДАВАННЯ ПОЛОС ПРОКРУТКИ ↓↓↓ */
    let lineT, lineB, thumbT, thumbB,
        lineR, lineL, thumbR, thumbL;

    let settingsString = container.dataset.scroll || '';

    // додавання полос прокрутки по горизонталі
    if ( !overflowXProhibition && (content.scrollWidth > content.clientWidth) ) {

      if ( params.top || settingsString.match(/top/i) ) {
        if ( !container.querySelector('.wjs-scroll__line_top') ) {
          wAddScrollLine('top');
        }
        lineT  = container.querySelector('.wjs-scroll__line_top');
        thumbT = container.querySelector('.wjs-scroll__thumb_top');

        thumbT.style.width = lineT.clientWidth*content.clientWidth/content.scrollWidth + 'px';
      }

      if ( params.bottom
        || settingsString.match(/bottom/i)
        || (!params.bottom
          && !params.top
          && !settingsString.match(/bottom/i)
          && !settingsString.match(/top/i) ) ) {
        if ( !container.querySelector('.wjs-scroll__line_bottom') ) {
          wAddScrollLine('bottom');
        }
        lineB  = container.querySelector('.wjs-scroll__line_bottom');
        thumbB = container.querySelector('.wjs-scroll__thumb_bottom');

        thumbB.style.width = lineB.clientWidth*content.clientWidth/content.scrollWidth + 'px';
      }
    } else {
      wRemoveScrollLine('gorizontal');
    }

    // додавання полос прокрутки по вертикалі
    if ( !overflowYProhibition && (content.scrollHeight > content.clientHeight) ) {

      if ( params.left || settingsString.match(/left/i) ) {
        if ( !container.querySelector('.wjs-scroll__line_left') ) {
          wAddScrollLine('left');
        }
        lineL  = container.querySelector('.wjs-scroll__line_left');
        thumbL = container.querySelector('.wjs-scroll__thumb_left');

        thumbL.style.height = lineL.clientHeight*content.clientHeight/content.scrollHeight + 'px';
      }

      if ( params.right
        || settingsString.match(/right/i)
        || (!params.left
          && !params.right
          && !settingsString.match(/left/i)
          && !settingsString.match(/right/i) ) ) {
        if ( !container.querySelector('.wjs-scroll__line_right') ) {
          wAddScrollLine('right');
        }
        lineR  = container.querySelector('.wjs-scroll__line_right');
        thumbR = container.querySelector('.wjs-scroll__thumb_right');

        thumbR.style.height = lineR.clientHeight*content.clientHeight/content.scrollHeight + 'px';
      }
    } else {
      wRemoveScrollLine('vertical');
    }
  /* ↑↑↑ ДОДАВАННЯ ПОЛОС ПРОКРУТКИ ↑↑↑ */

  /* ↓↓↓ ПРОКРУТКА КОЛІЩАТКОМ МИШІ ↓↓↓ */
    content.onscroll = function (event) {

      // кожного разу після повторного виклику функції формується нове
      // лексичне оточення, тому ці змінні потрібно постійно перепризначати
      lineL  = container.querySelector('.wjs-scroll__line_left');
      thumbL = container.querySelector('.wjs-scroll__thumb_left');
      lineR  = container.querySelector('.wjs-scroll__line_right');
      thumbR = container.querySelector('.wjs-scroll__thumb_right');
      lineT  = container.querySelector('.wjs-scroll__line_top');
      thumbT = container.querySelector('.wjs-scroll__thumb_top');
      lineB  = container.querySelector('.wjs-scroll__line_bottom');
      thumbB = container.querySelector('.wjs-scroll__thumb_bottom');

      // вертикальний скрол
      let maxContentYScroll = content.scrollHeight - content.clientHeight;
      let maxThumbYScroll;

      if (lineL) {
        maxThumbYScroll = lineL.clientHeight - thumbL.clientHeight;
      } else if (lineR) {
        maxThumbYScroll = lineR.clientHeight - thumbR.clientHeight;
      }

      let thumbCurrentTop = maxThumbYScroll*content.scrollTop/maxContentYScroll;
      if (thumbR) {
        thumbR.style.top = thumbCurrentTop + 'px';
      }
      if (thumbL) {
        thumbL.style.top = thumbCurrentTop + 'px';
      }

      // горизонтальний скрол
      let maxContentXScroll = content.scrollWidth - content.clientWidth;
      let maxThumbXScroll;

      if (lineT) {
        maxThumbXScroll = lineT.clientWidth- thumbT.clientWidth;
      } else if (lineB) {
        maxThumbXScroll = lineB.clientWidth - thumbB.clientWidth;
      }

      let thumbCurrentLeft = maxThumbXScroll*content.scrollLeft/maxContentXScroll;
      if (thumbB) {
        thumbB.style.left = thumbCurrentLeft + 'px';
      }
      if (thumbT) {
        thumbT.style.left = thumbCurrentLeft + 'px';
      }
    }
  /* ↑↑↑ /ПРОКРУТКА КОЛІЩАТКОМ МИШІ ↑↑↑ */

  /* ↓↓↓ ПРОКРУТКА ПОВЗУНКОМ ↓↓↓ */
    // Drag'n'Drop
    if ( container.querySelector('.wjs-scroll__thumb_right') ) {
      container.querySelector('.wjs-scroll__thumb_right').addEventListener('mousedown', verticalThumbScroll);
      container.querySelector('.wjs-scroll__thumb_right').ondragstart = function() {return false;};
    }
    if ( container.querySelector('.wjs-scroll__thumb_left') ) {
      container.querySelector('.wjs-scroll__thumb_left').addEventListener('mousedown', verticalThumbScroll);
      container.querySelector('.wjs-scroll__thumb_left').ondragstart = function() {return false;};
    }
    if ( container.querySelector('.wjs-scroll__thumb_top') ) {
      container.querySelector('.wjs-scroll__thumb_top').addEventListener('mousedown', gorizontalThumbScroll);
      container.querySelector('.wjs-scroll__thumb_top').ondragstart = function() {return false;};
    }
    if ( container.querySelector('.wjs-scroll__thumb_bottom') ) {
      container.querySelector('.wjs-scroll__thumb_bottom').addEventListener('mousedown', gorizontalThumbScroll);
      container.querySelector('.wjs-scroll__thumb_bottom').ondragstart = function() {return false;};
    }

    function verticalThumbScroll(event) {
      let thumb = container.querySelector('.wjs-scroll__thumb_right')
               || container.querySelector('.wjs-scroll__thumb_left');
      let line = container.querySelector('.wjs-scroll__line_right')
              || container.querySelector('.wjs-scroll__line_left');

      event.target.closest('.wjs-scroll__wrapper').classList.add('wjs-scroll__wrapper_active-v');

      let startClientY          = event.clientY;
      let thumbStartAbsPosition = parseFloat( getComputedStyle(thumb).top );
      let thumbTopFixPosition   = thumb.getBoundingClientRect().top;
      let maxThumbScroll        = line.clientHeight - thumb.clientHeight;
      let maxContentScroll      = content.scrollHeight - content.clientHeight;

      function onMouseMove(event) {
        let shift = event.clientY - startClientY;

        let thumbCurrentAbsPosition = thumbStartAbsPosition + shift;
        if (thumbCurrentAbsPosition < 0) {
          thumbCurrentAbsPosition = 0;
        }
        if ( thumbCurrentAbsPosition > maxThumbScroll) {
          thumbCurrentAbsPosition = maxThumbScroll;
        }

        content.scrollTop = parseFloat( getComputedStyle(thumb).top )*maxContentScroll/maxThumbScroll;

        if ( container.querySelector('.wjs-scroll__thumb_right') ) {
          container.querySelector('.wjs-scroll__thumb_right').style.top = thumbCurrentAbsPosition + 'px';
        }
        if ( container.querySelector('.wjs-scroll__thumb_left') ) {
          container.querySelector('.wjs-scroll__thumb_left').style.top = thumbCurrentAbsPosition + 'px';
        }
      }

      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        thumb.onmouseup = null;
        event.target.closest('.wjs-scroll__wrapper').classList.remove('wjs-scroll__wrapper_active-v');
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    function gorizontalThumbScroll(event) {
      let thumb = container.querySelector('.wjs-scroll__thumb_bottom')
               || container.querySelector('.wjs-scroll__thumb_top');
      let line = container.querySelector('.wjs-scroll__line_bottom')
              || container.querySelector('.wjs-scroll__line_top');

      event.target.closest('.wjs-scroll__wrapper').classList.add('wjs-scroll__wrapper_active-h');

      let startClientX          = event.clientX;
      let thumbStartAbsPosition = parseFloat( getComputedStyle(thumb).left );
      let thumbLeftFixPosition  = thumb.getBoundingClientRect().left;
      let maxThumbScroll        = line.clientWidth - thumb.clientWidth;
      let maxContentScroll      = content.scrollWidth - content.clientWidth;

      function onMouseMove(event) {
        let shift = event.clientX - startClientX;

        let thumbCurrentAbsPosition = thumbStartAbsPosition + shift;
        if (thumbCurrentAbsPosition < 0) {
          thumbCurrentAbsPosition = 0;
        }
        if ( thumbCurrentAbsPosition > maxThumbScroll) {
          thumbCurrentAbsPosition = maxThumbScroll;
        }

        content.scrollLeft = parseFloat( getComputedStyle(thumb).left )*maxContentScroll/maxThumbScroll;


        if ( container.querySelector('.wjs-scroll__thumb_bottom') ) {
          container.querySelector('.wjs-scroll__thumb_bottom').style.left = thumbCurrentAbsPosition + 'px';
        }
        if ( container.querySelector('.wjs-scroll__thumb_top') ) {
          container.querySelector('.wjs-scroll__thumb_top').style.left = thumbCurrentAbsPosition + 'px';
        }
      }

      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        thumb.onmouseup = null;
        event.target.closest('.wjs-scroll__wrapper').classList.remove('wjs-scroll__wrapper_active-h');
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  /* ↑↑↑ /ПРОКРУТКА ПОВЗУНКОМ ↑↑↑ */

  function wAddScrollLine(name) {
    let html = '\
                <div class="wjs-scroll__wrapper wjs-scroll__wrapper_' + name + '">\
                  <div class="wjs-scroll__line wjs-scroll__line_' + name + '">\
                    <div class="wjs-scroll__thumb wjs-scroll__thumb_' + name + '"></div>\
                  </div>\
                </div>\
               ';
    container.insertAdjacentHTML('afterBegin', html);
  }

  function wRemoveScrollLine(name) {
    if (name == 'vertical') {
      if ( container.querySelector('.wjs-scroll__wrapper_right') ) {
        container.querySelector('.wjs-scroll__wrapper_right').remove();
      }
      if ( container.querySelector('.wjs-scroll__wrapper_left') ) {
        container.querySelector('.wjs-scroll__wrapper_left').remove();
      }
    } else if (name == 'gorizontal') {
      if ( container.querySelector('.wjs-scroll__wrapper_top') ) {
        container.querySelector('.wjs-scroll__wrapper_top').remove();
      }
      if ( container.querySelector('.wjs-scroll__wrapper_bottomleft') ) {
        container.querySelector('.wjs-scroll__wrapper_bottomleft').remove();
      }
    }
  }
}
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
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

"use strict";
// wSetScroll(document.querySelector('.login-main__inner.wjs-scroll'), {right:true, overflowXHidden:true});
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ variables declaration ↓↓↓ */
  let dictionary = {
    link1: {
      ua: 'вхід',
      en: 'login'
    },
    link2: {
      ua: 'реєстрація',
      en: 'registration'
    },
    h4: {
      ua: 'вільний веб-чат',
      en: 'free web chat'
    },
    h51: {
      ua: 'щоб увійти, введіть пароль і логін',
      en: 'to log in, enter the password and login'
    },
    h52: {
      ua: 'щоб почати користуватися чатом, пройдіть реєстрацію',
      en: 'register to start using the chat'
    },
    btn: {
      ua: 'увійти',
      en: 'login'
    },
    phname: {
      ua: 'логін…',
      en: 'login…'
    },
    phpass1: {
      ua: 'пароль…',
      en: 'password…'
    },
    phpass2: {
      ua: 'повторіть пароль…',
      en: 'repeat password…'
    },
    login: {
      ua: 'Введіть логін',
      en: 'Enter your login'
    },
    loginLength: {
      ua: 'Довжина логіну не менше 3х символів',
      en: 'Login length is at least 3 characters'
    },
    noUser: {
      ua: 'Такого користувача не існує',
      en: 'There is no such user'
    },
    password: {
      ua: 'Введіть пароль',
      en: 'Enter the password'
    },
    passLength: {
      ua: 'Пароль повинен бути щонайменше 6 символів',
      en: 'Password must be at least 6 characters long'
    },
    repeat: {
      ua: 'Повторіть пароль',
      en: 'Repeat the password'
    },
    notMatch: {
      ua: 'Паролі не співпадають',
      en: 'Passwords do not match'
    },
    wrongPass: {
      ua: 'Не вірний пароль',
      en: 'Incorrect password'
    },
    serverError: {
      ua: 'Серверна помилка. Спробуйте ще раз пізніше',
      en: 'Server error. Please try again later'
    },
    loginIsUsed: {
      ua: 'Ім\'я зайняте',
      en: 'The name is busy'
    },
  };
/* ↑↑↑ variables declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  document.addEventListener('click', function(event) {
    // переключення на вкладку "вхід"
    if ( event.target.closest('[data-role="login"]') ) {
      document.querySelector('[data-role="login"]').classList.add('login-header__link_active');
      document.querySelector('[data-role="register"]').classList.remove('login-header__link_active');
      document.querySelector('main.login-main h5:first-of-type').style.display = 'block';
      document.querySelector('main.login-main h5:last-of-type').style.display = 'none';
      document.forms.loginForm.setAttribute('action','api/authorization/login');
      document.forms.loginForm.reset();
      document.querySelector('input[name="pass2"]').style.display = 'none';
      document.querySelector('head title').innerHTML = 'Login';
      hideAllErrors();
    }
    // переключення на вкладку "реєстрація"
    if ( event.target.closest('[data-role="register"]') ) {
      document.querySelector('[data-role="register"]').classList.add('login-header__link_active');
      document.querySelector('[data-role="login"]').classList.remove('login-header__link_active');
      document.querySelector('main.login-main h5:first-of-type').style.display = 'none';
      document.querySelector('main.login-main h5:last-of-type').style.display = 'block';
      document.forms.loginForm.setAttribute('action','api/authorization/register');
      document.forms.loginForm.reset();
      document.querySelector('input[name="pass2"]').style.display = 'block';
      document.querySelector('head title').innerHTML = 'Registration';
      hideAllErrors();
    }

    // перемикання мови
    if ( document.querySelector('.lang-switcher') ) {
      if ( event.target.closest('.lang-switcher') ) {
        let currentLang = document.querySelector('html').getAttribute('lang') || 'ua';
        let ls = event.target.closest('.lang-switcher');
        ls.classList.toggle('lang-switcher_active');
      }
      if ( !event.target.closest('.lang-switcher')
           && document.querySelector('.lang-switcher').classList.contains('lang-switcher_active') ) {
        document.querySelector('.lang-switcher').classList.remove('lang-switcher_active')
      }
      if ( event.target.closest('.lang-switcher__list-item') ) {
        let lang = event.target.closest('.lang-switcher__list-item').dataset.lang;
        changePageLang(lang);
      }
    }

    // валідація форми, відправка
    if ( event.target.closest('form[name=loginForm] button[type="submit"]') ) {
      event.preventDefault();
      formValidation();
    }
  });

  document.addEventListener('input', function(event){
    if (event.target.name == 'name') {
      checkInpName();
    }
    if (event.target.name == 'pass1') {
      checkInpPass();
    }
    if (event.target.name == 'pass2') {
      checkInpRepP();
    }
  });
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  function changePageLang(lang) {
    let currentLang = document.querySelector('html').getAttribute('lang') || 'ua';
    if (lang == currentLang) return;

    let currentImg = document.querySelector('.lang-switcher > .lang-switcher__img-wrapper > .lang-switcher__img');
    let html = document.querySelector('html');
    if (lang == "ua") {
      currentImg.setAttribute('src','../img/ukraine.png');
      html.setAttribute('lang', 'ua');
    } else {
      currentImg.setAttribute('src','../img/united_kingdom.png');
      html.setAttribute('lang', 'en');
    }

    let translatedArr = document.querySelectorAll('[data-translate]');
    translatedArr.forEach(item=>{
      let attr = item.dataset.translate;
      item.innerText = dictionary[attr][lang];
    });

    let form = document.forms.loginForm;
    form.name.setAttribute('placeholder', dictionary.phname[lang]);
    form.pass1.setAttribute('placeholder', dictionary.phpass1[lang]);
    form.pass2.setAttribute('placeholder', dictionary.phpass2[lang]);
    form.lang.value = lang;

    hideAllErrors();
  }

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

  function formValidation() {
    let lang     = document.querySelector('html').getAttribute('lang'),
        form     = document.forms.loginForm,
        formType = form.getAttribute('action'),
        inpLang  = form.querySelector('input[name="lang"]'),
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

    sendData();
  }

  async function checkInpName() {
    let value     = document.querySelector('input[name="name"]').value,
        errors    = document.querySelectorAll('.error-info'),
        lang      = document.querySelector('html').getAttribute('lang'),
        form      = document.forms.loginForm,
        submitBtn = form.querySelector('#submitBtn'),
        formType  = form.getAttribute('action');
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
      if ( !await isLoginFree(value) ) {
        showError(errors[0], dictionary.loginIsUsed[lang]);
        submitBtn.setAttribute('type','button');
      } else {
        hideError(errors[0]);
        submitBtn.setAttribute('type','submit');
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

  async function isLoginFree(login) {
    const response = await fetch('api/authorization/existUser', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name:login})
    });
    if (response.status == 500) {
      // error DB?
      showError(errors[2], dictionary.serverError[lang]);
    } else if (response.status == 200) {
      let status = await response.json();
      if (status.slot == 'used') return false;
      return true;
    }
  }

  async function sendData() {
    const form   = document.forms.loginForm,
          url    = form.getAttribute('action'),
          lang   = form.querySelector('input[name="lang"]').value,
          name   = form.querySelector('input[name="name"]').value,
          pass   = form.querySelector('input[name="pass1"]').value,
          errors = document.querySelectorAll('.error-info');

    let bodyObj = {name,pass};

    if (url == 'api/authorization/register') {
      bodyObj.lang = lang;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        // "Accept": "application/json",
        "Accept": "text/html",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyObj)
    });
    if (response.status == 500) {
      // error DB?
      showError(errors[2], dictionary.serverError[lang]);
    } else if (response.status == 404) {
      // not found
      // сервер: Такого користувача не існує
      showError(errors[0], dictionary.noUser[lang]);
    } else if (response.status == 200) {
      // ok
      // тут подальша обробка запиту
      let htmlString = await response.text();
      document.querySelector('body').innerHTML = htmlString;
      wSetScroll(document.querySelector('.left-side .lists-wrapper'), {right:true, overflowXHidden:true})
    } else if (response.status == 403) {
      // не вірний пароль
      // сервер: Не вірний пароль dictionary.wrongPass
      showError(errors[1], dictionary.wrongPass[lang]);
    } else {
      // unknown error
      showError(errors[2], dictionary.serverError[lang]);
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
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