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

  async function changeAva(groupID) {
    let formData = new FormData( document.querySelector('#changeUserAvaForm') );
    let response;

    if (groupID) {
    response = await fetch('api/settings/changeGroupAva', {
      method: 'POST',
      headers: {
        'group': groupID
      },
      body: formData
    });
    } else {
    response = await fetch('api/settings/changeAva', {
      method: 'POST',
      body: formData
    });
    }

    if (response.status == 200) {
      let filename = await response.text();
      return {status: 200, filename: filename}
    } else {
      return {status: response.status}
    }
  }

  async function loadSearchResultList(query) {
    let response = await fetch('api/search/userList', {
      method: 'POST',
      headers: {
        'Accept'       : 'text/html',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({query: query})
    });
    if (response.status == 200) {
      let html = await response.text();
      return {status: 200, html: html}
    } else {
      return {status: response.status}
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

  async function renderGroupCard(id) {
    let response = await fetch('api/render/groupCard', {
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

  async function loadBlackList() {
    let response = await fetch('api/render/blackList', {
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

  async function loadChat(id, meta, tzOffset) {
    let response;
    if (meta == 'mono') {

      const contactID = id;
      response = await fetch('api/render/monoChat', {
        method: 'POST',
        headers: {
          'Accept': 'text/html',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:contactID, tzOffset:tzOffset})
      });

    } else if (meta == 'group') {
      const gChatID = id;
      response = await fetch('api/render/groupChat', {
        method: 'POST',
        headers: {
          'Accept': 'text/html',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:gChatID, tzOffset:tzOffset})
      });
    }
    if (response.status == 200) {
      let html = await response.text();
      return {status: 200, html: html}
    } else {
      return {status: response.status}
    }
  }

  async function loadContactSubheader(id, meta) {
    let response;
    if (meta == 'mono') { // id - ідентифікатор контакта
      response = await fetch('api/render/contactSubheader', {
        method: 'POST',
        headers: {
          'Accept': 'text/html',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:id})
      });
    } else if (meta == 'group') { // id - ідентифікатор групи
      response = await fetch('api/render/groupSubheader', {
        method: 'POST',
        headers: {
          'Accept': 'text/html',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:id})
      });
    }
    if (response.status == 200) {
      let html = await response.text();
      return {status: 200, html: html}
    } else {
      return {status: response.status}
    }
  }

  async function renderChatsList() {
    let tzOffset = new Date().getTimezoneOffset();
    let response = await fetch('api/render/chatsList', {
      method: 'POST',
      headers: {
        'Accept': 'text/html',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({tzOffset : new Date().getTimezoneOffset()})
    });
    if (response.status == 200) {
      let html = await response.text();
      return {status: 200, html: html}
    } else {
      return {status: response.status}
    }
  }

  async function leaveGroup(id) {
    let response = await fetch('api/gCard/leaveGroup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id})
    });
    if (response.status == 200) {
      return {status: 200}
    } else {
      return {status: response.status}
    }
  }

  async function loadGroupList(id) {
    let response = await fetch('api/render/loadGList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/html'
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

  async function deleteGroup(groupID) {
    let response = await fetch('api/gCard/deleteGroup', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:groupID})
    });
    if (response.status == 200) {
      return {status: 200}
    } else {
      return {status: response.status}
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////