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
        let wrapper = document.querySelector('.header__search-results-wrapper');
        if ( !wrapper.classList.contains('.header__search-results-wrapper_active') ) {
          showSearchResultWrapper();
        }
        showSearchResultList(query);
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

        // милиця
        // чомусь при розмірах екрану більше 1200px wrapper зсувається вправо
        let delta = 0;
        if (document.body.clientWidth > document.querySelector('.body-inner').clientWidth) {
          delta = ( document.body.clientWidth - document.querySelector('.body-inner').clientWidth )/2
        }

    let wrapper = document.querySelector('.header__search-results-wrapper');

    wrapper.style.width = inpWidth + 2 + 'px';
    wrapper.style.top = inpTop + 3 + inpHeight + 'px';
    wrapper.style.left = inpLeft - delta + 'px';

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

  async function showSearchResultList(query) {
    let showSearchResultListRequest = await loadSearchResultList(query);
    if (showSearchResultListRequest.status == 200) {
      document.querySelector('.header__search-results-wrapper .wjs-scroll__content').innerHTML = showSearchResultListRequest.html;
      wSetScroll( document.querySelector('.wjs-scroll.header__search-results-wrapper-inner'), {right:true, overflowXHidden:true} );
      wSetScroll( document.querySelector('.wjs-scroll.header__search-results-wrapper-inner'), {right:true, overflowXHidden:true} );
    } else {
      showPopupInfo("error with searching in data base");
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////