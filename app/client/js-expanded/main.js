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
  });
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  function showMenuItem(group, target) {
    let targetGroup = document.querySelectorAll('.list[data-list-group="' + group + '"]'),
        targetItem  = document.querySelector('[data-list="' + target + '"]');

    targetGroup.forEach(item => {
      item.classList.remove('list_active');
    });
    targetItem.classList.add('list_active');

    wSetScroll(document.querySelector('.lists-wrapper'), {right:true, overflowXHidden:true})
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////