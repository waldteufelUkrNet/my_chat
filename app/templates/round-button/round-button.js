"use strict"; // round-button module
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  document.addEventListener('click', function(event){
    if ( event.target.closest('[data-list="chat"] .round-btn')
         || event.target.closest('[data-list="chatP"] .round-btn') ){
      scrollChatToBottom();
    }
  });
  if ( document.querySelector('[data-list="chatP"] .wjs-scroll__content') ) {
    document.querySelector('[data-list="chatP"] .wjs-scroll__content').addEventListener('scroll', function(event){
      toggleScrollButton();
    });
  }

  if ( document.querySelector('[data-list="chat"] .wjs-scroll__content') ) {
    document.querySelector('[data-list="chat"] .wjs-scroll__content').addEventListener('scroll', function(event){
      toggleScrollButton();
    });
  }
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  function showScrollButton() {
    let btn;
    if ( isSmallView() ) {
      btn = document.querySelector('[data-list="chat"] .round-btn');
    } else {
      btn = document.querySelector('[data-list="chatP"] .round-btn');
    }
    if (btn) {
      btn.classList.add('round-btn_active');
    }
  }

  function hideScrollButton() {
    let btn;
    if ( isSmallView() ) {
      btn = document.querySelector('[data-list="chat"] .round-btn');
    } else {
      btn = document.querySelector('[data-list="chatP"] .round-btn');
    }
    if (btn) {
      btn.classList.remove('round-btn_active');
    }
  }

  function toggleScrollButton() {
    let btn;
    if ( isSmallView() ) {
      btn = document.querySelector('[data-list="chat"] .round-btn');
    } else {
      btn = document.querySelector('[data-list="chatP"] .round-btn');
    }

    if (!btn) return;

    let container = btn.closest('.wjs-scroll'),
        content   = container.querySelector('.wjs-scroll__content'),
        crSH      = container.scrollHeight,
        ctSH      = content.scrollHeight,
        ctST      = content.scrollTop;

    if ( ctSH <= ctST + crSH ) {
      hideScrollButton();
    } else {
      showScrollButton();
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////