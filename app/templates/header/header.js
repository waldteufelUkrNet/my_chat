"use strict";
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