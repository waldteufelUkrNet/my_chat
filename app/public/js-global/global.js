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
  /**
   * [sleep робить затримку у виконанні коду на визначений час у мілісекундах]
   * @param  {[Number]} ms [час затримки]
   * @return {[Promise]}   [успішний проміс після вказаної затримки]
   */
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * [isSmallView визначає зовнішній вигляд сайту (залежить від ширини)]
   * @return {Boolean} [результат перевірки]
   */
  function isSmallView() {
    let indicator = document.getElementById('widthIndicator');
    return (getComputedStyle(indicator).display == 'none')
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////