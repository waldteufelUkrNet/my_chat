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
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////