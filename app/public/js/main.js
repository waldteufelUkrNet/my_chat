"use strict"; // global.js

// це тимчасове рішення. Багатомовність потрібно вирішити шляхом звернення до бд
// сюди переніс, щоб звільнити інші модулі від цього мотлоху
var dictionary = {
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

////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
"use strict"; // user-config.js
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ xxx ↓↓↓ */
  var userConfig = {
    pathToUserLogo : 'img/users/'
  };
/* ↑↑↑ xxx ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
"use strict"; // wScroll.js
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
"use strict"; // chat-form module
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
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
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
"use strict"; // header module
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  document.addEventListener('click', function(event){
    // open search input
    if ( event.target.closest('.header__menu-btn_secondary')
         && ! document.querySelector('.header__search_active') ) {
      let input = document.querySelector('.header__search');
      input.value = '';
      input.classList.add('header__search_active');
      input.focus();
      return
    }

    // open user card
    if ( event.target.closest('.header__search-result') ) {
      let id = event.target.closest('.header__search-result').dataset.id;
      openUserCard(id);
    }

    // close search input
    if( document.querySelector('.header__search_active')
        && !event.target.closest('.header__search_active') ) {
      let input = document.querySelector('.header__search');
      input.classList.remove('header__search_active');
      input.blur();
    }

    // close search result wrapper
    if( document.querySelector('.header__search-results-wrapper_active') ) {
      hideSearchResultWrapper()
    }
  });

  document.addEventListener('input', async function(event) {
    // show search-results area
    if ( event.target.classList.contains('header__search') ) {
      let query = event.target.value;
      if (query.length >= 3) {
        // let wrapper = document.querySelector('.header__search-results-wrapper');
        // if ( !wrapper.classList.contains('.header__search-results-wrapper_active') ) {
        //   showSearchResultWrapper();
        // }
        let queryRequest = await searchInDB(query);
        if (queryRequest.status == 200) {
          // показ списку
          let userList = queryRequest.users;
          buildMatchedList(userList);
        } else {
          // обробка помилки
        }
      }
    }
  });
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  function showSearchResultWrapper() {
    let input     = document.querySelector('.header__search'),
        inpWidth  = input.clientWidth,
        inpHeight = input.clientHeight,
        inpTop    = input.getBoundingClientRect().top,
        inpLeft   = input.getBoundingClientRect().left;

    let wrapper = document.querySelector('.header__search-results-wrapper');
    wrapper.style.left = inpLeft + 'px';
    wrapper.style.width = inpWidth + 2 + 'px';
    wrapper.style.top = inpTop + 3 + inpHeight + 'px';
    wrapper.style.display = 'block';

    setTimeout(function(){
      wrapper.classList.add('header__search-results-wrapper_active');
    },100);
  }

  function hideSearchResultWrapper() {
    let wrapper = document.querySelector('.header__search-results-wrapper');
    wrapper.classList.remove('header__search-results-wrapper_active');
    setTimeout(function(){
      wrapper.style.display = 'none';
    }, 400);
  }

  function buildMatchedList(list) {
    let wrapper = document.querySelector('.header__search-results-wrapper .wjs-scroll__content');
    wrapper.innerHTML = '';

    if (list && list.length) {
      list.forEach(user => {
        let html = '<div class="header__search-result" data-id="' + user._id + '">\
                      <div class="logo">\
                        <p class="logo__name">' + user.username.slice(0,2).toUpperCase() + '</p>\
                        <img class="logo__img" src="">\
                      </div>\
                      <div class="header__search-result-name">' + user.username + '</div>\
                    </div>';
        wrapper.insertAdjacentHTML('beforeEnd', html);
      });
    }
    showSearchResultWrapper();
    wSetScroll(document.querySelector('.header__search-results-wrapper .wjs-scroll'), {right:true, overflowXHidden:true});

    downloadMatchedListAvatars();
  }

  function downloadMatchedListAvatars () {
    let users = document.querySelectorAll('.header__search-result');
    users.forEach( async (user) => {
      let id = user.dataset.id;
      let avaRequest = await searchAva(id);
      if (avaRequest) {
        user.querySelector('.logo__img').setAttribute('src', userConfig.pathToUserLogo + id + '.jpg');
      }
    });
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
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
"use strict"; // usercard module
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  var uCArdRoles = {
    addToBlockList(id) { addToBL(id) },
    removeFromBlockList(id) { removeFromBL(id) },
    addToContacts(id) { addToCont(id) },
    removeFromContacts(id) { removeFromCont(id) },
    copyContactToClipboard(id) { copyContactToClipboardFn(id) },
  };

  document.addEventListener('click', async function(event){
    if ( event.target.closest('[data-role]') ) {
      let target = event.target.closest('[data-role]'),
          foo    = target.dataset.role,
          id     = target.dataset.id;

      if ( uCArdRoles[foo] ) {
        uCArdRoles[foo](id)
      }
    }
  });
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  async function addToBL(id) {
    let addToBlockListRequest = await addContactToBlackList(id);
    if (addToBlockListRequest.status == 200) {
      document.querySelector('[data-list-group="aside"][data-list="usercard"]').innerHTML = addToBlockListRequest.html;
      document.querySelector('[data-list-group="page"][data-list="usercardP"]').innerHTML = addToBlockListRequest.html;
    } else {
      showPopupInfo("error with adding to block list");
    }
  }

  async function removeFromBL(id) {
    let removeFromBlockListRequest = await removeContactFromBlockList(id);
    if (removeFromBlockListRequest.status == 200) {
      document.querySelector('[data-list-group="aside"][data-list="usercard"]').innerHTML = removeFromBlockListRequest.html;
      document.querySelector('[data-list-group="page"][data-list="usercardP"]').innerHTML = removeFromBlockListRequest.html;
    } else {
      showPopupInfo("error with remooving from block list");
    }
  }

  async function addToCont(id) {
    let addToContactsRequest = await addContactToContacts(id);
    if (addToContactsRequest.status == 200) {
      document.querySelector('[data-list-group="aside"][data-list="usercard"]').innerHTML = addToContactsRequest.html;
      document.querySelector('[data-list-group="page"][data-list="usercardP"]').innerHTML = addToContactsRequest.html;
    } else {
      showPopupInfo("error with adding to contact list");
    }
  }

  async function removeFromCont(id) {
    let removeFromContactsRequest = await removeContactFromContacts(id);
    if (removeFromContactsRequest.status == 200) {
      document.querySelector('[data-list-group="aside"][data-list="usercard"]').innerHTML = removeFromContactsRequest.html;
      document.querySelector('[data-list-group="page"][data-list="usercardP"]').innerHTML = removeFromContactsRequest.html;
    } else {
      showPopupInfo("error with remooving from block list");
    }
  }

  function copyContactToClipboardFn(id) {}
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
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

      let changeAvaRequest = await changeAva();
      if (changeAvaRequest.status == 500) {
        // error DB?
        showPopupError('popupChangeAva', 2);
      } else if (changeAvaRequest.status == 200) {
        closePopup('popupChangeAva');
        showPopupInfo('Аватарку успішно змінено');
        document.querySelector('.header .logo__img').setAttribute('src', userConfig.pathToUserLogo + changeAvaRequest.filename + '?v=' + Date.now());
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
"use strict"; // login.js
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  document.addEventListener('click', function(event) {
    // переключення на вкладку "вхід"
    if ( event.target.closest('[data-role="login"]') ) {
      document.querySelector('[data-role="login"]').classList.add('login-header__link_active');
      document.querySelector('[data-role="register"]').classList.remove('login-header__link_active');
      document.querySelector('main.login-main h5:first-of-type').style.display = 'block';
      document.querySelector('main.login-main h5:last-of-type').style.display = 'none';
      document.forms.loginForm.setAttribute('data-action','api/authorization/login');
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
      document.forms.loginForm.setAttribute('data-action','api/authorization/register');
      document.forms.loginForm.reset();
      document.querySelector('input[name="pass2"]').style.display = 'block';
      document.querySelector('head title').innerHTML = 'Registration';
      hideAllErrors();
    }

    // перемикання мови
    if ( document.querySelector('.lang-switcher') ) {
      if ( event.target.closest('.lang-switcher') ) {
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
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
"use strict"; // main.js
////////////////////////////////////////////////////////////////////////////////
showContactsList();
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  document.addEventListener('click', function(event){

    // toggle lef-side menus
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
      let id = event.target.closest('.contact-item').dataset.id;
      openUserCard(id);
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
      let id      = event.target.closest('.chat-item').dataset.id,
          isGroup = event.target.closest('.chat-item').dataset.group;
      if (isGroup) {
        openGroupCard(id);
      } else {
        openUserCard(id);
      }
    }

    // open usercard (chat)
    if ( event.target.closest('.logo')
         && event.target.closest('.chat-list__item_received') ) {
      let id = event.target.closest('.chat-list__item_received').dataset.id;
      openUserCard(id);
    }

    // open groupcard / usercard (subheader)
    if ( event.target.closest('.subheader') ) {
      let id      = event.target.closest('.subheader').dataset.id,
          isGroup = event.target.closest('.subheader').dataset.group;
      if (isGroup) {
        openGroupCard(id);
      } else {
        openUserCard(id);
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
    // це свого роду затичка: код для сторінок з формою входу і чатом один і той
    // же. Для показу контактів викликається функція showContactsList(), а їй
    // потрібна бокова панель, якої нема на сторінці з формою
    if( ! document.querySelector('.left-side')) return;

    document.querySelector('.left-side').classList.remove('left-side_with-subheader');
    document.querySelector('.left-side .subheader').style.display = 'none';
    let targetGroup = document.querySelectorAll('.list[data-list-group="' + group + '"]'),
        targetItem  = document.querySelector('[data-list="' + target + '"]');

    targetGroup.forEach(item => {
      item.classList.remove('list_active');
    });
    targetItem.classList.add('list_active');

    if (group == 'aside' && target == 'contactlist') showContactsList();

    wSetScroll(document.querySelector('.lists-wrapper'), {right:true, overflowXHidden:true})
  }

  function isSmallView() {
    let indicator = document.getElementById('widthIndicator');
    if (getComputedStyle(indicator).display == 'none') {
      return true
    }
    return false
  }

  async function openUserCard(id) {
    let userCardRequest = await renderUserCard(id);
    if (userCardRequest.status == 200) {
      document.querySelector('[data-list-group="aside"][data-list="usercard"]').innerHTML = userCardRequest.html;
      document.querySelector('[data-list-group="page"][data-list="usercardP"]').innerHTML = userCardRequest.html;
    } else {
      // помилка
    }

    if ( isSmallView() ) {
      showMenuItem('aside', 'usercard')
      wSetScroll( document.querySelector('.lists-wrapper.wjs-scroll'),
                  { right:true,
                    overflowXHidden:true
                });
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

  async function showContactsList() {
    let contactsListRequest = await renderContactsList();
    if (contactsListRequest.status == 200) {
      if (contactsListRequest.html.length > 0) {
        // показ списку
        document.querySelector('.left-side .list_active').innerHTML = contactsListRequest.html;
        downloadContactsListAvatars();
        wSetScroll( document.querySelector('.lists-wrapper.wjs-scroll'),
                    { right:true,
                      overflowXHidden:true
                  });
      } else {
        showMenuItem('aside', 'startL');
      }
    } else {
      showMenuItem('aside', 'startL');
    }
  }

  function downloadContactsListAvatars () {
    let users = document.querySelectorAll('.contact-list .contact-item');
    users.forEach( async (user) => {
      let id = user.dataset.id;
      let avaRequest = await searchAva(id);
      if (avaRequest) {
        user.querySelector('.logo__img').setAttribute('src', userConfig.pathToUserLogo + id + '.jpg');
      }
    });
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
'use strict'; // requests.js
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  async function isLoginFree(login) {
    let result;
    let response = await fetch('api/authorization/existUser', {
      method: 'POST',
      headers: {
        'Accept'       : 'text/html',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({name:login})
    });
    if (response.status == 500) {
      return result;
    } else if (response.status == 200) {
      let status = await response.text();
      if (status == 'used') return false;
      return true;
    }
  }

  async function registerUser(user) {
    let response = await fetch('api/authorization/register', {
      method: 'POST',
      headers: {
        'Accept'       : 'text/html',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (response.status == 200) {
      let html = await response.text();
      return {status: 200, html}
    } else {
      return {status: response.status}
    }
  }

  async function loginUser(user) {
    let response = await fetch('api/authorization/login', {
      method: 'POST',
      headers: {
        'Accept'       : 'text/html',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (response.status == 200) {
      let html = await response.text();
      return {status: 200, html}
    } else {
      return {status: response.status}
    }
  }

  async function logoutUser () {
    let response = await fetch('api/authorization/logout');
    if (response.status == 200) {
      let html = await response.text();
      return {status: 200, html}
    } else {
      return {status: response.status}
    }
  }

  async function deleteUser () {
    let response = await fetch('api/authorization/deleteUser', {
      method: 'DELETE'
    });
    if (response.status == 200) {
      let html = await response.text();
      return {status: 200, html}
    } else {
      return {status: response.status}
    }
  }

  async function checkOldPass(pass) {
    let response = await fetch('api/settings/checkOldPassword', {
      method: 'POST',
      headers: {
        'Accept'       : 'text/html',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({pass:pass})
    });
    if (response.status == 200) {
      let result = await response.text();
      return {status: 200, result}
    } else {
      return {status: response.status}
    }
  }

  async function changePass(newPass) {
    let response = await fetch('api/settings/changePassword', {
      method: 'POST',
      headers: {
        'Accept'       : 'text/html',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({pass:newPass})
    });
    if (response.status == 200) {
      return {status: 200}
    } else {
      return {status: response.status}
    }
  }

  async function changeName(newName) {
    let response = await fetch('api/settings/changeUserName', {
      method: 'POST',
      headers: {
        'Accept'       : 'text/html',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({username:newName})
    });
    if (response.status == 200) {
      return {status: 200}
    } else {
      return {status: response.status}
    }
  }

  async function changeAva() {
    let formData = new FormData( document.querySelector('#changeUserAvaForm') );

    let response = await fetch('api/settings/changeAva', {
      method: 'POST',
      body: formData
    });
    if (response.status == 200) {
      let filename = await response.text();
      return {status: 200, filename: filename}
    } else {
      return {status: response.status}
    }
  }

  async function searchInDB(query) {
    let response = await fetch('api/search/user', {
      method: 'POST',
      headers: {
        'Accept'       : 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({query: query})
    });
    if (response.status == 200) {
      let users = await response.json();
      return {status: 200, users: users}
    } else {
      return {status: response.status}
    }
  }

  async function searchAva(userID) {
    let response = await fetch('api/search/ava', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:userID})
    });
    if (response.status == 200) {
      return true
    } else {
      return false
    }
  }

  async function renderContactsList() {
    let response = await fetch('api/render/contactsList', {
      method: 'GET',
      headers: {
        'Accept': 'text/html'
      }
    });
    if (response.status == 200) {
      let html = await response.text();
      return {status: 200, html: html}
    } else {
      return {status: response.status}
    }
  }

  async function renderUserCard(id) {
    let response = await fetch('api/render/userCard', {
      method: 'POST',
      headers: {
        'Accept': 'text/html',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id})
    });
    if (response.status == 200) {
      let html = await response.text();
      return {status: 200, html: html}
    } else {
      return {status: response.status}
    }
  }

  async function addContactToBlackList(id) {
    let response = await fetch('api/uCard/addToBlockList', {
      method: 'POST',
      headers: {
        'Accept': 'text/html',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id})
    });
    if (response.status == 200) {
      let html = await response.text();
      return {status: 200, html: html}
    } else {
      return {status: response.status}
    }
  }

  async function removeContactFromBlockList(id) {
    let response = await fetch('api/uCard/removeFromBlockList', {
      method: 'POST',
      headers: {
        'Accept': 'text/html',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id})
    });
    if (response.status == 200) {
      let html = await response.text();
      return {status: 200, html: html}
    } else {
      return {status: response.status}
    }
  }

  async function addContactToContacts(id) {
    let response = await fetch('api/uCard/addToContacts', {
      method: 'POST',
      headers: {
        'Accept': 'text/html',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id})
    });
    if (response.status == 200) {
      let html = await response.text();
      return {status: 200, html: html}
    } else {
      return {status: response.status}
    }
  }

  async function removeContactFromContacts(id) {
    let response = await fetch('api/uCard/removeFromContacts', {
      method: 'POST',
      headers: {
        'Accept': 'text/html',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id})
    });
    if (response.status == 200) {
      let html = await response.text();
      return {status: 200, html: html}
    } else {
      return {status: response.status}
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////