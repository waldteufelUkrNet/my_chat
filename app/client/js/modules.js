"use strict";document.addEventListener("click",(function(t){if(t.target.closest(".chat-form__textarea")&&!document.querySelector(".chat-form__textarea_active")){let t=document.querySelector(".chat-form__textarea"),e=document.querySelector(".chat-form__btn");return t.classList.add("chat-form__textarea_active"),e.classList.add("chat-form__btn_active"),void t.focus()}if(document.querySelector(".chat-form__textarea_active")&&!t.target.closest(".chat-form__textarea_active")){let t=document.querySelector(".chat-form__textarea"),e=document.querySelector(".chat-form__btn");t.classList.remove("chat-form__textarea_active"),e.classList.remove("chat-form__btn_active"),t.blur()}}));
"use strict";document.addEventListener("click",(function(e){if(e.target.closest(".header__menu-btn_secondary")&&!document.querySelector(".header__search_active")){let e=document.querySelector(".header__search");return e.classList.add("header__search_active"),void e.focus()}if(document.querySelector(".header__search_active")&&!e.target.closest(".header__search_active")){let e=document.querySelector(".header__search");e.classList.remove("header__search_active"),e.blur()}}));
"use strict";const roles={showLogout(){showPopup("popupLogout")},showDeleteAcc(){showPopup("popupDeleteAcc")},showChangeAva(){showPopup("popupChangeAva")},showChangeName(){showPopup("popupChangeName")},showChangePass(){showPopup("popupChangePass")},showChangeThema(){showPopup("popupThemaSelect")},showChangeLang(){showPopup("popupLangSelect")},showGroupChat(){showPopup("popupGroupChat")},showBlackList(){showPopup("popupBlackList")},showClearHistory(){showPopup("popupClearHistory")},showLeaveGroup(){showPopup("popupLeaveGroup")},showGroupList(){showPopup("popupGroupList")},showDeleteGroup(){showPopup("popupDeleteGroup")},resetPopup(o){closePopup(o.target.closest(".popup").getAttribute("id"))}};function showPopup(o){document.querySelector(".popups-wrapper").classList.add("popups-wrapper_active"),document.querySelector(".body-inner").classList.add("body-inner_active"),setTimeout((function(){document.getElementById(o).classList.add("popup_active")}),1)}function closePopup(o){document.querySelector(".popups-wrapper").classList.remove("popups-wrapper_active"),document.querySelector(".body-inner").classList.remove("body-inner_active"),document.getElementById(o).classList.remove("popup_active")}document.addEventListener("click",(function(o){if(o.target.closest("[data-role]")){let p=o.target.closest("[data-role]").dataset.role;roles[p](o)}if(o.target.closest(".popup__close")){closePopup(o.target.closest(".popup").getAttribute("id"))}}));