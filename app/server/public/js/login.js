"use strict";
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
      document.forms.loginForm.setAttribute('action','api/login');
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
      document.forms.loginForm.setAttribute('action','api/register');
      document.forms.loginForm.reset();
      document.querySelector('input[name="pass2"]').style.display = 'block';
      document.querySelector('head title').innerHTML = 'Registration';
      hideAllErrors();
    }

    // перемикання мови
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

    // валідація форми, відправка
    if ( event.target.closest('form button[type="submit"]') ) {
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
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

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
    let height = 0;

    new Promise( (resolve, reject) => {
      elem.querySelector('span').innerText = text;
      elem.style.height = 'auto';
      height = elem.clientHeight + 20;
      elem.style.height = 0;
      while (elem.clientHeight != 0) {
        sleep(100)
      }
      resolve();
    }).then( () => {
      elem.style.height = height + 'px';
      elem.style.padding = '10px';
      elem.style.marginBottom = '10px';
    });
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
    if ( formType == 'api/register' && !inpRepP.value ) {
      showError(errors[2], dictionary.repeat[lang]);
      inpRepP.focus();
      return;
    }

    // однаковість паролів
    if ( formType == 'api/register' && inpRepP.value != inpPass.value) {
      showError(errors[2], dictionary.notMatch[lang]);
      inpRepP.focus();
      return;
    }

    sendData();
  }

  function checkInpName() {
    let value  = document.querySelector('input[name="name"]').value,
        errors = document.querySelectorAll('.error-info'),
        lang   = document.querySelector('html').getAttribute('lang');

    // сервер: нема такого користувача
    if (value
        && errors[0].querySelector('span').innerText == dictionary.noUser) {
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

    // которке ім'я
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

  async function sendData() {
    const form = document.forms.loginForm,
          url  = form.getAttribute('action'),
          lang = form.querySelector('input[name="lang"]').value,
          name = form.querySelector('input[name="name"]').value,
          pass = form.querySelector('input[name="pass1"]').value;

    let bodyObj = {name,pass};
      console.log("url", url);

    if (url == 'api/register') {
      bodyObj.lang = lang;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(bodyObj)
    });
    if (response.ok === true) {
      // тут подальша обробка запиту

      // сервер: Такого користувача не існує dictionary.noUser
      // сервер: Не вірний пароль dictionary.wrongPass
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////