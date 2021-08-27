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