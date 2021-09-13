"use strict"; // template: popups
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  var roles = {
    login() {},        // тут - затичка. Обробник знаходиться в файлі login.js
    register() {},     // тут - затичка. Обробник знаходиться в файлі login.js
    showLogout()          { showPopup('popupLogout') },
    showDeleteAcc()       { showPopup('popupDeleteAcc') },
    showChangeAva ()      { showPopup('popupChangeAva') },
    showChangeName ()     { showPopup('popupChangeName') },
    showChangePass ()     { showPopup('popupChangePass') },
    showChangeThema ()    { showPopup('popupThemaSelect') },
    showChangeLang ()     { showPopup('popupLangSelect') },
    showGroupChat (event) { showPopup('popupGroupChat', event) },
    showBlackList ()      {
      showPopup('popupBlackList');
      showBList();
    },
    showClearHistory ()   { showPopup('popupClearHistory') },
    showLeaveGroup ()     { showPopup('popupLeaveGroup') },
    showGroupList ()      { showPopup('popupGroupList') },
    showDeleteGroup ()    { showPopup('popupDeleteGroup') },
    resetPopup (event)    {
      let id = event.target.closest('.popup').getAttribute('id');
      closePopup(id);
    }
  };

  document.addEventListener('click', async function(event){
    if ( event.target.closest('[data-role]') ) {
      let target = event.target.closest('[data-role]'),
          foo    = target.dataset.role;
      if (roles[foo]) {
        roles[foo](event)
      }
    }

    // close popup
    if ( event.target.closest('.popup__close') ) {
      let id = event.target.closest('.popup').getAttribute('id');
      closePopup(id);
    }

    // delete contact from blacklist
    if ( event.target.closest('#popupBlackList li.popup__item button.popup__user-restore') ) {
      let userID = event.target.closest('.popup__item').dataset.id;
      removeFromBL(userID);
      showBList();
    }

    // show usercard
    if ( event.target.closest('#popupBlackList li.popup__item')
         && !event.target.closest('#popupBlackList li.popup__item button.popup__user-restore') ) {
      let userID = event.target.closest('.popup__item').dataset.id;
      openUserCard(userID);
      closePopup('popupBlackList');
    }

    // leave group
    if ( event.target.closest('#popupLeaveGroup button[type="submit"]') ) {
      closePopup('popupLeaveGroup');
      let id = document.querySelector('button[data-role="showLeaveGroup"]').dataset.id;
      let leaveGroupRequest = await leaveGroup(id);
      if (leaveGroupRequest.status != 200) {
        showPopupInfo('something went wrong with leaving group');
      } else {
        if ( document.querySelector('.left-side [data-list="chatlist"]') ) {
          showChatsList();
        }
      }
    }

    // see group members
    if ( event.target.closest('[data-role="showGroupList"]') ) {
      let id = event.target.closest('[data-role="showGroupList"]').dataset.id;
      let gListRequest = await loadGroupList(id);
      if (gListRequest.status = 200) {

      document.querySelector('#popupGroupList ul.popup__list').innerHTML = gListRequest.html;
      wSetScroll(document.querySelector('#popupGroupList .popup__list-wrapper.wjs-scroll'), {right:true, overflowXHidden:true});
      wSetScroll(document.querySelector('#popupGroupList .popup__list-wrapper.wjs-scroll'), {right:true, overflowXHidden:true});

      } else {
        showPopupInfo('something went wrong with downloading members list');
      }
    }

    // delete group
    if ( event.target.closest('#popupDeleteGroup button[type="submit"]') ) {
      let groupID = document.querySelector('[data-role="showDeleteGroup"]').dataset.id;
      let deleteGroupRequest = await deleteGroup(groupID);
      if (deleteGroupRequest.status == 200) {
        if ( document.querySelector('.left-side [data-list="chatlist"]') ) {
          showChatsList();
        }
        closePopup('popupDeleteGroup');
      } else {
        showPopupInfo('something went wrong with groupe deleting');
      }
    }

    // remove history
    if ( event.target.closest('#popupClearHistory button[type="submit"]') ) {
      let id = document.querySelector('[data-role="showClearHistory"]').dataset.id;
      let removeHistoryRequest = await removeHistory(id);
      if (removeHistoryRequest.status == 200) {
        closePopup('popupClearHistory');
        showPopupInfo('history is successfully delete');
      } else {
        showPopupInfo('something went wrong with history deleting');
      }
    }

    // search by id in group popup
    if (event.target.getAttribute('id') == 'searchIDInGP') {
      let id = event.target.closest('.popup__search-wrapper')
                           .querySelector('input[name="id"]').value;

      document.querySelector('.popup__search-result').classList.remove('popup__search-result_active');
      document.querySelector('#popupGroupChat [name="id"]').value = '';

      if (id.length != 24) return;
      searchIDinGPopup(id);
    }

    // add id to members
    if ( event.target.closest('.popup__search-result_active label[data-id]') ) {
      let label = event.target.closest('.popup__search-result_active label[data-id]'),
          id    = label.dataset.id,
          name  = label.querySelector('span').innerHTML;
      addIDToMembers(id, name);
    }

    // change/create group
    if ( event.target.closest('#popupGroupChat button[type="submit"]') ) {
      createOrChangeGroup();
    }
  });

  document.addEventListener('input', function(event){
    // toggle users in chat
    if ( event.target.closest('#memberslist input') ) {
      toggleMemListItem(event)
    }

    // toggle users in chat
    if ( event.target.closest('#contactslist input') ) {
      toggleCliListItem(event)
    }
  });
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  function showPopup(id, event) {

    if (id == 'popupGroupChat') {
      let groupID, groupName;
      if (event.target.dataset.id) {
        groupID = event.target.dataset.id;
        groupName = event.target.closest('[data-list="groupcardP"]')
                                .querySelector('.user-info__name').innerHTML;
        document.querySelector('#popupGroupChat button[type="submit"]')
                .setAttribute('data-id', groupID);
      }
      groupRedactor(groupID,groupName);
    }

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

    if (id == 'popupGroupChat') {
      document.querySelector('#popupGroupChat input[name="groupName"]').value = '';
      document.querySelector('#popupGroupChat input[name="id"]').value = '';
      document.querySelector('#popupGroupChat #memberslist').innerHTML = '';
      document.querySelector('#popupGroupChat #contactslist').innerHTML = '';
      document.querySelector('#popupGroupChat .popup__search-result').innerHTML = '';
      document.querySelector('#popupGroupChat .popup__search-result').classList
              .remove('popup__search-result_active');
      document.querySelector('#popupGroupChat button[type="submit"]')
              .removeAttribute('data-id');
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

  async function showBList() {
    let showBListRequest = await loadBlackList();
    if (showBListRequest.status == 200) {
      document.querySelector('#popupBlackList ul.popup__list').innerHTML = showBListRequest.html;
      wSetScroll(document.querySelector('#popupBlackList .popup__list-wrapper .wjs-scroll'), {right:true, overflowXHidden:true});
      wSetScroll(document.querySelector('#popupBlackList .popup__list-wrapper .wjs-scroll'), {right:true, overflowXHidden:true});
    } else {
      showPopupInfo('something went wrong with load blacklist');
    }
  }

  async function groupRedactor(groupID, groupName) {
    let inp_name      = document.querySelector('#popupGroupChat input[name="groupName"]'),
        inp_searchId  = document.querySelector('#popupGroupChat input[name="id"]'),
        list_members  = document.querySelector('#popupGroupChat #memberslist'),
        list_contacts = document.querySelector('#popupGroupChat #contactslist');

    if (groupID) {
      inp_name.value = groupName;

      let members = await loadMembersInGroupPopup(groupID);
      if (members.status = 200) {
        list_members.innerHTML = members.html;
        let contactsContainer = list_members.closest('.popup__list-wrapper.wjs-scroll');
        wSetScroll(contactsContainer, {right:true, overflowXHidden:true});
        wSetScroll(contactsContainer, {right:true, overflowXHidden:true})
      } else {
        showPopupInfo('something went wrong with group chats redactor');
      }

      let contacts = await loadContactsInGroupPopup(groupID);
      if (contacts.status = 200) {
        list_contacts.innerHTML = contacts.html;
        let contactsContainer = list_contacts.closest('.popup__list-wrapper.wjs-scroll');
        wSetScroll(contactsContainer, {right:true, overflowXHidden:true});
        wSetScroll(contactsContainer, {right:true, overflowXHidden:true})
      } else {
        showPopupInfo('something went wrong with group chats redactor');
      }

    } else {
      let contacts = await loadContactsInGroupPopup();
      if (contacts.status = 200) {
        list_contacts.innerHTML = contacts.html;
        let contactsContainer = list_contacts.closest('.popup__list-wrapper.wjs-scroll');
        wSetScroll(contactsContainer, {right:true, overflowXHidden:true});
        wSetScroll(contactsContainer, {right:true, overflowXHidden:true})
      } else {
        showPopupInfo('something went wrong with group chats redactor');
      }
    }
  }

  async function searchIDinGPopup(id) {
    let searchRequest = await searchIDforGP(id);
    if (searchRequest.status == 200) {
      let target = document.querySelector('#popupGroupChat .popup__search-result');
      target.innerHTML = searchRequest.html;
      target.classList.add('popup__search-result_active');
    } else {
      //
    }
  }

  function toggleMemListItem (e) {
    let input           = e.target.closest('#memberslist input'),
        inputItem       = input.closest('#memberslist li.popup__item'),
        memberID        = inputItem.dataset.id,
        contactsList    = document.querySelector('#popupGroupChat #contactslist'),
        isMemberChecked = input.checked,
        contactItems    = contactsList.querySelectorAll('li.popup__item'),
        contactIDs      = [];

    contactItems.forEach(contactItem => {
      contactIDs.push(contactItem.dataset.id);
    });
    // if member is in contacts, check it
    if (contactIDs.indexOf(memberID) >= 0) {
      let contactsItemInput = contactsList.querySelector('[data-id="' + memberID + '"] input');
      contactsItemInput.checked = isMemberChecked;
    }
  }

  function toggleCliListItem (e) {
    let input            = e.target.closest('#contactslist input'),
        inputItem        = input.closest('#contactslist li.popup__item'),
        contactID        = inputItem.dataset.id,
        membersList      = document.querySelector('#popupGroupChat #memberslist'),
        isContactChecked = input.checked,
        memberItems      = membersList.querySelectorAll('li.popup__item'),
        memberIDs        = [];

    memberItems.forEach(memberItem => {
      memberIDs.push(memberItem.dataset.id);
    });

    if (memberIDs.indexOf(contactID) < 0) {
      // contact isn't a member
      membersList.insertAdjacentHTML('beforeEnd', inputItem.outerHTML);

      wSetScroll( document.querySelector('#popupGroupChat #memberslist')
                          .closest('.popup__list-wrapper.wjs-scroll'),
                  {right:true, overflowXHidden:true});
    }

    let membersItemInput = membersList.querySelector('[data-id="' + contactID + '"] input');
    membersItemInput.checked = isContactChecked;
  }

  function addIDToMembers(id, name) {

    document.querySelector('.popup__search-result_active').classList.remove('popup__search-result_active');
    document.querySelector('#popupGroupChat [name="id"]').value = '';

    if ( document.querySelector('#memberslist [data-id="' + id + '"]') ) return;

    let html = '<li class="popup__item" data-id="' + id + '">\
                  <label>\
                    <input type="checkbox" checked="checked">\
                    <i class="ico check">Z</i>\
                    <i class="ico uncheck">V</i>\
                    <span>' + name + '</span>\
                    <span>(@' + id + ')</span>\
                  </label>\
                </li>';
    document.querySelector('#popupGroupChat #memberslist').insertAdjacentHTML('afterBegin', html);
    wSetScroll( document.querySelector('#popupGroupChat #memberslist')
                        .closest('.popup__list-wrapper.wjs-scroll'),
                {right:true, overflowXHidden:true});
    wSetScroll( document.querySelector('#popupGroupChat #memberslist')
                        .closest('.popup__list-wrapper.wjs-scroll'),
                {right:true, overflowXHidden:true});
  }

  async function createOrChangeGroup() {
    let groupID   = document.querySelector('#popupGroupChat button[type="submit"]').dataset.id,
        groupName = document.querySelector('#popupGroupChat [name="groupName"]').value,
        inputs    = document.querySelectorAll('#memberslist input:checked'),
        idArr     = [];

    inputs.forEach(input => {
      let id = input.closest('li.popup__item').dataset.id;
      idArr.push(id);
    });

    closePopup('popupGroupChat');

    let manageGroupRequest = await manageGroup({
      id      : groupID,
      name    : groupName,
      members : idArr
    });
    if (manageGroupRequest.status == 200) {
      showPopupInfo('changes saved successfully');
    } else {
      showPopupInfo('something went wrong with the group settings');
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
// 6127f3d2d770f515a045836f