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
      if ( !isSmallView() ) {
        showContactsList();
      }
    } else {
      showPopupInfo("error with adding to contact list");
    }
  }

  async function removeFromCont(id) {
    let removeFromContactsRequest = await removeContactFromContacts(id);
    if (removeFromContactsRequest.status == 200) {
      document.querySelector('[data-list-group="aside"][data-list="usercard"]').innerHTML = removeFromContactsRequest.html;
      document.querySelector('[data-list-group="page"][data-list="usercardP"]').innerHTML = removeFromContactsRequest.html;
      if ( !isSmallView() ) {
        showContactsList();
      }
    } else {
      showPopupInfo("error with remooving from block list");
    }
  }

  function copyContactToClipboardFn(id) {
    let name = document.querySelector('.user-info__name').textContent;
    let copyStr = '@' + id + ' (' + name + ')';
    let input = document.createElement('input');
    input.setAttribute('type','text');
    document.body.insertAdjacentElement('beforeEnd', input);
    input.value = copyStr;
    input.focus();
    input.select();
    document.execCommand('copy');
    input.remove();
    // navigator.clipboard.writeText(copyStr).then(result => {}, error => {});
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////