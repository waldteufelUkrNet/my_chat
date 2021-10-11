"use strict"; // global.js

// це тимчасове рішення. Багатомовність потрібно вирішити шляхом звернення до бд
// сюди переніс, щоб звільнити інші модулі від цього мотлоху
var dictionary = {
  link1: {
    ua: 'вхід',
    en: 'login'
  },
  link2: {
    ua: 'реєстрація',
    en: 'registration'
  },
  h4: {
    ua: 'вільний веб-чат',
    en: 'free web chat'
  },
  h51: {
    ua: 'щоб увійти, введіть пароль і логін',
    en: 'to log in, enter the password and login'
  },
  h52: {
    ua: 'щоб почати користуватися чатом, пройдіть реєстрацію',
    en: 'register to start using the chat'
  },
  btn: {
    ua: 'увійти',
    en: 'login'
  },
  phname: {
    ua: 'логін…',
    en: 'login…'
  },
  phpass1: {
    ua: 'пароль…',
    en: 'password…'
  },
  phpass2: {
    ua: 'повторіть пароль…',
    en: 'repeat password…'
  },
  login: {
    ua: 'Введіть логін',
    en: 'Enter your login'
  },
  loginLength: {
    ua: 'Довжина логіну не менше 3х символів',
    en: 'Login length is at least 3 characters'
  },
  noUser: {
    ua: 'Такого користувача не існує',
    en: 'There is no such user'
  },
  password: {
    ua: 'Введіть пароль',
    en: 'Enter the password'
  },
  passLength: {
    ua: 'Пароль повинен бути щонайменше 6 символів',
    en: 'Password must be at least 6 characters long'
  },
  repeat: {
    ua: 'Повторіть пароль',
    en: 'Repeat the password'
  },
  notMatch: {
    ua: 'Паролі не співпадають',
    en: 'Passwords do not match'
  },
  wrongPass: {
    ua: 'Не вірний пароль',
    en: 'Incorrect password'
  },
  serverError: {
    ua: 'Серверна помилка. Спробуйте ще раз пізніше',
    en: 'Server error. Please try again later'
  },
  loginIsUsed: {
    ua: 'Ім\'я зайняте',
    en: 'The name is busy'
  },
};

////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  /**
   * [sleep робить затримку у виконанні коду на визначений час у мілісекундах]
   * @param  {[Number]} ms [час затримки]
   * @return {[Promise]}   [успішний проміс після вказаної затримки]
   */
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * [isSmallView визначає зовнішній вигляд сайту (залежить від ширини)]
   * @return {Boolean} [результат перевірки]
   */
  function isSmallView() {
    let indicator = document.getElementById('widthIndicator');
    return (getComputedStyle(indicator).display == 'none')
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
"use strict"; // user-config.js
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ xxx ↓↓↓ */
  var userConfig = {
    pathToUserLogo : 'img/users/'
  };
/* ↑↑↑ xxx ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/*!
 * Socket.IO v4.2.0
 * (c) 2014-2021 Guillermo Rauch
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.io=e():t.io=e()}(self,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=18)}([function(t,e){t.exports="undefined"!=typeof self?self:"undefined"!=typeof window?window:Function("return this")()},function(t,e,n){var r=n(24),o=n(25),i=String.fromCharCode(30);t.exports={protocol:4,encodePacket:r,encodePayload:function(t,e){var n=t.length,o=new Array(n),s=0;t.forEach((function(t,c){r(t,!1,(function(t){o[c]=t,++s===n&&e(o.join(i))}))}))},decodePacket:o,decodePayload:function(t,e){for(var n=t.split(i),r=[],s=0;s<n.length;s++){var c=o(n[s],e);if(r.push(c),"error"===c.type)break}return r}}},function(t,e,n){function r(t){if(t)return function(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}(t)}t.exports=r,r.prototype.on=r.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},r.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n,r=this._callbacks["$"+t];if(!r)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var o=0;o<r.length;o++)if((n=r[o])===e||n.fn===e){r.splice(o,1);break}return 0===r.length&&delete this._callbacks["$"+t],this},r.prototype.emit=function(t){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),n=this._callbacks["$"+t],r=1;r<arguments.length;r++)e[r-1]=arguments[r];if(n){r=0;for(var o=(n=n.slice(0)).length;r<o;++r)n[r].apply(this,e)}return this},r.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},r.prototype.hasListeners=function(t){return!!this.listeners(t).length}},function(t,e,n){var r=n(0);t.exports.pick=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.reduce((function(e,n){return t.hasOwnProperty(n)&&(e[n]=t[n]),e}),{})};var o=setTimeout,i=clearTimeout;t.exports.installTimerFunctions=function(t,e){e.useNativeTimers?(t.setTimeoutFn=o.bind(r),t.clearTimeoutFn=i.bind(r)):(t.setTimeoutFn=setTimeout.bind(r),t.clearTimeoutFn=clearTimeout.bind(r))}},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=u(t);if(e){var o=u(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return a(t)}function a(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var f=n(1),l=n(2),p=n(3).installTimerFunctions,h=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(u,t);var e,n,r,c=s(u);function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),e=c.call(this),p(a(e),t),e.opts=t,e.query=t.query,e.readyState="",e.socket=t.socket,e}return e=u,(n=[{key:"onError",value:function(t,e){var n=new Error(t);return n.type="TransportError",n.description=e,this.emit("error",n),this}},{key:"open",value:function(){return"closed"!==this.readyState&&""!==this.readyState||(this.readyState="opening",this.doOpen()),this}},{key:"close",value:function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this}},{key:"send",value:function(t){"open"===this.readyState&&this.write(t)}},{key:"onOpen",value:function(){this.readyState="open",this.writable=!0,this.emit("open")}},{key:"onData",value:function(t){var e=f.decodePacket(t,this.socket.binaryType);this.onPacket(e)}},{key:"onPacket",value:function(t){this.emit("packet",t)}},{key:"onClose",value:function(){this.readyState="closed",this.emit("close")}}])&&o(e.prototype,n),r&&o(e,r),u}(l);t.exports=h},function(t,e){e.encode=function(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e},e.decode=function(t){for(var e={},n=t.split("&"),r=0,o=n.length;r<o;r++){var i=n[r].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e,n){return(o="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=a(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=a(t);if(e){var o=a(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t,e,n){return e&&f(t.prototype,e),n&&f(t,n),t}Object.defineProperty(e,"__esModule",{value:!0}),e.Decoder=e.Encoder=e.PacketType=e.protocol=void 0;var p,h=n(2),y=n(30),d=n(15);e.protocol=5,function(t){t[t.CONNECT=0]="CONNECT",t[t.DISCONNECT=1]="DISCONNECT",t[t.EVENT=2]="EVENT",t[t.ACK=3]="ACK",t[t.CONNECT_ERROR=4]="CONNECT_ERROR",t[t.BINARY_EVENT=5]="BINARY_EVENT",t[t.BINARY_ACK=6]="BINARY_ACK"}(p=e.PacketType||(e.PacketType={}));var v=function(){function t(){u(this,t)}return l(t,[{key:"encode",value:function(t){return t.type!==p.EVENT&&t.type!==p.ACK||!d.hasBinary(t)?[this.encodeAsString(t)]:(t.type=t.type===p.EVENT?p.BINARY_EVENT:p.BINARY_ACK,this.encodeAsBinary(t))}},{key:"encodeAsString",value:function(t){var e=""+t.type;return t.type!==p.BINARY_EVENT&&t.type!==p.BINARY_ACK||(e+=t.attachments+"-"),t.nsp&&"/"!==t.nsp&&(e+=t.nsp+","),null!=t.id&&(e+=t.id),null!=t.data&&(e+=JSON.stringify(t.data)),e}},{key:"encodeAsBinary",value:function(t){var e=y.deconstructPacket(t),n=this.encodeAsString(e.packet),r=e.buffers;return r.unshift(n),r}}]),t}();e.Encoder=v;var b=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(n,t);var e=s(n);function n(){return u(this,n),e.call(this)}return l(n,[{key:"add",value:function(t){var e;if("string"==typeof t)(e=this.decodeString(t)).type===p.BINARY_EVENT||e.type===p.BINARY_ACK?(this.reconstructor=new m(e),0===e.attachments&&o(a(n.prototype),"emit",this).call(this,"decoded",e)):o(a(n.prototype),"emit",this).call(this,"decoded",e);else{if(!d.isBinary(t)&&!t.base64)throw new Error("Unknown type: "+t);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");(e=this.reconstructor.takeBinaryData(t))&&(this.reconstructor=null,o(a(n.prototype),"emit",this).call(this,"decoded",e))}}},{key:"decodeString",value:function(t){var e=0,r={type:Number(t.charAt(0))};if(void 0===p[r.type])throw new Error("unknown packet type "+r.type);if(r.type===p.BINARY_EVENT||r.type===p.BINARY_ACK){for(var o=e+1;"-"!==t.charAt(++e)&&e!=t.length;);var i=t.substring(o,e);if(i!=Number(i)||"-"!==t.charAt(e))throw new Error("Illegal attachments");r.attachments=Number(i)}if("/"===t.charAt(e+1)){for(var s=e+1;++e;){if(","===t.charAt(e))break;if(e===t.length)break}r.nsp=t.substring(s,e)}else r.nsp="/";var c=t.charAt(e+1);if(""!==c&&Number(c)==c){for(var a=e+1;++e;){var u=t.charAt(e);if(null==u||Number(u)!=u){--e;break}if(e===t.length)break}r.id=Number(t.substring(a,e+1))}if(t.charAt(++e)){var f=function(t){try{return JSON.parse(t)}catch(t){return!1}}(t.substr(e));if(!n.isPayloadValid(r.type,f))throw new Error("invalid payload");r.data=f}return r}},{key:"destroy",value:function(){this.reconstructor&&this.reconstructor.finishedReconstruction()}}],[{key:"isPayloadValid",value:function(t,e){switch(t){case p.CONNECT:return"object"===r(e);case p.DISCONNECT:return void 0===e;case p.CONNECT_ERROR:return"string"==typeof e||"object"===r(e);case p.EVENT:case p.BINARY_EVENT:return Array.isArray(e)&&e.length>0;case p.ACK:case p.BINARY_ACK:return Array.isArray(e)}}}]),n}(h);e.Decoder=b;var m=function(){function t(e){u(this,t),this.packet=e,this.buffers=[],this.reconPack=e}return l(t,[{key:"takeBinaryData",value:function(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){var e=y.reconstructPacket(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null}},{key:"finishedReconstruction",value:function(){this.reconPack=null,this.buffers=[]}}]),t}()},function(t,e){var n=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,r=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];t.exports=function(t){var e=t,o=t.indexOf("["),i=t.indexOf("]");-1!=o&&-1!=i&&(t=t.substring(0,o)+t.substring(o,i).replace(/:/g,";")+t.substring(i,t.length));for(var s,c,a=n.exec(t||""),u={},f=14;f--;)u[r[f]]=a[f]||"";return-1!=o&&-1!=i&&(u.source=e,u.host=u.host.substring(1,u.host.length-1).replace(/;/g,":"),u.authority=u.authority.replace("[","").replace("]","").replace(/;/g,":"),u.ipv6uri=!0),u.pathNames=function(t,e){var n=e.replace(/\/{2,9}/g,"/").split("/");"/"!=e.substr(0,1)&&0!==e.length||n.splice(0,1);"/"==e.substr(e.length-1,1)&&n.splice(n.length-1,1);return n}(0,u.path),u.queryKey=(s=u.query,c={},s.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,(function(t,e,n){e&&(c[e]=n)})),c),u}},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=u(t);if(e){var o=u(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return a(t)}function a(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.Manager=void 0;var f=n(20),l=n(3),p=n(14),h=n(6),y=n(16),d=n(31),v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(v,t);var e,n,c,u=s(v);function v(t,e){var n,o;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,v),(n=u.call(this)).nsps={},n.subs=[],t&&"object"===r(t)&&(e=t,t=void 0),(e=e||{}).path=e.path||"/socket.io",n.opts=e,(0,l.installTimerFunctions)(a(n),e),n.reconnection(!1!==e.reconnection),n.reconnectionAttempts(e.reconnectionAttempts||1/0),n.reconnectionDelay(e.reconnectionDelay||1e3),n.reconnectionDelayMax(e.reconnectionDelayMax||5e3),n.randomizationFactor(null!==(o=e.randomizationFactor)&&void 0!==o?o:.5),n.backoff=new d({min:n.reconnectionDelay(),max:n.reconnectionDelayMax(),jitter:n.randomizationFactor()}),n.timeout(null==e.timeout?2e4:e.timeout),n._readyState="closed",n.uri=t;var i=e.parser||h;return n.encoder=new i.Encoder,n.decoder=new i.Decoder,n._autoConnect=!1!==e.autoConnect,n._autoConnect&&n.open(),n}return e=v,(n=[{key:"reconnection",value:function(t){return arguments.length?(this._reconnection=!!t,this):this._reconnection}},{key:"reconnectionAttempts",value:function(t){return void 0===t?this._reconnectionAttempts:(this._reconnectionAttempts=t,this)}},{key:"reconnectionDelay",value:function(t){var e;return void 0===t?this._reconnectionDelay:(this._reconnectionDelay=t,null===(e=this.backoff)||void 0===e||e.setMin(t),this)}},{key:"randomizationFactor",value:function(t){var e;return void 0===t?this._randomizationFactor:(this._randomizationFactor=t,null===(e=this.backoff)||void 0===e||e.setJitter(t),this)}},{key:"reconnectionDelayMax",value:function(t){var e;return void 0===t?this._reconnectionDelayMax:(this._reconnectionDelayMax=t,null===(e=this.backoff)||void 0===e||e.setMax(t),this)}},{key:"timeout",value:function(t){return arguments.length?(this._timeout=t,this):this._timeout}},{key:"maybeReconnectOnOpen",value:function(){!this._reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()}},{key:"open",value:function(t){var e=this;if(~this._readyState.indexOf("open"))return this;this.engine=f(this.uri,this.opts);var n=this.engine,r=this;this._readyState="opening",this.skipReconnect=!1;var o=(0,y.on)(n,"open",(function(){r.onopen(),t&&t()})),i=(0,y.on)(n,"error",(function(n){r.cleanup(),r._readyState="closed",e.emitReserved("error",n),t?t(n):r.maybeReconnectOnOpen()}));if(!1!==this._timeout){var s=this._timeout;0===s&&o();var c=this.setTimeoutFn((function(){o(),n.close(),n.emit("error",new Error("timeout"))}),s);this.opts.autoUnref&&c.unref(),this.subs.push((function(){clearTimeout(c)}))}return this.subs.push(o),this.subs.push(i),this}},{key:"connect",value:function(t){return this.open(t)}},{key:"onopen",value:function(){this.cleanup(),this._readyState="open",this.emitReserved("open");var t=this.engine;this.subs.push((0,y.on)(t,"ping",this.onping.bind(this)),(0,y.on)(t,"data",this.ondata.bind(this)),(0,y.on)(t,"error",this.onerror.bind(this)),(0,y.on)(t,"close",this.onclose.bind(this)),(0,y.on)(this.decoder,"decoded",this.ondecoded.bind(this)))}},{key:"onping",value:function(){this.emitReserved("ping")}},{key:"ondata",value:function(t){this.decoder.add(t)}},{key:"ondecoded",value:function(t){this.emitReserved("packet",t)}},{key:"onerror",value:function(t){this.emitReserved("error",t)}},{key:"socket",value:function(t,e){var n=this.nsps[t];return n||(n=new p.Socket(this,t,e),this.nsps[t]=n),n}},{key:"_destroy",value:function(t){for(var e=0,n=Object.keys(this.nsps);e<n.length;e++){var r=n[e];if(this.nsps[r].active)return}this._close()}},{key:"_packet",value:function(t){for(var e=this.encoder.encode(t),n=0;n<e.length;n++)this.engine.write(e[n],t.options)}},{key:"cleanup",value:function(){this.subs.forEach((function(t){return t()})),this.subs.length=0,this.decoder.destroy()}},{key:"_close",value:function(){this.skipReconnect=!0,this._reconnecting=!1,"opening"===this._readyState&&this.cleanup(),this.backoff.reset(),this._readyState="closed",this.engine&&this.engine.close()}},{key:"disconnect",value:function(){return this._close()}},{key:"onclose",value:function(t){this.cleanup(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",t),this._reconnection&&!this.skipReconnect&&this.reconnect()}},{key:"reconnect",value:function(){var t=this;if(this._reconnecting||this.skipReconnect)return this;var e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{var n=this.backoff.duration();this._reconnecting=!0;var r=this.setTimeoutFn((function(){e.skipReconnect||(t.emitReserved("reconnect_attempt",e.backoff.attempts),e.skipReconnect||e.open((function(n){n?(e._reconnecting=!1,e.reconnect(),t.emitReserved("reconnect_error",n)):e.onreconnect()})))}),n);this.opts.autoUnref&&r.unref(),this.subs.push((function(){clearTimeout(r)}))}}},{key:"onreconnect",value:function(){var t=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",t)}}])&&o(e.prototype,n),c&&o(e,c),v}(n(17).StrictEventEmitter);e.Manager=v},function(t,e,n){var r=n(10),o=n(23),i=n(27),s=n(28);e.polling=function(t){var e=!1,n=!1,s=!1!==t.jsonp;if("undefined"!=typeof location){var c="https:"===location.protocol,a=location.port;a||(a=c?443:80),e=t.hostname!==location.hostname||a!==t.port,n=t.secure!==c}if(t.xdomain=e,t.xscheme=n,"open"in new r(t)&&!t.forceJSONP)return new o(t);if(!s)throw new Error("JSONP disabled");return new i(t)},e.websocket=s},function(t,e,n){var r=n(22),o=n(0);t.exports=function(t){var e=t.xdomain,n=t.xscheme,i=t.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!e||r))return new XMLHttpRequest}catch(t){}try{if("undefined"!=typeof XDomainRequest&&!n&&i)return new XDomainRequest}catch(t){}if(!e)try{return new(o[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(t){}}},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=u(t);if(e){var o=u(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return a(this,n)}}function a(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var f=n(4),l=n(5),p=n(1),h=n(13),y=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(u,t);var e,n,r,a=c(u);function u(){return o(this,u),a.apply(this,arguments)}return e=u,(n=[{key:"name",get:function(){return"polling"}},{key:"doOpen",value:function(){this.poll()}},{key:"pause",value:function(t){var e=this;this.readyState="pausing";var n=function(){e.readyState="paused",t()};if(this.polling||!this.writable){var r=0;this.polling&&(r++,this.once("pollComplete",(function(){--r||n()}))),this.writable||(r++,this.once("drain",(function(){--r||n()})))}else n()}},{key:"poll",value:function(){this.polling=!0,this.doPoll(),this.emit("poll")}},{key:"onData",value:function(t){var e=this;p.decodePayload(t,this.socket.binaryType).forEach((function(t){if("opening"===e.readyState&&"open"===t.type&&e.onOpen(),"close"===t.type)return e.onClose(),!1;e.onPacket(t)})),"closed"!==this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"===this.readyState&&this.poll())}},{key:"doClose",value:function(){var t=this,e=function(){t.write([{type:"close"}])};"open"===this.readyState?e():this.once("open",e)}},{key:"write",value:function(t){var e=this;this.writable=!1,p.encodePayload(t,(function(t){e.doWrite(t,(function(){e.writable=!0,e.emit("drain")}))}))}},{key:"uri",value:function(){var t=this.query||{},e=this.opts.secure?"https":"http",n="";return!1!==this.opts.timestampRequests&&(t[this.opts.timestampParam]=h()),this.supportsBinary||t.sid||(t.b64=1),t=l.encode(t),this.opts.port&&("https"===e&&443!==Number(this.opts.port)||"http"===e&&80!==Number(this.opts.port))&&(n=":"+this.opts.port),t.length&&(t="?"+t),e+"://"+(-1!==this.opts.hostname.indexOf(":")?"["+this.opts.hostname+"]":this.opts.hostname)+n+this.opts.path+t}}])&&i(e.prototype,n),r&&i(e,r),u}(f);t.exports=y},function(t,e){var n=Object.create(null);n.open="0",n.close="1",n.ping="2",n.pong="3",n.message="4",n.upgrade="5",n.noop="6";var r=Object.create(null);Object.keys(n).forEach((function(t){r[n[t]]=t}));t.exports={PACKET_TYPES:n,PACKET_TYPES_REVERSE:r,ERROR_PACKET:{type:"error",data:"parser error"}}},function(t,e,n){"use strict";var r,o="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),i={},s=0,c=0;function a(t){var e="";do{e=o[t%64]+e,t=Math.floor(t/64)}while(t>0);return e}function u(){var t=a(+new Date);return t!==r?(s=0,r=t):t+"."+a(s++)}for(;c<64;c++)i[o[c]]=c;u.encode=a,u.decode=function(t){var e=0;for(c=0;c<t.length;c++)e=64*e+i[t.charAt(c)];return e},t.exports=u},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,c=!0,a=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){a=!0,s=t},f:function(){try{c||null==n.return||n.return()}finally{if(a)throw s}}}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e,n){return(c="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=l(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=l(t);if(e){var o=l(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return f(this,n)}}function f(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.Socket=void 0;var p=n(6),h=n(16),y=n(17),d=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1}),v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}(f,t);var e,n,r,i=u(f);function f(t,e,n){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,f),(r=i.call(this)).connected=!1,r.disconnected=!0,r.receiveBuffer=[],r.sendBuffer=[],r.ids=0,r.acks={},r.flags={},r.io=t,r.nsp=e,n&&n.auth&&(r.auth=n.auth),r.io._autoConnect&&r.open(),r}return e=f,(n=[{key:"subEvents",value:function(){if(!this.subs){var t=this.io;this.subs=[(0,h.on)(t,"open",this.onopen.bind(this)),(0,h.on)(t,"packet",this.onpacket.bind(this)),(0,h.on)(t,"error",this.onerror.bind(this)),(0,h.on)(t,"close",this.onclose.bind(this))]}}},{key:"active",get:function(){return!!this.subs}},{key:"connect",value:function(){return this.connected||(this.subEvents(),this.io._reconnecting||this.io.open(),"open"===this.io._readyState&&this.onopen()),this}},{key:"open",value:function(){return this.connect()}},{key:"send",value:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return e.unshift("message"),this.emit.apply(this,e),this}},{key:"emit",value:function(t){if(d.hasOwnProperty(t))throw new Error('"'+t+'" is a reserved event name');for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];n.unshift(t);var o={type:p.PacketType.EVENT,data:n,options:{}};o.options.compress=!1!==this.flags.compress,"function"==typeof n[n.length-1]&&(this.acks[this.ids]=n.pop(),o.id=this.ids++);var i=this.io.engine&&this.io.engine.transport&&this.io.engine.transport.writable,s=this.flags.volatile&&(!i||!this.connected);return s||(this.connected?this.packet(o):this.sendBuffer.push(o)),this.flags={},this}},{key:"packet",value:function(t){t.nsp=this.nsp,this.io._packet(t)}},{key:"onopen",value:function(){var t=this;"function"==typeof this.auth?this.auth((function(e){t.packet({type:p.PacketType.CONNECT,data:e})})):this.packet({type:p.PacketType.CONNECT,data:this.auth})}},{key:"onerror",value:function(t){this.connected||this.emitReserved("connect_error",t)}},{key:"onclose",value:function(t){this.connected=!1,this.disconnected=!0,delete this.id,this.emitReserved("disconnect",t)}},{key:"onpacket",value:function(t){if(t.nsp===this.nsp)switch(t.type){case p.PacketType.CONNECT:if(t.data&&t.data.sid){var e=t.data.sid;this.onconnect(e)}else this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case p.PacketType.EVENT:case p.PacketType.BINARY_EVENT:this.onevent(t);break;case p.PacketType.ACK:case p.PacketType.BINARY_ACK:this.onack(t);break;case p.PacketType.DISCONNECT:this.ondisconnect();break;case p.PacketType.CONNECT_ERROR:var n=new Error(t.data.message);n.data=t.data.data,this.emitReserved("connect_error",n)}}},{key:"onevent",value:function(t){var e=t.data||[];null!=t.id&&e.push(this.ack(t.id)),this.connected?this.emitEvent(e):this.receiveBuffer.push(Object.freeze(e))}},{key:"emitEvent",value:function(t){if(this._anyListeners&&this._anyListeners.length){var e,n=o(this._anyListeners.slice());try{for(n.s();!(e=n.n()).done;)e.value.apply(this,t)}catch(t){n.e(t)}finally{n.f()}}c(l(f.prototype),"emit",this).apply(this,t)}},{key:"ack",value:function(t){var e=this,n=!1;return function(){if(!n){n=!0;for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];e.packet({type:p.PacketType.ACK,id:t,data:o})}}}},{key:"onack",value:function(t){var e=this.acks[t.id];"function"==typeof e&&(e.apply(this,t.data),delete this.acks[t.id])}},{key:"onconnect",value:function(t){this.id=t,this.connected=!0,this.disconnected=!1,this.emitBuffered(),this.emitReserved("connect")}},{key:"emitBuffered",value:function(){var t=this;this.receiveBuffer.forEach((function(e){return t.emitEvent(e)})),this.receiveBuffer=[],this.sendBuffer.forEach((function(e){return t.packet(e)})),this.sendBuffer=[]}},{key:"ondisconnect",value:function(){this.destroy(),this.onclose("io server disconnect")}},{key:"destroy",value:function(){this.subs&&(this.subs.forEach((function(t){return t()})),this.subs=void 0),this.io._destroy(this)}},{key:"disconnect",value:function(){return this.connected&&this.packet({type:p.PacketType.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}},{key:"close",value:function(){return this.disconnect()}},{key:"compress",value:function(t){return this.flags.compress=t,this}},{key:"volatile",get:function(){return this.flags.volatile=!0,this}},{key:"onAny",value:function(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(t),this}},{key:"prependAny",value:function(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(t),this}},{key:"offAny",value:function(t){if(!this._anyListeners)return this;if(t){for(var e=this._anyListeners,n=0;n<e.length;n++)if(t===e[n])return e.splice(n,1),this}else this._anyListeners=[];return this}},{key:"listenersAny",value:function(){return this._anyListeners||[]}}])&&s(e.prototype,n),r&&s(e,r),f}(y.StrictEventEmitter);e.Socket=v},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.hasBinary=e.isBinary=void 0;var o="function"==typeof ArrayBuffer,i=Object.prototype.toString,s="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===i.call(Blob),c="function"==typeof File||"undefined"!=typeof File&&"[object FileConstructor]"===i.call(File);function a(t){return o&&(t instanceof ArrayBuffer||function(t){return"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer}(t))||s&&t instanceof Blob||c&&t instanceof File}e.isBinary=a,e.hasBinary=function t(e,n){if(!e||"object"!==r(e))return!1;if(Array.isArray(e)){for(var o=0,i=e.length;o<i;o++)if(t(e[o]))return!0;return!1}if(a(e))return!0;if(e.toJSON&&"function"==typeof e.toJSON&&1===arguments.length)return t(e.toJSON(),!0);for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)&&t(e[s]))return!0;return!1}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.on=void 0,e.on=function(t,e,n){return t.on(e,n),function(){t.off(e,n)}}},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e,n){return(s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=f(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=f(t);if(e){var o=f(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return u(this,n)}}function u(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.StrictEventEmitter=void 0;var l=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(l,t);var e,n,r,u=a(l);function l(){return o(this,l),u.apply(this,arguments)}return e=l,(n=[{key:"on",value:function(t,e){return s(f(l.prototype),"on",this).call(this,t,e),this}},{key:"once",value:function(t,e){return s(f(l.prototype),"once",this).call(this,t,e),this}},{key:"emit",value:function(t){for(var e,n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return(e=s(f(l.prototype),"emit",this)).call.apply(e,[this,t].concat(r)),this}},{key:"emitReserved",value:function(t){for(var e,n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return(e=s(f(l.prototype),"emit",this)).call.apply(e,[this,t].concat(r)),this}},{key:"listeners",value:function(t){return s(f(l.prototype),"listeners",this).call(this,t)}}])&&i(e.prototype,n),r&&i(e,r),l}(n(2));e.StrictEventEmitter=l},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.io=e.Socket=e.Manager=e.protocol=void 0;var o=n(19),i=n(8);t.exports=e=c;var s=e.managers={};function c(t,e){"object"===r(t)&&(e=t,t=void 0),e=e||{};var n,c=(0,o.url)(t,e.path||"/socket.io"),a=c.source,u=c.id,f=c.path,l=s[u]&&f in s[u].nsps;return e.forceNew||e["force new connection"]||!1===e.multiplex||l?n=new i.Manager(a,e):(s[u]||(s[u]=new i.Manager(a,e)),n=s[u]),c.query&&!e.query&&(e.query=c.queryKey),n.socket(c.path,e)}e.io=c;var a=n(6);Object.defineProperty(e,"protocol",{enumerable:!0,get:function(){return a.protocol}}),e.connect=c;var u=n(8);Object.defineProperty(e,"Manager",{enumerable:!0,get:function(){return u.Manager}});var f=n(14);Object.defineProperty(e,"Socket",{enumerable:!0,get:function(){return f.Socket}}),e.default=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.url=void 0;var r=n(7);e.url=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2?arguments[2]:void 0,o=t;n=n||"undefined"!=typeof location&&location,null==t&&(t=n.protocol+"//"+n.host),"string"==typeof t&&("/"===t.charAt(0)&&(t="/"===t.charAt(1)?n.protocol+t:n.host+t),/^(https?|wss?):\/\//.test(t)||(t=void 0!==n?n.protocol+"//"+t:"https://"+t),o=r(t)),o.port||(/^(http|ws)$/.test(o.protocol)?o.port="80":/^(http|ws)s$/.test(o.protocol)&&(o.port="443")),o.path=o.path||"/";var i=-1!==o.host.indexOf(":"),s=i?"["+o.host+"]":o.host;return o.id=o.protocol+"://"+s+":"+o.port+e,o.href=o.protocol+"://"+s+(n&&n.port===o.port?"":":"+o.port),o}},function(t,e,n){var r=n(21);t.exports=function(t,e){return new r(t,e)},t.exports.Socket=r,t.exports.protocol=r.protocol,t.exports.Transport=n(4),t.exports.transports=n(9),t.exports.parser=n(1)},function(t,e,n){function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=l(t);if(e){var o=l(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return u(this,n)}}function u(t,e){if(e&&("object"===o(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return f(t)}function f(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var p=n(9),h=n(2),y=n(1),d=n(7),v=n(5),b=n(3).installTimerFunctions,m=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(h,t);var e,n,u,l=a(h);function h(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return i(this,h),e=l.call(this),t&&"object"===o(t)&&(n=t,t=null),t?(t=d(t),n.hostname=t.host,n.secure="https"===t.protocol||"wss"===t.protocol,n.port=t.port,t.query&&(n.query=t.query)):n.host&&(n.hostname=d(n.host).host),b(f(e),n),e.secure=null!=n.secure?n.secure:"undefined"!=typeof location&&"https:"===location.protocol,n.hostname&&!n.port&&(n.port=e.secure?"443":"80"),e.hostname=n.hostname||("undefined"!=typeof location?location.hostname:"localhost"),e.port=n.port||("undefined"!=typeof location&&location.port?location.port:e.secure?443:80),e.transports=n.transports||["polling","websocket"],e.readyState="",e.writeBuffer=[],e.prevBufferLen=0,e.opts=r({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,jsonp:!0,timestampParam:"t",rememberUpgrade:!1,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!0},n),e.opts.path=e.opts.path.replace(/\/$/,"")+"/","string"==typeof e.opts.query&&(e.opts.query=v.decode(e.opts.query)),e.id=null,e.upgrades=null,e.pingInterval=null,e.pingTimeout=null,e.pingTimeoutTimer=null,"function"==typeof addEventListener&&(e.opts.closeOnBeforeunload&&addEventListener("beforeunload",(function(){e.transport&&(e.transport.removeAllListeners(),e.transport.close())}),!1),"localhost"!==e.hostname&&(e.offlineEventListener=function(){e.onClose("transport close")},addEventListener("offline",e.offlineEventListener,!1))),e.open(),e}return e=h,(n=[{key:"createTransport",value:function(t){var e=function(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}(this.opts.query);e.EIO=y.protocol,e.transport=t,this.id&&(e.sid=this.id);var n=r({},this.opts.transportOptions[t],this.opts,{query:e,socket:this,hostname:this.hostname,secure:this.secure,port:this.port});return new p[t](n)}},{key:"open",value:function(){var t,e=this;if(this.opts.rememberUpgrade&&h.priorWebsocketSuccess&&-1!==this.transports.indexOf("websocket"))t="websocket";else{if(0===this.transports.length)return void this.setTimeoutFn((function(){e.emit("error","No transports available")}),0);t=this.transports[0]}this.readyState="opening";try{t=this.createTransport(t)}catch(t){return this.transports.shift(),void this.open()}t.open(),this.setTransport(t)}},{key:"setTransport",value:function(t){var e=this;this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",this.onDrain.bind(this)).on("packet",this.onPacket.bind(this)).on("error",this.onError.bind(this)).on("close",(function(){e.onClose("transport close")}))}},{key:"probe",value:function(t){var e=this,n=this.createTransport(t,{probe:1}),r=!1;h.priorWebsocketSuccess=!1;var o=function(){r||(n.send([{type:"ping",data:"probe"}]),n.once("packet",(function(t){if(!r)if("pong"===t.type&&"probe"===t.data){if(e.upgrading=!0,e.emit("upgrading",n),!n)return;h.priorWebsocketSuccess="websocket"===n.name,e.transport.pause((function(){r||"closed"!==e.readyState&&(f(),e.setTransport(n),n.send([{type:"upgrade"}]),e.emit("upgrade",n),n=null,e.upgrading=!1,e.flush())}))}else{var o=new Error("probe error");o.transport=n.name,e.emit("upgradeError",o)}})))};function i(){r||(r=!0,f(),n.close(),n=null)}var s=function(t){var r=new Error("probe error: "+t);r.transport=n.name,i(),e.emit("upgradeError",r)};function c(){s("transport closed")}function a(){s("socket closed")}function u(t){n&&t.name!==n.name&&i()}var f=function(){n.removeListener("open",o),n.removeListener("error",s),n.removeListener("close",c),e.removeListener("close",a),e.removeListener("upgrading",u)};n.once("open",o),n.once("error",s),n.once("close",c),this.once("close",a),this.once("upgrading",u),n.open()}},{key:"onOpen",value:function(){if(this.readyState="open",h.priorWebsocketSuccess="websocket"===this.transport.name,this.emit("open"),this.flush(),"open"===this.readyState&&this.opts.upgrade&&this.transport.pause)for(var t=0,e=this.upgrades.length;t<e;t++)this.probe(this.upgrades[t])}},{key:"onPacket",value:function(t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(this.emit("packet",t),this.emit("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this.resetPingTimeout(),this.sendPacket("pong"),this.emit("ping"),this.emit("pong");break;case"error":var e=new Error("server error");e.code=t.data,this.onError(e);break;case"message":this.emit("data",t.data),this.emit("message",t.data)}}},{key:"onHandshake",value:function(t){this.emit("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=this.filterUpgrades(t.upgrades),this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.onOpen(),"closed"!==this.readyState&&this.resetPingTimeout()}},{key:"resetPingTimeout",value:function(){var t=this;this.clearTimeoutFn(this.pingTimeoutTimer),this.pingTimeoutTimer=this.setTimeoutFn((function(){t.onClose("ping timeout")}),this.pingInterval+this.pingTimeout),this.opts.autoUnref&&this.pingTimeoutTimer.unref()}},{key:"onDrain",value:function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emit("drain"):this.flush()}},{key:"flush",value:function(){"closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))}},{key:"write",value:function(t,e,n){return this.sendPacket("message",t,e,n),this}},{key:"send",value:function(t,e,n){return this.sendPacket("message",t,e,n),this}},{key:"sendPacket",value:function(t,e,n,r){if("function"==typeof e&&(r=e,e=void 0),"function"==typeof n&&(r=n,n=null),"closing"!==this.readyState&&"closed"!==this.readyState){(n=n||{}).compress=!1!==n.compress;var o={type:t,data:e,options:n};this.emit("packetCreate",o),this.writeBuffer.push(o),r&&this.once("flush",r),this.flush()}}},{key:"close",value:function(){var t=this,e=function(){t.onClose("forced close"),t.transport.close()},n=function n(){t.removeListener("upgrade",n),t.removeListener("upgradeError",n),e()},r=function(){t.once("upgrade",n),t.once("upgradeError",n)};return"opening"!==this.readyState&&"open"!==this.readyState||(this.readyState="closing",this.writeBuffer.length?this.once("drain",(function(){t.upgrading?r():e()})):this.upgrading?r():e()),this}},{key:"onError",value:function(t){h.priorWebsocketSuccess=!1,this.emit("error",t),this.onClose("transport error",t)}},{key:"onClose",value:function(t,e){"opening"!==this.readyState&&"open"!==this.readyState&&"closing"!==this.readyState||(this.clearTimeoutFn(this.pingIntervalTimer),this.clearTimeoutFn(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),"function"==typeof removeEventListener&&removeEventListener("offline",this.offlineEventListener,!1),this.readyState="closed",this.id=null,this.emit("close",t,e),this.writeBuffer=[],this.prevBufferLen=0)}},{key:"filterUpgrades",value:function(t){for(var e=[],n=0,r=t.length;n<r;n++)~this.transports.indexOf(t[n])&&e.push(t[n]);return e}}])&&s(e.prototype,n),u&&s(e,u),h}(h);m.priorWebsocketSuccess=!1,m.protocol=y.protocol,t.exports=m},function(t,e){try{t.exports="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(e){t.exports=!1}},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(){return(o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),t}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function f(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=h(t);if(e){var o=h(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return l(this,n)}}function l(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return p(t)}function p(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var y=n(10),d=n(11),v=n(2),b=n(3),m=b.pick,g=b.installTimerFunctions,k=n(0);function w(){}var O=null!=new y({xdomain:!1}).responseType,_=function(t){a(n,t);var e=f(n);function n(t){var r;if(i(this,n),r=e.call(this,t),"undefined"!=typeof location){var o="https:"===location.protocol,s=location.port;s||(s=o?443:80),r.xd="undefined"!=typeof location&&t.hostname!==location.hostname||s!==t.port,r.xs=t.secure!==o}var c=t&&t.forceBase64;return r.supportsBinary=O&&!c,r}return c(n,[{key:"request",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o(t,{xd:this.xd,xs:this.xs},this.opts),new E(this.uri(),t)}},{key:"doWrite",value:function(t,e){var n=this,r=this.request({method:"POST",data:t});r.on("success",e),r.on("error",(function(t){n.onError("xhr post error",t)}))}},{key:"doPoll",value:function(){var t=this,e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(function(e){t.onError("xhr poll error",e)})),this.pollXhr=e}}]),n}(d),E=function(t){a(n,t);var e=f(n);function n(t,r){var o;return i(this,n),o=e.call(this),g(p(o),r),o.opts=r,o.method=r.method||"GET",o.uri=t,o.async=!1!==r.async,o.data=void 0!==r.data?r.data:null,o.create(),o}return c(n,[{key:"create",value:function(){var t=this,e=m(this.opts,"agent","enablesXDR","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");e.xdomain=!!this.opts.xd,e.xscheme=!!this.opts.xs;var r=this.xhr=new y(e);try{r.open(this.method,this.uri,this.async);try{if(this.opts.extraHeaders)for(var o in r.setDisableHeaderCheck&&r.setDisableHeaderCheck(!0),this.opts.extraHeaders)this.opts.extraHeaders.hasOwnProperty(o)&&r.setRequestHeader(o,this.opts.extraHeaders[o])}catch(t){}if("POST"===this.method)try{r.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(t){}try{r.setRequestHeader("Accept","*/*")}catch(t){}"withCredentials"in r&&(r.withCredentials=this.opts.withCredentials),this.opts.requestTimeout&&(r.timeout=this.opts.requestTimeout),this.hasXDR()?(r.onload=function(){t.onLoad()},r.onerror=function(){t.onError(r.responseText)}):r.onreadystatechange=function(){4===r.readyState&&(200===r.status||1223===r.status?t.onLoad():t.setTimeoutFn((function(){t.onError("number"==typeof r.status?r.status:0)}),0))},r.send(this.data)}catch(e){return void this.setTimeoutFn((function(){t.onError(e)}),0)}"undefined"!=typeof document&&(this.index=n.requestsCount++,n.requests[this.index]=this)}},{key:"onSuccess",value:function(){this.emit("success"),this.cleanup()}},{key:"onData",value:function(t){this.emit("data",t),this.onSuccess()}},{key:"onError",value:function(t){this.emit("error",t),this.cleanup(!0)}},{key:"cleanup",value:function(t){if(void 0!==this.xhr&&null!==this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=w:this.xhr.onreadystatechange=w,t)try{this.xhr.abort()}catch(t){}"undefined"!=typeof document&&delete n.requests[this.index],this.xhr=null}}},{key:"onLoad",value:function(){var t=this.xhr.responseText;null!==t&&this.onData(t)}},{key:"hasXDR",value:function(){return"undefined"!=typeof XDomainRequest&&!this.xs&&this.enablesXDR}},{key:"abort",value:function(){this.cleanup()}}]),n}(v);if(E.requestsCount=0,E.requests={},"undefined"!=typeof document)if("function"==typeof attachEvent)attachEvent("onunload",S);else if("function"==typeof addEventListener){addEventListener("onpagehide"in k?"pagehide":"unload",S,!1)}function S(){for(var t in E.requests)E.requests.hasOwnProperty(t)&&E.requests[t].abort()}t.exports=_,t.exports.Request=E},function(t,e,n){var r=n(12).PACKET_TYPES,o="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===Object.prototype.toString.call(Blob),i="function"==typeof ArrayBuffer,s=function(t,e){var n=new FileReader;return n.onload=function(){var t=n.result.split(",")[1];e("b"+t)},n.readAsDataURL(t)};t.exports=function(t,e,n){var c,a=t.type,u=t.data;return o&&u instanceof Blob?e?n(u):s(u,n):i&&(u instanceof ArrayBuffer||(c=u,"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(c):c&&c.buffer instanceof ArrayBuffer))?e?n(u instanceof ArrayBuffer?u:u.buffer):s(new Blob([u]),n):n(r[a]+(u||""))}},function(t,e,n){var r,o=n(12),i=o.PACKET_TYPES_REVERSE,s=o.ERROR_PACKET;"function"==typeof ArrayBuffer&&(r=n(26));var c=function(t,e){if(r){var n=r.decode(t);return a(n,e)}return{base64:!0,data:t}},a=function(t,e){switch(e){case"blob":return t instanceof ArrayBuffer?new Blob([t]):t;case"arraybuffer":default:return t}};t.exports=function(t,e){if("string"!=typeof t)return{type:"message",data:a(t,e)};var n=t.charAt(0);return"b"===n?{type:"message",data:c(t.substring(1),e)}:i[n]?t.length>1?{type:i[n],data:t.substring(1)}:{type:i[n]}:s}},function(t,e){!function(t){"use strict";e.encode=function(e){var n,r=new Uint8Array(e),o=r.length,i="";for(n=0;n<o;n+=3)i+=t[r[n]>>2],i+=t[(3&r[n])<<4|r[n+1]>>4],i+=t[(15&r[n+1])<<2|r[n+2]>>6],i+=t[63&r[n+2]];return o%3==2?i=i.substring(0,i.length-1)+"=":o%3==1&&(i=i.substring(0,i.length-2)+"=="),i},e.decode=function(e){var n,r,o,i,s,c=.75*e.length,a=e.length,u=0;"="===e[e.length-1]&&(c--,"="===e[e.length-2]&&c--);var f=new ArrayBuffer(c),l=new Uint8Array(f);for(n=0;n<a;n+=4)r=t.indexOf(e[n]),o=t.indexOf(e[n+1]),i=t.indexOf(e[n+2]),s=t.indexOf(e[n+3]),l[u++]=r<<2|o>>4,l[u++]=(15&o)<<4|i>>2,l[u++]=(3&i)<<6|63&s;return f}}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e,n){return(i="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=f(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=f(t);if(e){var o=f(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return a(this,n)}}function a(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return u(t)}function u(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var l,p=n(11),h=n(0),y=/\n/g,d=/\\n/g,v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(p,t);var e,n,r,a=c(p);function p(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,p),(e=a.call(this,t)).query=e.query||{},l||(l=h.___eio=h.___eio||[]),e.index=l.length,l.push(e.onData.bind(u(e))),e.query.j=e.index,e}return e=p,(n=[{key:"supportsBinary",get:function(){return!1}},{key:"doClose",value:function(){this.script&&(this.script.onerror=function(){},this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),i(f(p.prototype),"doClose",this).call(this)}},{key:"doPoll",value:function(){var t=this,e=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),e.async=!0,e.src=this.uri(),e.onerror=function(e){t.onError("jsonp poll error",e)};var n=document.getElementsByTagName("script")[0];n?n.parentNode.insertBefore(e,n):(document.head||document.body).appendChild(e),this.script=e,"undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent)&&this.setTimeoutFn((function(){var t=document.createElement("iframe");document.body.appendChild(t),document.body.removeChild(t)}),100)}},{key:"doWrite",value:function(t,e){var n,r=this;if(!this.form){var o=document.createElement("form"),i=document.createElement("textarea"),s=this.iframeId="eio_iframe_"+this.index;o.className="socketio",o.style.position="absolute",o.style.top="-1000px",o.style.left="-1000px",o.target=s,o.method="POST",o.setAttribute("accept-charset","utf-8"),i.name="d",o.appendChild(i),document.body.appendChild(o),this.form=o,this.area=i}function c(){a(),e()}this.form.action=this.uri();var a=function(){if(r.iframe)try{r.form.removeChild(r.iframe)}catch(t){r.onError("jsonp polling iframe removal error",t)}try{var t='<iframe src="javascript:0" name="'+r.iframeId+'">';n=document.createElement(t)}catch(t){(n=document.createElement("iframe")).name=r.iframeId,n.src="javascript:0"}n.id=r.iframeId,r.form.appendChild(n),r.iframe=n};a(),t=t.replace(d,"\\\n"),this.area.value=t.replace(y,"\\n");try{this.form.submit()}catch(t){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"===r.iframe.readyState&&c()}:this.iframe.onload=c}}])&&o(e.prototype,n),r&&o(e,r),p}(p);t.exports=v},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=a(t);if(e){var o=a(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var u=n(4),f=n(1),l=n(5),p=n(13),h=n(3).pick,y=n(29),d=y.WebSocket,v=y.usingBrowserWebSocket,b=y.defaultBinaryType,m=y.nextTick,g="undefined"!=typeof navigator&&"string"==typeof navigator.product&&"reactnative"===navigator.product.toLowerCase(),k=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(a,t);var e,n,r,c=s(a);function a(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=c.call(this,t)).supportsBinary=!t.forceBase64,e}return e=a,(n=[{key:"name",get:function(){return"websocket"}},{key:"doOpen",value:function(){if(this.check()){var t=this.uri(),e=this.opts.protocols,n=g?{}:h(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(n.headers=this.opts.extraHeaders);try{this.ws=v&&!g?e?new d(t,e):new d(t):new d(t,e,n)}catch(t){return this.emit("error",t)}this.ws.binaryType=this.socket.binaryType||b,this.addEventListeners()}}},{key:"addEventListeners",value:function(){var t=this;this.ws.onopen=function(){t.opts.autoUnref&&t.ws._socket.unref(),t.onOpen()},this.ws.onclose=this.onClose.bind(this),this.ws.onmessage=function(e){return t.onData(e.data)},this.ws.onerror=function(e){return t.onError("websocket error",e)}}},{key:"write",value:function(t){var e=this;this.writable=!1;for(var n=function(n){var r=t[n],o=n===t.length-1;f.encodePacket(r,e.supportsBinary,(function(t){var n={};v||(r.options&&(n.compress=r.options.compress),e.opts.perMessageDeflate&&("string"==typeof t?Buffer.byteLength(t):t.length)<e.opts.perMessageDeflate.threshold&&(n.compress=!1));try{v?e.ws.send(t):e.ws.send(t,n)}catch(t){}o&&m((function(){e.writable=!0,e.emit("drain")}),e.setTimeoutFn)}))},r=0;r<t.length;r++)n(r)}},{key:"onClose",value:function(){u.prototype.onClose.call(this)}},{key:"doClose",value:function(){void 0!==this.ws&&(this.ws.close(),this.ws=null)}},{key:"uri",value:function(){var t=this.query||{},e=this.opts.secure?"wss":"ws",n="";return this.opts.port&&("wss"===e&&443!==Number(this.opts.port)||"ws"===e&&80!==Number(this.opts.port))&&(n=":"+this.opts.port),this.opts.timestampRequests&&(t[this.opts.timestampParam]=p()),this.supportsBinary||(t.b64=1),(t=l.encode(t)).length&&(t="?"+t),e+"://"+(-1!==this.opts.hostname.indexOf(":")?"["+this.opts.hostname+"]":this.opts.hostname)+n+this.opts.path+t}},{key:"check",value:function(){return!(!d||"__initialize"in d&&this.name===a.prototype.name)}}])&&o(e.prototype,n),r&&o(e,r),a}(u);t.exports=k},function(t,e,n){var r=n(0),o="function"==typeof Promise&&"function"==typeof Promise.resolve?function(t){return Promise.resolve().then(t)}:function(t,e){return e(t,0)};t.exports={WebSocket:r.WebSocket||r.MozWebSocket,usingBrowserWebSocket:!0,defaultBinaryType:"arraybuffer",nextTick:o}},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.reconstructPacket=e.deconstructPacket=void 0;var o=n(15);e.deconstructPacket=function(t){var e=[],n=t.data,i=t;return i.data=function t(e,n){if(!e)return e;if(o.isBinary(e)){var i={_placeholder:!0,num:n.length};return n.push(e),i}if(Array.isArray(e)){for(var s=new Array(e.length),c=0;c<e.length;c++)s[c]=t(e[c],n);return s}if("object"===r(e)&&!(e instanceof Date)){var a={};for(var u in e)e.hasOwnProperty(u)&&(a[u]=t(e[u],n));return a}return e}(n,e),i.attachments=e.length,{packet:i,buffers:e}},e.reconstructPacket=function(t,e){return t.data=function t(e,n){if(!e)return e;if(e&&e._placeholder)return n[e.num];if(Array.isArray(e))for(var o=0;o<e.length;o++)e[o]=t(e[o],n);else if("object"===r(e))for(var i in e)e.hasOwnProperty(i)&&(e[i]=t(e[i],n));return e}(t.data,e),t.attachments=void 0,t}},function(t,e){function n(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}t.exports=n,n.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=0==(1&Math.floor(10*e))?t-n:t+n}return 0|Math.min(t,this.max)},n.prototype.reset=function(){this.attempts=0},n.prototype.setMin=function(t){this.ms=t},n.prototype.setMax=function(t){this.max=t},n.prototype.setJitter=function(t){this.jitter=t}}])}));
//# sourceMappingURL=socket.io.min.js.map
"use strict"; // wScroll.js
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ custom scroll ↓↓↓ */
  // ініціалізація
  window.addEventListener('load', function(){
    if ( !document.querySelector('.wjs-scroll') ) return;

    let arrOfScrollableElements = document.querySelectorAll('.wjs-scroll');
    for (let elem of arrOfScrollableElements) {
      wSetScroll(elem);
    }
  });

  // слідкування за змінами в сторінці (елемент може повністю влізти на
  // сторінку або навпаки), відповідно скрол повинен пропасти/з'явитися
  window.addEventListener('resize', function(){
    if ( !document.querySelector('.wjs-scroll') ) return;

    let arrOfScrollableElements = document.querySelectorAll('.wjs-scroll');
    for (let elem of arrOfScrollableElements) {
      wSetScroll(elem);
    }
  });
/* ↑↑↑ custom scroll ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  /**
   * [wSetScroll відповідає за кастомну прокрутку:
   * 1. зчитує з атрибутів елемента, які прокрутки потрібно додати,
   * 2. слідкує за прокруткою елемента і поправляє положення повзунків прокрутки
   * 3. слідкує за положенням повзунків прокрутки і поправляє прокрутку елемента]
   * @param {[DOM-object]} elem [елемент DOM з класом .wjs-scroll]
   * @param {[object]} params [набір налаштувань для одиночного запуску функції
   * формат даних: {top:boolean, bottom:boolean, left:boolean, right:boolean,
   * overflowXHidden:boolean, overvlowYHidden:boolean}]
   */
  function wSetScroll(elem, params = {}) {

    if (!elem) return;

    if ( !elem.querySelector('.wjs-scroll__content-wrapper')
         || !elem.querySelector('.wjs-scroll__content') ) {
      console.log('markup error: wrong html structure');
      return;
    }

    let container      = elem,
        contentWrapper = elem.querySelector('.wjs-scroll__content-wrapper'),
        content        = elem.querySelector('.wjs-scroll__content');

    /* ↓↓↓ ПІДГОТОВКА ↓↓↓ */

      // заборона прокрутки (якщо потрібно)
      let settingsString2 = container.dataset.scrollHidden || '';
      let overflowXProhibition = settingsString2.match(/horizontal/i)
                                 || params.overflowXHidden;
      let overflowYProhibition = settingsString2.match(/vertical/i)
                                 || params.overflowYHidden;

      if (overflowXProhibition && overflowYProhibition) {
        content.style.overflow = 'hidden';
        return
      } else if (overflowXProhibition) {
        content.style.overflowX = 'hidden';
      } else if (overflowYProhibition) {
        content.style.overflowY = 'hidden';
      }
      // корекція розміру контенту: його внутрішній рзмір має бути таким, як і
      // сам контейнер, а скрол повинен бути прихований за межами контейнеру.
      let scrollLineHeight = content.offsetHeight - content.clientHeight,
          scrollLineWidth  = content.offsetWidth - content.clientWidth;

      content.style.height = contentWrapper.clientHeight + scrollLineHeight + 'px';
      content.style.width  = contentWrapper.clientWidth + scrollLineWidth + 'px';
    /* ↑↑↑ /ПІДГОТОВКА ↑↑↑ */

    /* ↓↓↓ ДОДАВАННЯ ПОЛОС ПРОКРУТКИ ↓↓↓ */
      let lineT, lineB, thumbT, thumbB,
          lineR, lineL, thumbR, thumbL;

      let settingsString = container.dataset.scroll || '';

      // додавання полос прокрутки по горизонталі
      if ( !overflowXProhibition && (content.scrollWidth > content.clientWidth) ) {

        if ( params.top || settingsString.match(/top/i) ) {
          if ( !container.querySelector('.wjs-scroll__line_top') ) {
            wAddScrollLine('top');
          }
          lineT  = container.querySelector('.wjs-scroll__line_top');
          thumbT = container.querySelector('.wjs-scroll__thumb_top');

          thumbT.style.width = lineT.clientWidth*content.clientWidth/content.scrollWidth + 'px';
        }

        if ( params.bottom
          || settingsString.match(/bottom/i)
          || (!params.bottom
            && !params.top
            && !settingsString.match(/bottom/i)
            && !settingsString.match(/top/i) ) ) {
          if ( !container.querySelector('.wjs-scroll__line_bottom') ) {
            wAddScrollLine('bottom');
          }
          lineB  = container.querySelector('.wjs-scroll__line_bottom');
          thumbB = container.querySelector('.wjs-scroll__thumb_bottom');

          thumbB.style.width = lineB.clientWidth*content.clientWidth/content.scrollWidth + 'px';
        }
      } else {
        wRemoveScrollLine('gorizontal');
      }

      // додавання полос прокрутки по вертикалі
      if ( !overflowYProhibition && (content.scrollHeight > content.clientHeight) ) {

        if ( params.left || settingsString.match(/left/i) ) {
          if ( !container.querySelector('.wjs-scroll__line_left') ) {
            wAddScrollLine('left');
          }
          lineL  = container.querySelector('.wjs-scroll__line_left');
          thumbL = container.querySelector('.wjs-scroll__thumb_left');

          thumbL.style.height = lineL.clientHeight*content.clientHeight/content.scrollHeight + 'px';
        }

        if ( params.right
          || settingsString.match(/right/i)
          || (!params.left
            && !params.right
            && !settingsString.match(/left/i)
            && !settingsString.match(/right/i) ) ) {
          if ( !container.querySelector('.wjs-scroll__line_right') ) {
            wAddScrollLine('right');
          }
          lineR  = container.querySelector('.wjs-scroll__line_right');
          thumbR = container.querySelector('.wjs-scroll__thumb_right');

          thumbR.style.height = lineR.clientHeight*content.clientHeight/content.scrollHeight + 'px';
        }
      } else {
        wRemoveScrollLine('vertical');
      }
    /* ↑↑↑ ДОДАВАННЯ ПОЛОС ПРОКРУТКИ ↑↑↑ */

    /* ↓↓↓ ПРОКРУТКА КОЛІЩАТКОМ МИШІ ↓↓↓ */
      content.onscroll = function (event) {

        // кожного разу після повторного виклику функції формується нове
        // лексичне оточення, тому ці змінні потрібно постійно перепризначати
        lineL  = container.querySelector('.wjs-scroll__line_left');
        thumbL = container.querySelector('.wjs-scroll__thumb_left');
        lineR  = container.querySelector('.wjs-scroll__line_right');
        thumbR = container.querySelector('.wjs-scroll__thumb_right');
        lineT  = container.querySelector('.wjs-scroll__line_top');
        thumbT = container.querySelector('.wjs-scroll__thumb_top');
        lineB  = container.querySelector('.wjs-scroll__line_bottom');
        thumbB = container.querySelector('.wjs-scroll__thumb_bottom');

        // вертикальний скрол
        let maxContentYScroll = content.scrollHeight - content.clientHeight;
        let maxThumbYScroll;

        if (lineL) {
          maxThumbYScroll = lineL.clientHeight - thumbL.clientHeight;
        } else if (lineR) {
          maxThumbYScroll = lineR.clientHeight - thumbR.clientHeight;
        }

        let thumbCurrentTop = maxThumbYScroll*content.scrollTop/maxContentYScroll;
        if (thumbR) {
          thumbR.style.top = thumbCurrentTop + 'px';
        }
        if (thumbL) {
          thumbL.style.top = thumbCurrentTop + 'px';
        }

        // горизонтальний скрол
        let maxContentXScroll = content.scrollWidth - content.clientWidth;
        let maxThumbXScroll;

        if (lineT) {
          maxThumbXScroll = lineT.clientWidth- thumbT.clientWidth;
        } else if (lineB) {
          maxThumbXScroll = lineB.clientWidth - thumbB.clientWidth;
        }

        let thumbCurrentLeft = maxThumbXScroll*content.scrollLeft/maxContentXScroll;
        if (thumbB) {
          thumbB.style.left = thumbCurrentLeft + 'px';
        }
        if (thumbT) {
          thumbT.style.left = thumbCurrentLeft + 'px';
        }
      }
    /* ↑↑↑ /ПРОКРУТКА КОЛІЩАТКОМ МИШІ ↑↑↑ */

    /* ↓↓↓ ПРОКРУТКА ПОВЗУНКОМ ↓↓↓ */
      // Drag'n'Drop
      if ( container.querySelector('.wjs-scroll__thumb_right') ) {
        container.querySelector('.wjs-scroll__thumb_right').addEventListener('mousedown', verticalThumbScroll);
        container.querySelector('.wjs-scroll__thumb_right').ondragstart = function() {return false;};
      }
      if ( container.querySelector('.wjs-scroll__thumb_left') ) {
        container.querySelector('.wjs-scroll__thumb_left').addEventListener('mousedown', verticalThumbScroll);
        container.querySelector('.wjs-scroll__thumb_left').ondragstart = function() {return false;};
      }
      if ( container.querySelector('.wjs-scroll__thumb_top') ) {
        container.querySelector('.wjs-scroll__thumb_top').addEventListener('mousedown', gorizontalThumbScroll);
        container.querySelector('.wjs-scroll__thumb_top').ondragstart = function() {return false;};
      }
      if ( container.querySelector('.wjs-scroll__thumb_bottom') ) {
        container.querySelector('.wjs-scroll__thumb_bottom').addEventListener('mousedown', gorizontalThumbScroll);
        container.querySelector('.wjs-scroll__thumb_bottom').ondragstart = function() {return false;};
      }

      function verticalThumbScroll(event) {
        let thumb = container.querySelector('.wjs-scroll__thumb_right')
                 || container.querySelector('.wjs-scroll__thumb_left');
        let line = container.querySelector('.wjs-scroll__line_right')
                || container.querySelector('.wjs-scroll__line_left');

        event.target.closest('.wjs-scroll__wrapper').classList.add('wjs-scroll__wrapper_active-v');

        let startClientY          = event.clientY;
        let thumbStartAbsPosition = parseFloat( getComputedStyle(thumb).top );
        let thumbTopFixPosition   = thumb.getBoundingClientRect().top;
        let maxThumbScroll        = line.clientHeight - thumb.clientHeight;
        let maxContentScroll      = content.scrollHeight - content.clientHeight;

        function onMouseMove(event) {
          let shift = event.clientY - startClientY;

          let thumbCurrentAbsPosition = thumbStartAbsPosition + shift;
          if (thumbCurrentAbsPosition < 0) {
            thumbCurrentAbsPosition = 0;
          }
          if ( thumbCurrentAbsPosition > maxThumbScroll) {
            thumbCurrentAbsPosition = maxThumbScroll;
          }

          content.scrollTop = parseFloat( getComputedStyle(thumb).top )*maxContentScroll/maxThumbScroll;

          if ( container.querySelector('.wjs-scroll__thumb_right') ) {
            container.querySelector('.wjs-scroll__thumb_right').style.top = thumbCurrentAbsPosition + 'px';
          }
          if ( container.querySelector('.wjs-scroll__thumb_left') ) {
            container.querySelector('.wjs-scroll__thumb_left').style.top = thumbCurrentAbsPosition + 'px';
          }
        }

        function onMouseUp() {
          document.removeEventListener('mousemove', onMouseMove);
          thumb.onmouseup = null;
          event.target.closest('.wjs-scroll__wrapper').classList.remove('wjs-scroll__wrapper_active-v');
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }

      function gorizontalThumbScroll(event) {
        let thumb = container.querySelector('.wjs-scroll__thumb_bottom')
                 || container.querySelector('.wjs-scroll__thumb_top');
        let line = container.querySelector('.wjs-scroll__line_bottom')
                || container.querySelector('.wjs-scroll__line_top');

        event.target.closest('.wjs-scroll__wrapper').classList.add('wjs-scroll__wrapper_active-h');

        let startClientX          = event.clientX;
        let thumbStartAbsPosition = parseFloat( getComputedStyle(thumb).left );
        let thumbLeftFixPosition  = thumb.getBoundingClientRect().left;
        let maxThumbScroll        = line.clientWidth - thumb.clientWidth;
        let maxContentScroll      = content.scrollWidth - content.clientWidth;

        function onMouseMove(event) {
          let shift = event.clientX - startClientX;

          let thumbCurrentAbsPosition = thumbStartAbsPosition + shift;
          if (thumbCurrentAbsPosition < 0) {
            thumbCurrentAbsPosition = 0;
          }
          if ( thumbCurrentAbsPosition > maxThumbScroll) {
            thumbCurrentAbsPosition = maxThumbScroll;
          }

          content.scrollLeft = parseFloat( getComputedStyle(thumb).left )*maxContentScroll/maxThumbScroll;


          if ( container.querySelector('.wjs-scroll__thumb_bottom') ) {
            container.querySelector('.wjs-scroll__thumb_bottom').style.left = thumbCurrentAbsPosition + 'px';
          }
          if ( container.querySelector('.wjs-scroll__thumb_top') ) {
            container.querySelector('.wjs-scroll__thumb_top').style.left = thumbCurrentAbsPosition + 'px';
          }
        }

        function onMouseUp() {
          document.removeEventListener('mousemove', onMouseMove);
          thumb.onmouseup = null;
          event.target.closest('.wjs-scroll__wrapper').classList.remove('wjs-scroll__wrapper_active-h');
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }
    /* ↑↑↑ /ПРОКРУТКА ПОВЗУНКОМ ↑↑↑ */

    function wAddScrollLine(name) {
      let html = '\
                  <div class="wjs-scroll__wrapper wjs-scroll__wrapper_' + name + '">\
                    <div class="wjs-scroll__line wjs-scroll__line_' + name + '">\
                      <div class="wjs-scroll__thumb wjs-scroll__thumb_' + name + '"></div>\
                    </div>\
                  </div>\
                 ';
      container.insertAdjacentHTML('afterBegin', html);
    }

    function wRemoveScrollLine(name) {
      if (name == 'vertical') {
        if ( container.querySelector('.wjs-scroll__wrapper_right') ) {
          container.querySelector('.wjs-scroll__wrapper_right').remove();
        }
        if ( container.querySelector('.wjs-scroll__wrapper_left') ) {
          container.querySelector('.wjs-scroll__wrapper_left').remove();
        }
      } else if (name == 'gorizontal') {
        if ( container.querySelector('.wjs-scroll__wrapper_top') ) {
          container.querySelector('.wjs-scroll__wrapper_top').remove();
        }
        if ( container.querySelector('.wjs-scroll__wrapper_bottomleft') ) {
          container.querySelector('.wjs-scroll__wrapper_bottomleft').remove();
        }
      }
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
"use strict"; // chat-form module
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  document.addEventListener('click', function(event){
    // open form
    if ( event.target.closest('.chat-form__textarea')
         && ! document.querySelector('.chat-form__textarea_active') ) {

      let ta  = event.target.closest('.chat-form__textarea'),
          btn = ta.closest('.chat-form').querySelector('.chat-form__btn');
      ta.classList.add('chat-form__textarea_active');
      btn.classList.add('chat-form__btn_active');
      ta.focus();
      return
    }

    // close form
    if( document.querySelector('.chat-form__textarea_active')
        && !event.target.closest('.chat-form__textarea_active') ) {

      let ta  = document.querySelector('.chat-form__textarea_active'),
          btn = ta.closest('.chat-form').querySelector('.chat-form__btn');
      ta.classList.remove('chat-form__textarea_active');
      btn.classList.remove('chat-form__btn_active');
      ta.blur();
    }
  });

  // send message
  document.addEventListener('submit', function(event){
    event.preventDefault();
    if ( event.target.closest('.chat-form') ) {
      event.preventDefault();
      sendMessage(event);
    }
  });
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  async function sendMessage(event) {
    let message = event.target.querySelector('[name="chat-form-ta"]').value;

    event.target.querySelector('[name="chat-form-ta"]').value = '';

    if (message.length <= 0 || message.length > 3000) return;

    let contactID;
    if ( isSmallView() ) {
      contactID = document.querySelector('.left-side_with-subheader .subheader').dataset.id;
    } else {
      contactID = document.querySelector('[data-list="chatP"] .subheader').dataset.id;
    }

    let sendMessageRequest = await sendMessageToServer(contactID, message);
    if (sendMessageRequest.status == 200) {
      // додати повідомлення на сторінку
    } else {
      // показати попап з помилкою
      showPopupInfo('Помилка при відправці повідомлення');
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
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

    // see group members card
    if ( event.target.closest('#popupGroupList li.popup__item') ) {
      let id = event.target.closest('#popupGroupList li.popup__item').dataset.id;
      openUserCard(id);
      closePopup('popupGroupList');
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
      let el1 = document.querySelector('[data-list="groupcardP"] .user-info__name');
      if(el1) el1.innerHTML = groupName;
      let el2 = document.querySelector('[data-list="groupcardP"] .logo__name');
      if(el2) el2.innerHTML = groupName.slice(0,2).toUpperCase();

      let el3 = document.querySelector('.chat-item[data-id="' + groupID + '"] .chat-item__name');
      if(el3) el3.innerHTML = groupName;
      let el4 = document.querySelector('.chat-item[data-id="' + groupID + '"] .logo__name');
      if(el4) el4.innerHTML = groupName.slice(0,2).toUpperCase();

      showPopupInfo('changes saved successfully');
    } else {
      showPopupInfo('something went wrong with the group settings');
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
// 6127f3d2d770f515a045836f
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
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  if ( document.querySelector('[data-list="chatP"] .wjs-scroll__content') ) {
    document.querySelector('[data-list="chatP"] .wjs-scroll__content').addEventListener('scroll', function(event){
      scrollMessages();
    });
  }

  if ( document.querySelector('[data-list="chat"] .wjs-scroll__content') ) {
    document.querySelector('[data-list="chat"] .wjs-scroll__content').addEventListener('scroll', function(event){
      scrollMessages();
    });
  }
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ sockets ↓↓↓ */
  // var, а не let, бо socket використовується в багатьох місцях коду.
  var socket = io();

  socket.on('contactLogin', contactID => {
    toggleContactStatus(contactID, 'on');
  });

  socket.on('contactLogout', contactID => {
    toggleContactStatus(contactID, 'off');
  });

  socket.on('message', msg => {
    handleMessage(msg)
  });

  socket.on('msgStatus', msg => {
    makeMessageStatusRead(msg)
  });
/* ↑↑↑ sockets ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  /**
   * [toggleContactStatus змінює візуалізацію статусу контакта (червона/зелена
   * пімпочка біля іконки)]
   * @param  {[String]} contactID [ідентифікатор контакту]
   * @param  {[String]} status    [on/off]
   */
  function toggleContactStatus(contactID, status) {
    if ( !document.querySelector('.contact-list .contact-item[data-id="' + contactID + '"]') ) return;
    let statusMarker = document.querySelector('.contact-list .contact-item[data-id="' + contactID + '"]  .logo__status');

    if (status == 'on') {
      statusMarker.classList.remove('logo__status_offline');
      statusMarker.classList.add('logo__status_online');
    } else if (status == 'off') {
      statusMarker.classList.remove('logo__status_online');
      statusMarker.classList.add('logo__status_offline');
    }
  }

  /**
   * [handleMessage обробляє подію сокета "вхідне повідомлення"]
   * @param  {[Object]} msg [об'єкт з параметрами для побудови html повідомлення
   * для моночатів:
   * {datatime  : 1633637202888,
   *  who       : "6128f4b586b0640204c57ed9",
   *  whoImgSrc : "img/users/6127f48dd770f515a0458394.jpg",
   *  whoName   : "name",
   *  whom      : "6127f48dd770f515a0458394",
   *  message   : "text",
   *  status    : "delivered"
   * }
   *  для групового чату:
   *  {datatime  : 1633637326955,
   *   who       : "6128f4b586b0640204c57ed9",
   *   whoImgSrc : "img/users/6127f48dd770f515a0458394.jpg",
   *   whoName   : "name",
   *   message   : "text",
   *   group     : "61531b750eb6f027ac74b35c"
   *  }]
   */
  function handleMessage(msg) {
    let userID = document.querySelector('.header__info .header__subheader').innerHTML.slice(1),
        chatID = msg.group || msg.who;

    if(userID == msg.who) {
      // own message
      addMessageToChat(msg, 'outgoing');

      if ( !isUnreadMessageExist() ) {
        scrollChatToBottom();
      }

      if ( isChatListOpen() ) {
        let id = msg.whom || msg.group;
        addMetaToList(id, msg.message, msg.datatime);
        if (!msg.group) {
          setMetaStatus(msg.whom, 'delivered');
        }
      }
    } else {
      // incoming message
      if( isChatAreaOpen() && getChatID() == chatID ) {

        if ( isUnreadMessageExist() ) {
          addMessageToChat(msg, 'incoming');

          if ( isChatListOpen() ) {
            addMetaToList(chatID, msg.message, msg.datatime);
            increaseBadge(chatID);
            if (!msg.group) {
              setMetaStatus(msg.who, 'delivered');
            }
          }
        } else {
          addMessageToChat(msg, 'incoming');
          let msgDOM = document.querySelector('.chat-list__item_received[data-id="' + msg.who + '"][data-msgid="' + msg.datatime + '"]');
          // makeMessageRead(msgDOM); після додавання обробника на onscroll тут
          // виклик функції став не потрібен, бо інакше відбувається подвоєння
          // запиту до бази даних і помилка вірсіонування
          scrollChatToBottom();

          if ( isChatListOpen() ) {
            addMetaToList(chatID, msg.message, msg.datatime);
            if (!msg.group) {
              setMetaStatus(msg.who, 'read');
            }
          }
        }
      } else {
        if ( isChatListOpen() ) {
          addMetaToList(chatID, msg.message, msg.datatime);
          increaseBadge(chatID);
          if (!msg.group) {
            setMetaStatus(msg.who, 'delivered');
          }
        }
      }
    }
  }

  /**
   * [isChatListOpen визначає, чи список чатів активний]
   * @return {Boolean} [результат перевірки]
   */
  function isChatListOpen() {
    return document.querySelector('[data-list="chatlist"]').classList.contains('list_active');
  }

  /**
   * [isChatAreaOpen визначає, чи область переписки видима]
   * @return {Boolean/DOM-Object} [false, якщо область не видима, або
   * DOM-object, якщо область видима]
   */
  function isChatAreaOpen() {
    let list_small = document.querySelector('.list_active[data-list="chat"]');
    if (list_small) return list_small;

    let list_big = document.querySelector('.list_active[data-list="chatP"]');
    if (list_big) return list_big

    return false
  }

  /**
   * [getChatID повертає ідентифікатор відкритої розмови]
   * @return {[String/Boolean]} [ідентифікатор відкритої розмови або false]
   */
  function getChatID() {
    let list = document.querySelector('.list_active ul.chat-list[data-chatid]');
    if (!list) return false;
    return list.dataset.chatid;
  }

  function getUserID() {
    return document.querySelector('.header__subheader').innerHTML.slice(1);
  }

  /**
   * [isUnreadMessageExist перевірка наявності не прочитаних повідомленнях]
   * @return {Boolean} [результат перевірки]
   */
  function isUnreadMessageExist() {
    let message;
    if ( isSmallView() ) {
      message = document.querySelector('[data-list="chat"] .chat-list__item_received[data-status="delivered"]');
    } else {
      message = document.querySelector('[data-list="chatP"] .chat-list__item_received[data-status="delivered"]');
    }

    if (message) {
      return true
    } else {
      return false
    }
  }

  /**
   * [isMessageHidden визначає, чи дане повідомлення знаходиться в зоні
   * видимості]
   * @param  {[DOM-node]} elem [повідомлення]
   * @return {Boolean}         [результат перевірки]
   */
  function isMessageHidden(elem) {

    let w        = elem.closest('.wjs-scroll__content'),
        ww       = elem.closest('.wjs-scroll__content-wrapper'),
        wTop     = w.getBoundingClientRect().top,
        wHeight  = ww.scrollHeight,
        elTop    = elem.getBoundingClientRect().top,
        elHeight = elem.scrollHeight;

    return (elTop > wHeight + wTop - elHeight)
  }

  /**
   * [increaseBadge збільшення лічильника повідомлень]
   * @param  {[String]} id [ідентифікатор розмови]
   */
  function increaseBadge(id) {
    let badge = document.querySelector('.chat-item[data-id="' + id + '"] .chat-item__badge');
    if (!badge) return;

    let count = +badge.innerHTML || 0;
    count = count + 1;

    badge.innerHTML = count;
    badge.classList.add('chat-item__badge_active');
  }

  /**
   * [increaseBadge зменшення лічильника повідомлень]
   * @param  {[String]} id [ідентифікатор розмови]
   */
  function decreaseBadge(id) {
    let badge = document.querySelector('.chat-item[data-id="' + id + '"] .chat-item__badge');
    if (!badge) return;

    let count = +badge.innerHTML || 0;
    count = count - 1;

    badge.innerHTML = count;
    if (count <= 0) {
      badge.innerHTML = '';
      badge.classList.remove('chat-item__badge_active');
    }
  }

  /**
   * [addMetaToList додає метадані в список чатів]
   * @param {[String]} id   [ідентифікатор розмови]
   * @param {[String]} text [текст останнього повідомлення в розмові]
   * @param {[Number]} date [час останнього повідомлення у мілісекундах]
   */
  function addMetaToList(id, text, date) {
    let listItemMessage = document.querySelector('.chat-item[data-id="' + id + '"] .chat-item__message'),
        listItemDate    = document.querySelector('.chat-item[data-id="' + id + '"] .chat-item__date');

    let dateObj = new Date(date),
        dd      = dateObj.getUTCDate(),
        mm      = dateObj.getUTCMonth() + 1,
        yy      = String(dateObj.getUTCFullYear()).slice(2);

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    let dateStr = dd + '.' + mm + '.' + yy;

    listItemDate.innerHTML = dateStr;
    listItemMessage.innerHTML = text;
  }

  /**
   * [addMessageToChat додає html-код повідомлення в кінець чату]
   * @param {[Object]} msg  [дані для побудови html повідомлення]
   * @param {[String]} type [тип повідомлення (вхідне/вихідне)]
   */
  function addMessageToChat(msg, type) {

    let date = new Date(msg.datatime),
        hh   = date.getUTCHours(),
        mm   = date.getMinutes();
    if (hh < 10) {
      hh = '0' + hh
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    let time = hh + ':' + mm;

    let html;
    if (type == 'incoming') {
      html = '\
              <li class="chat-list__item chat-list__item_received" data-id="' + msg.who + '" data-status="delivered" data-msgid="' + msg.datatime + '">\
                <div class="logo">\
                  <p class="logo__name">' + msg.whoName.toUpperCase().slice(0,2) + '</p>\
                  <img class="logo__img" src="' + msg.whoImgSrc + '">\
                </div>\
                <div class="chat-list__message">\
                  <div class="chat-list__message-text">' + msg.message + '</div>\
                  <div class="chat-list__message-date">' + time + '</div>\
                </div>\
              </li>\
            ';
    } else if (type == 'outgoing') {
      html = '\
        <li class="chat-list__item chat-list__item_sent" data-id="' + msg.who + '" data-msgid="' + msg.datatime + '">\
         <div class="logo">\
           <p class="logo__name">' + msg.whoName.toUpperCase().slice(0,2) + '</p>\
           <img class="logo__img" src="' + msg.whoImgSrc + '">\
         </div>\
         <div class="chat-list__message">\
           <div class="chat-list__message-text">' + msg.message + '</div>\
           <div class="chat-list__message-date">' + time + '</div>\
           <div class="message-status message-status_delivered">\
             <i class="ico">N</i>\
             <i class="ico">N</i>\
           </div>\
         </div>\
        </li>\
      ';
    }

    let list = isChatAreaOpen();
    if ( !list ) return
    list.querySelector('.chat-list').insertAdjacentHTML('beforeEnd', html);
  }

  /**
   * [makeMessageRead звертається до бд і змінює статус повідомлення, якщо ок,
   * змінює data-атрибут в html повідомлення]
   * @param  {[DOM-node]} msg [html повідомлення]
   */
  async function makeMessageRead(msg) {
    let contactID = msg.closest('ul.chat-list').dataset.chatid,
        messageID = msg.dataset.msgid;


    let changeMessageStatusRequest = await changeMessageStatus(contactID, messageID);
    if (changeMessageStatusRequest.status == 200) {
      // ok
      msg.setAttribute('data-status','read');

    } else {
      // not ok ;-)
    }
  }

  /**
   * [scrollChatToBottom прокручує область чату до самого низу]
   */
  function scrollChatToBottom() {
    // big list
    let bListPage = document.querySelector('.list_active[data-list="chatP"]');
    if ( bListPage ) {
      wSetScroll(document.querySelector('[data-list="chatP"] .chat-wrapper'), {right:true, overflowXHidden:true});
      let scrolledEl = document.querySelector('[data-list="chatP"] .chat-wrapper .wjs-scroll__content');
      scrolledEl.scrollTop = scrolledEl.scrollHeight;
    }
    // small list
    let sListPage = document.querySelector('.list_active[data-list="chat"]');
    if ( sListPage ) {
      wSetScroll(document.querySelector('.left-side_with-subheader .lists-wrapper.wjs-scroll'), {right:true, overflowXHidden:true});
      let scrolledEl = document.querySelector('.left-side_with-subheader .lists-wrapper.wjs-scroll .wjs-scroll__content');
      scrolledEl.scrollTop = scrolledEl.scrollHeight;
    }

    if ( document.querySelector('.round-btn_active') ) {
      document.querySelector('.round-btn').classList.remove('round-btn_active');
    }
  }

  /**
   * [getUnreadMessagesNodesArr повертає масив непрочитаних повідомлень у
   * форматі DOM-вузлів]
   * @return {[Array]} [масив DOM-елементів, непрочитані повідомлення]
   */
  function getUnreadMessagesNodesArr() {
    let unreadMessageArr = [];

    if ( isSmallView() ) {
      unreadMessageArr = document.querySelectorAll('[data-list="chat"] .chat-list__item_received[data-status="delivered"]');
    } else {
      unreadMessageArr = document.querySelectorAll('[data-list="chatP"] .chat-list__item_received[data-status="delivered"]');
    }

    return unreadMessageArr;
  }

  /**
   * [handleMessagesList під час відкриття чату перевіряє наявність не
   * прочитаних повідомлень і відповідає за прокрутку]
   */
  async function handleMessagesList() {

    if ( isUnreadMessageExist() ) {

      let chatID = getChatID();

      let unreadMessageArr = getUnreadMessagesNodesArr();
      for (let i = 0; i < unreadMessageArr.length; i++) {
        let msg = unreadMessageArr[i];
        if ( isMessageHidden(msg) ) {
          await makeMessageRead(msg);
          msg.scrollIntoView({behavior: 'smooth', block: 'end'});
          if (isChatListOpen()) {
            decreaseBadge(chatID);
          }
          // if ( isUnreadMessageExist() ) {
          //   showScrollButton();
          // } else {
          //   hideScrollButton();
          // }
          return
        } else {
          await makeMessageRead(msg);
          if (isChatListOpen()) {
            decreaseBadge(chatID);
          }
        }
      }
      // hideScrollButton();
    } else {
      scrollChatToBottom();
      // hideScrollButton();
    }
  }

  /**
   * [scrollMessages робить видимі не прочитані повідомлення прочитаними]
   */
  async function scrollMessages() {

    // це перевірка на запуск функції: подія onscroll виникає так часто, що код
    // не встигає виконатися, як запускається наново, через це були помилки на
    // сервері при зверненні до бази даних. Щоб цього уникнути, потрібно зробити
    // так, щоб у кожен момент часу виконувалася одна функція, без повторів.
    // Є теоретичний ньюанс: якщо буде дуже багато повідомлень і швидко
    // проскролити, можливо повідомлення проскочить область видимості і знову
    // стане не видимим. Я цього не перевіряв, але якщо така хиба раптом вилізе,
    // треба буде робити розбивку циклів: спочатку перевіряти на видимість, а
    // лише потім робити звернення до бд і змінювати статус.
    if (scrollMessages.isNowAtWork) {
      return
    } else {
      scrollMessages.isNowAtWork = true;

      if ( isUnreadMessageExist() ) {
        let unreadMessageArr = getUnreadMessagesNodesArr();
        for (let i = 0; i < unreadMessageArr.length; i++) {
          let msg = unreadMessageArr[i];
          if ( isMessageHidden(msg) ) {
            // showScrollButton();
            scrollMessages.isNowAtWork = false;
            return
          } else {
            await makeMessageRead(msg);
            if ( isChatListOpen() ) {
              decreaseBadge( getChatID() );
            }
          }
        }
      }
      scrollMessages.isNowAtWork = false;
    }
  }

  /**
   * [setMetaStatus змінює статус прочитання повідомлення у списку чатів
   * (пташки)]
   * @param {[String]} chatID [ідентифікатор чату]
   * @param {[String]} status [статус прочитання повідомлення]
   */
  function setMetaStatus(chatID, status) {
    let statusMarker = document.querySelector('.chat-item[data-id="' + chatID + '"] .message-status');
    statusMarker.className = 'message-status message-status_' + status;
  }

  function makeMessageStatusRead(msgData) {
    if( getUserID() == msgData.contact ) return;

    let chatID = msgData.contact;

    let msgNode;
    if ( isSmallView() && getChatID == chatID ) {
      msgNode = document.querySelector('[data-list="chat"] .chat-list__item_sent[data-msgid="' + msgData.messageID + '"]');
    } else {
      msgNode = document.querySelector('[data-list="chatP"] .chat-list__item_sent[data-msgid="' + msgData.messageID + '"]');
    }

    if (msgNode) {
      msgNode.setAttribute('data-status', 'read');
      let checks = msgNode.querySelector('.message-status');
      if (checks) {
        checks.className = 'message-status message-status_read';
      }
    }

    if ( isChatListOpen() ) {
      let readMarker = document.querySelector('[data-list="chatlist"] .chat-item[data-id="' + chatID + '"] .message-status');
      readMarker.className = 'message-status message-status_read';
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
"use strict"; // forms.js
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  document.addEventListener('click', async function(event) {
    if ( event.target.closest('form[name="loginForm"] button[type="submit"]') ) {
      event.preventDefault();
      formValidation();
      return
    }

    // toggle password visibility
    if ( event.target.closest('#popupChangePass .popup__pass-wrapper i.ico') ) {
      let inputWrapper = event.target.closest('.popup__pass-wrapper');
      toggleInputVisibility(inputWrapper);
    }

    // logout
    if ( event.target.closest('#popupLogout button[type="submit"]') ) {
      let logoutRequest = await logoutUser();
      if (logoutRequest.status == 200) {
        socket.emit('logout');
        document.querySelector('body').innerHTML = logoutRequest.html;
        document.querySelector('head title').innerHTML = 'Login';
        wSetScroll(document.querySelector('.login-main__inner'), {right:true, overflowXHidden:true});

        // перезавантаження сторінки потрібно для оновлення сесії, інакше при
        // повторному логіні не авторизується сокет (видає помилку, що нема сесії)
        window.location.href = location.href;
      } else {
        window.location.href = 'about:blank';
      }
    }

    // delete account
    if ( event.target.closest('#popupDeleteAcc button[type="submit"]') ) {
      event.preventDefault();
      let deleteRequest = await deleteUser();
      if (deleteRequest.status == 200) {
        document.querySelector('body').innerHTML = deleteRequest.html;
        wSetScroll(document.querySelector('.login-main__inner'), {right:true, overflowXHidden:true});
      } else {
        window.location.href = 'about:blank';
      }
    }

    // change password
    if ( event.target.closest('#popupChangePass button[type="submit"]') ) {
      event.preventDefault();
      let oldPass  = document.querySelectorAll('#popupChangePass .popup__pass-wrapper input')[0].value || '',
          newPass1 = document.querySelectorAll('#popupChangePass .popup__pass-wrapper input')[1].value || '',
          newPass2 = document.querySelectorAll('#popupChangePass .popup__pass-wrapper input')[2].value || '';

      let checkOldPassRequest = await checkOldPass(oldPass);
      if (checkOldPassRequest.status == 200) {
        if(checkOldPassRequest.result != 'true') {
          // wrond pass
          showPopupError('popupChangePass', 0);
          return
        }
      } else {
        // error DB?
        showPopupError('popupChangePass', 3);
        return
      }

      if (newPass1.length < 6) {
        showPopupError('popupChangePass', 1);
        return
      }
      if (newPass1 != newPass2) {
        showPopupError('popupChangePass', 2);
        return
      }

      if ( document.querySelector('#popupChangePass .popup__message_active') ) return;

      let changePassRequest = await changePass(newPass2);
      if (changePassRequest.status == 500) {
        // error DB?
        showPopupError('popupChangePass', 3);
      } else if (changePassRequest.status == 200) {
        closePopup('popupChangePass');
        showPopupInfo('Пароль успішно змінено');
      }
    }

    // change username
    if ( event.target.closest('#popupChangeName button[type="submit"]') ) {
      event.preventDefault();
      let newLogin = document.querySelector('#changeUserNameForm input[name="name"]').value;

      if (!newLogin || newLogin.lengtn < 3) {
        showPopupError('popupChangeName', 0);
        return
      }

      let changeNameRequest = await changeName(newLogin);
      if (changeNameRequest.status == 500) {
        // error DB?
        showPopupError('popupChangeName', 2);
      } else if (changeNameRequest.status == 200) {
        closePopup('popupChangeName');
        showPopupInfo('Ім\'я успішно змінено');
        document.querySelector('h1.header__header').textContent = newLogin;
      }
    }

    // change avatar
    if ( event.target.closest('#popupChangeAva button[type="submit"]') ) {
      event.preventDefault();
      let input = document.querySelector('#popupChangeAva input[type="file"]');

      if (!input.files[0]) {
        // файл не обрано
        showPopupError('popupChangeAva', 0);
        return
      }

      let image = input.files[0];

      if (image.type != 'image/png' && image.type != 'image/jpeg') {
        // не підходящий mime-тип файлу
        showPopupError('popupChangeAva', 1);
        return
      }

      if (image.size > 5242880) {
        // розмір більше 5мб
        showPopupError('popupChangeAva', 2);
        return
      }

      // така милиця, що просто жах. Причому, якщо активна карточка групи і зліва список налаштувань, буде конфлікт
      let groupID;
      if ( document.querySelector('[data-list="groupcardP"]').classList.contains('list_active') ) {
        groupID = document.querySelector('[data-list="groupcardP"] .user-info__id').innerHTML.slice(1);
      } else if (document.querySelector('[data-list="groupcard"]').classList.contains('list_active') ) {
        groupID = document.querySelector('[data-list="groupcard"] .user-info__id').innerHTML.slice(1);
      }

      let changeAvaRequest = await changeAva(groupID);
      if (changeAvaRequest.status == 500) {
        // error DB?
        showPopupError('popupChangeAva', 2);
      } else if (changeAvaRequest.status == 200) {
        closePopup('popupChangeAva');
        showPopupInfo('Аватарку успішно змінено');
        if (groupID) {
          document.querySelector('[data-list="groupcardP"] .logo__img').setAttribute('src', userConfig.pathToUserLogo + changeAvaRequest.filename + '?v=' + Date.now());
          document.querySelector('[data-list="groupcard"] .logo__img').setAttribute('src', userConfig.pathToUserLogo + changeAvaRequest.filename + '?v=' + Date.now());
          document.querySelector('[data-list="chatlist"] [data-id="' + groupID + '"] .logo__img').setAttribute('src', userConfig.pathToUserLogo + changeAvaRequest.filename + '?v=' + Date.now());
        } else {
          document.querySelector('.header .logo__img').setAttribute('src', userConfig.pathToUserLogo + changeAvaRequest.filename + '?v=' + Date.now());
        }
      }
    }
  });

  document.addEventListener('input', async function(event){

    // check inputs in login/regster form
    if (event.target.name == 'name' && event.target.closest('[name="loginForm"]') ) {
      checkInpName();
    }
    if (event.target.name == 'pass1') {
      checkInpPass();
    }
    if (event.target.name == 'pass2') {
      checkInpRepP();
    }

    // check change password inputs
    if ( event.target.closest('#popupChangePass [name="oldPass"]') ) {
      let password = event.target.closest('#popupChangePass [name="oldPass"]').value;
      if (password.length >=6) {
        let checkOldPassRequest = await checkOldPass(password);
        if (checkOldPassRequest.status == 500) {
          // error DB?
          showPopupError('popupChangePass', 3);
        } else if (checkOldPassRequest.status == 200) {
          if(checkOldPassRequest.result == 'true') {
            // correct pass
            hidePopupError('popupChangePass');
          } else if (checkOldPassRequest.result == 'false') {
            // wrond pass
            showPopupError('popupChangePass', 0);
          }
        }
      }
    }
    if ( event.target.closest('#changePass_new') ) {
      let value = event.target.closest('#changePass_new').value;
      if (value.length >= 6) {
        hidePopupError('popupChangePass', 1);
      }
    }
    if ( event.target.closest('#changePass_repeat') ) {
      let value1 = document.querySelector('#changePass_new').value,
          value2 = event.target.closest('#changePass_repeat').value;
      if (value1 == value2) {
        hidePopupError('popupChangePass', 2);
      }
    }

    // check change name input
    if (event.target.name == 'name' && event.target.closest('#changeUserNameForm')) {

      let input     = event.target,
          newLogin  = input.value,
          submitBtn = input.closest('#popupChangeName').querySelector('[form="changeUserNameForm"]');
      // перевірка зайнятості логіна
      if (newLogin.length >= 3 ) {

        let loginStatus = await isLoginFree(newLogin);
        if (loginStatus) {
          submitBtn.setAttribute('type','submit');
          hidePopupError('popupChangeName')
        } else if (loginStatus == false) {
          submitBtn.setAttribute('type','button');
          showPopupError('popupChangeName', 1)
        } else {
          // error DB?
          showPopupError('popupChangeName', 2)
        }
      }
    }

    // check file input (avatar img)
    if (event.target.name == "ava" && event.target.closest('#popupChangeAva') ) {
      let input = event.target;
      if (input.files[0]) {
        hidePopupError('popupChangeAva', 0);
      }

      let image = input.files[0];
      if (image.type == 'image/png' || image.type == 'image/jpeg') {
        hidePopupError('popupChangeAva', 1);
      }

      if (image.size <= 5242880) {
        hidePopupError('popupChangeAva', 2);
      }
    }
  });
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  async function showError(elem,text) {
    if (elem.clientHeight != 0) {
      elem.querySelector('span').innerText = text;
    } else {
      let height = 0;

      new Promise( (resolve, reject) => {
        elem.querySelector('span').innerText = text;
        elem.style.height = 'auto';
        height = elem.clientHeight + 20;
        elem.style.height = 0;
        resolve();
      }).then( () => {
        elem.style.height = height + 'px';
        elem.style.padding = '10px';
        elem.style.marginBottom = '10px';
      });
    }
  }

  function hideError(elem) {
    elem.style.height = 0;
    elem.style.paddingTop = 0;
    elem.style.paddingBottom = 0;
    elem.style.marginBottom = 0;
    elem.querySelector('span').innerText = '';
  }

  function hideAllErrors() {
    let errors = document.querySelectorAll('.error-info');
    errors.forEach( elem => hideError(elem) );
  }

  function showPopupError(popupId, messageNumber) {
    let popup    = document.getElementById(popupId),
        messages = popup.querySelectorAll('.popup__message'),
        message  = messages[messageNumber];

    message.className = 'popup__message popup__message_active popup__message_error';
  }

  function hidePopupError(popupId) {
    let popup    = document.getElementById(popupId),
        messages = popup.querySelectorAll('.popup__message');
    messages.forEach(message => {
      message.classList.remove('popup__message_active');
    });
  }

  function formValidation() {
    let lang     = document.querySelector('html').getAttribute('lang'),
        form     = document.forms.loginForm,
        formType = form.dataset.action,
        inpName  = form.querySelector('input[name="name"]'),
        inpPass  = form.querySelector('input[name="pass1"]'),
        inpRepP  = form.querySelector('input[name="pass2"]'),
        errors   = document.querySelectorAll('.error-info');

    // нема імені
    if (!inpName.value) {
      showError(errors[0], dictionary.login[lang]);
      inpName.focus();
      return;
    }

    // которке ім'я
    if ( inpName.value.length < 3 ) {
      showError(errors[0], dictionary.loginLength[lang]);
      inpName.focus();
      return;
    }

    // нема паролю
    if (!inpPass.value) {
      showError(errors[1], dictionary.password[lang]);
      inpPass.focus();
      return;
    }

    // которкий пароль
    if ( inpPass.value.length < 6 ) {
      showError(errors[1], dictionary.passLength[lang]);
      inpPass.focus();
      return;
    }

    // повторення паролю при реєстрації
    if ( formType == 'api/authorization/register' && !inpRepP.value ) {
      showError(errors[2], dictionary.repeat[lang]);
      inpRepP.focus();
      return;
    }

    // однаковість паролів
    if ( formType == 'api/authorization/register' && inpRepP.value != inpPass.value) {
      showError(errors[2], dictionary.notMatch[lang]);
      inpRepP.focus();
      return;
    }

    sendRegistrationData();
  }

  async function checkInpName() {
    let value     = document.querySelector('input[name="name"]').value,
        errors    = document.querySelectorAll('.error-info'),
        lang      = document.querySelector('html').getAttribute('lang'),
        form      = document.forms.loginForm,
        submitBtn = form.querySelector('#submitBtn'),
        formType  = form.dataset.action;
    // сервер: нема такого користувача
    if (value
        && (errors[0].querySelector('span').innerText == dictionary.noUser[lang]
            || errors[2].querySelector('span').innerText == dictionary.serverError[lang]) ) {
      hideError(errors[0]);
    }

    // нема імені
    if (value
        && errors[0].querySelector('span').innerText == dictionary.login[lang]
      ) {
      hideError(errors[0]);
      return;
    }

    // которке ім'я
    if (value.length >= 3
        && errors[0].querySelector('span').innerText == dictionary.loginLength[lang]
      ) {
      hideError(errors[0]);
      return;
    }

    // перевірка зайнятості логіна
    if (formType == 'api/authorization/register' && value.length >= 3 ) {

      let loginStatus = await isLoginFree(value);
      if (loginStatus) {
        hideError(errors[0]);
        submitBtn.setAttribute('type','submit');
      } else if (loginStatus == false) {
        showError(errors[0], dictionary.loginIsUsed[lang]);
        submitBtn.setAttribute('type','button');
      } else {
        // error DB?
        showError(errors[2], dictionary.serverError[lang]);
      }
    }
  }

  function checkInpPass() {
    let value  = document.querySelector('input[name="pass1"]').value,
        errors = document.querySelectorAll('.error-info'),
        lang   = document.querySelector('html').getAttribute('lang');

    // сервер: не вірний пароль
    if (value
        && errors[1].querySelector('span').innerText == dictionary.wrongPass[lang]
      ) {
      hideError(errors[1]);
      return;
    }

    // нема паролю
    if (value
        && errors[1].querySelector('span').innerText == dictionary.password[lang]
      ) {
      hideError(errors[1]);
      return;
    }

    // которкий пароль
    if (value.length >= 6
        && errors[1].querySelector('span').innerText == dictionary.passLength[lang]
      ) {
      hideError(errors[1]);
      return;
    }
  }

  function checkInpRepP() {
    let value1 = document.querySelector('input[name="pass1"]').value,
        value2 = document.querySelector('input[name="pass2"]').value,
        errors = document.querySelectorAll('.error-info'),
        lang   = document.querySelector('html').getAttribute('lang');

    // повторення паролю при реєстрації
    if (value2
        && errors[2].querySelector('span').innerText == dictionary.repeat[lang]
      ) {
      hideError(errors[2]);
      return;
    }

    // однаковість паролів
    if (value2 == value1
        && errors[2].querySelector('span').innerText == dictionary.notMatch[lang]
      ) {
      hideError(errors[2]);
      return;
    }
  }

  async function sendRegistrationData() {
    const form   = document.forms.loginForm,
          url    = form.dataset.action,
          lang   = form.querySelector('input[name="lang"]').value,
          name   = form.querySelector('input[name="name"]').value,
          pass   = form.querySelector('input[name="pass1"]').value,
          errors = document.querySelectorAll('.error-info');

    let user = {name,pass};

    if (url == 'api/authorization/register') {
      user.lang = lang;

      let registerResult = await registerUser(user);
      if (registerResult.status == 200) {
        document.querySelector('body').innerHTML = registerResult.html;
        document.querySelector('head title').innerHTML = 'My-cha-cha :-)';
        showContactsList();
        wSetScroll(document.querySelector('.left-side .lists-wrapper'), {right:true, overflowXHidden:true});
        socket.emit('login');
      } else if (registerResult.status == 500) {
        // error DB?
        showError(errors[2], dictionary.serverError[lang]);
      } else if (registerResult.status == 404) {
        showError(errors[0], dictionary.noUser[lang]);
      } else if (registerResult.status == 403) {
        // не вірний пароль
        showError(errors[1], dictionary.wrongPass[lang]);
      } else {
        // unknown error
        showError(errors[2], dictionary.serverError[lang]);
      }
    } else if (url == 'api/authorization/login') {

      let loginResult = await loginUser(user);
      if (loginResult.status == 200) {
        document.querySelector('body').innerHTML = loginResult.html;
        document.querySelector('head title').innerHTML = 'My-cha-cha :-)';
        showContactsList();
        wSetScroll(document.querySelector('.left-side .lists-wrapper'), {right:true, overflowXHidden:true});
        socket.emit('login');
      } else if (loginResult.status == 500) {
        // error DB?
        showError(errors[2], dictionary.serverError[lang]);
      } else if (loginResult.status == 404) {
        showError(errors[0], dictionary.noUser[lang]);
      } else if (loginResult.status == 403) {
        // не вірний пароль
        showError(errors[1], dictionary.wrongPass[lang]);
      } else {
        // unknown error
        showError(errors[2], dictionary.serverError[lang]);
      }
    }
  }

  function toggleInputVisibility(inputWrapper) {
    if ( inputWrapper.classList.contains('popup__pass-wrapper_hidden') ) {
      inputWrapper.classList.remove('popup__pass-wrapper_hidden');
      inputWrapper.classList.add('popup__pass-wrapper_shown');
      inputWrapper.querySelector('input').setAttribute('type','text');
    } else if ( inputWrapper.classList.contains('popup__pass-wrapper_shown') ) {
      inputWrapper.classList.remove('popup__pass-wrapper_shown');
      inputWrapper.classList.add('popup__pass-wrapper_hidden');
      inputWrapper.querySelector('input').setAttribute('type','password');
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
"use strict"; // login.js
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  document.addEventListener('click', function(event) {
    // переключення на вкладку "вхід"
    if ( event.target.closest('[data-role="login"]') ) {
      document.querySelector('[data-role="login"]').classList.add('login-header__link_active');
      document.querySelector('[data-role="register"]').classList.remove('login-header__link_active');
      document.querySelector('main.login-main h5:first-of-type').style.display = 'block';
      document.querySelector('main.login-main h5:last-of-type').style.display = 'none';
      document.forms.loginForm.setAttribute('data-action','api/authorization/login');
      document.forms.loginForm.reset();
      document.querySelector('input[name="pass2"]').style.display = 'none';
      document.querySelector('head title').innerHTML = 'Login';
      hideAllErrors();
    }
    // переключення на вкладку "реєстрація"
    if ( event.target.closest('[data-role="register"]') ) {
      document.querySelector('[data-role="register"]').classList.add('login-header__link_active');
      document.querySelector('[data-role="login"]').classList.remove('login-header__link_active');
      document.querySelector('main.login-main h5:first-of-type').style.display = 'none';
      document.querySelector('main.login-main h5:last-of-type').style.display = 'block';
      document.forms.loginForm.setAttribute('data-action','api/authorization/register');
      document.forms.loginForm.reset();
      document.querySelector('input[name="pass2"]').style.display = 'block';
      document.querySelector('head title').innerHTML = 'Registration';
      hideAllErrors();
    }

    // перемикання мови
    if ( document.querySelector('.lang-switcher') ) {
      if ( event.target.closest('.lang-switcher') ) {
        let ls = event.target.closest('.lang-switcher');
        ls.classList.toggle('lang-switcher_active');
      }
      if ( !event.target.closest('.lang-switcher')
           && document.querySelector('.lang-switcher').classList.contains('lang-switcher_active') ) {
        document.querySelector('.lang-switcher').classList.remove('lang-switcher_active')
      }
      if ( event.target.closest('.lang-switcher__list-item') ) {
        let lang = event.target.closest('.lang-switcher__list-item').dataset.lang;
        changePageLang(lang);
      }
    }
  });
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  function changePageLang(lang) {
    let currentLang = document.querySelector('html').getAttribute('lang') || 'ua';
    if (lang == currentLang) return;

    let currentImg = document.querySelector('.lang-switcher > .lang-switcher__img-wrapper > .lang-switcher__img');
    let html = document.querySelector('html');
    if (lang == "ua") {
      currentImg.setAttribute('src','../img/ukraine.png');
      html.setAttribute('lang', 'ua');
    } else {
      currentImg.setAttribute('src','../img/united_kingdom.png');
      html.setAttribute('lang', 'en');
    }

    let translatedArr = document.querySelectorAll('[data-translate]');
    translatedArr.forEach(item=>{
      let attr = item.dataset.translate;
      item.innerText = dictionary[attr][lang];
    });

    let form = document.forms.loginForm;
    form.name.setAttribute('placeholder', dictionary.phname[lang]);
    form.pass1.setAttribute('placeholder', dictionary.phpass1[lang]);
    form.pass2.setAttribute('placeholder', dictionary.phpass2[lang]);
    form.lang.value = lang;

    hideAllErrors();
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
"use strict"; // main.js
////////////////////////////////////////////////////////////////////////////////
if( document.querySelector('.left-side')) {
  showContactsList();
}
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ event listeners ↓↓↓ */
  document.addEventListener('click', function(event){

    // toggle lef-side menus
    if ( event.target.closest('[data-target-group]') ) {
      let elem   = event.target.closest('[data-target-group]'),
          group  = elem.dataset.targetGroup,
          target = elem.dataset.target;
      showMenuItem(group, target);
    }

    // open mono chat (contactlist)
    if ( event.target.closest('.contact-item__name') ) {
      let contactId = event.target.closest('.contact-item').dataset.id;
      openChat(contactId, 'mono');
    }

    // open usercard (contactlist)
    if ( event.target.closest('.logo')
         && event.target.closest('.contact-item') ) {
      let id = event.target.closest('.contact-item').dataset.id;
      openUserCard(id);
    }

    // open group chat / mono chat (chatlist)
    if ( !event.target.closest('.logo')
         && event.target.closest('.chat-item') ) {
      let chatId  = event.target.closest('.chat-item').dataset.id,
          isGroup = event.target.closest('.chat-item').dataset.group;
      if (isGroup == 'true') {
        openChat(chatId, 'group');
      } else {
        openChat(chatId, 'mono');
      }
    }

    // open groupcard / usercard (chatlist)
    if ( event.target.closest('.logo')
         && event.target.closest('.chat-item') ) {
      let id      = event.target.closest('.chat-item').dataset.id,
          isGroup = event.target.closest('.chat-item').dataset.group;
      if (isGroup == 'true') {
        openGroupCard(id);
      } else {
        openUserCard(id);
      }
    }

    // open usercard (chat)
    if ( event.target.closest('.logo')
         && event.target.closest('.chat-list__item_received') ) {
      let id = event.target.closest('.chat-list__item_received').dataset.id;
      openUserCard(id);
    }

    // open groupcard / usercard (subheader)
    if ( event.target.closest('.subheader') ) {
      let id      = event.target.closest('.subheader').dataset.id,
          isGroup = event.target.closest('.subheader').dataset.group;
      if (isGroup == 'true') {
        openGroupCard(id);
      } else {
        openUserCard(id);
      }
    }

    // open mono chat
    if (event.target.closest('.round-btn[data-group="false"]')) {
      let contactId = event.target.closest('.round-btn[data-group="false"]').dataset.id;
      openChat(contactId, 'mono');
    }

    // open group chat
    if (event.target.closest('.round-btn[data-group="true"]')) {
      let contactId = event.target.closest('.round-btn[data-group="true"]').dataset.id;
      openChat(contactId, 'group');
    }
  });
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  function showMenuItem(group, target) {
    // це свого роду затичка: код для сторінок з формою входу і чатом один і той
    // же. Для показу контактів викликається функція showContactsList(), а їй
    // потрібна бокова панель, якої нема на сторінці з формою
    if( ! document.querySelector('.left-side')) return;

    document.querySelector('.left-side').classList.remove('left-side_with-subheader');
    if ( document.querySelector('.left-side .subheader') ) {
      document.querySelector('.left-side .subheader').style.display = 'none';
    }
    let targetGroup = document.querySelectorAll('.list[data-list-group="' + group + '"]'),
        targetItem  = document.querySelector('[data-list="' + target + '"]');

    targetGroup.forEach(item => {
      item.classList.remove('list_active');
    });
    targetItem.classList.add('list_active');

    if (group == 'aside' && target == 'contactlist') showContactsList();

    if (group == 'aside' && target == 'chatlist') showChatsList();

    wSetScroll(document.querySelector('.lists-wrapper'), {right:true, overflowXHidden:true})
  }

  async function openUserCard(id) {
    let userCardRequest = await renderUserCard(id);
    if (userCardRequest.status == 200) {
      document.querySelector('[data-list-group="aside"][data-list="usercard"]').innerHTML = userCardRequest.html;
      document.querySelector('[data-list-group="page"][data-list="usercardP"]').innerHTML = userCardRequest.html;
    } else {
      // помилка
    }

    if ( isSmallView() ) {
      showMenuItem('aside', 'usercard')
      wSetScroll( document.querySelector('.lists-wrapper.wjs-scroll'),
                  { right:true,
                    overflowXHidden:true
                });
    } else {
      showMenuItem('page', 'usercardP')
    }
  }

  async function openGroupCard(id) {
    let groupCardRequest = await renderGroupCard(id);
    if (groupCardRequest.status == 200) {
      document.querySelector('[data-list-group="aside"][data-list="groupcard"]').innerHTML = groupCardRequest.html;
      document.querySelector('[data-list-group="page"][data-list="groupcardP"]').innerHTML = groupCardRequest.html;
    } else {
      // помилка
    }

    if ( isSmallView() ) {
      showMenuItem('aside', 'groupcard')
      wSetScroll( document.querySelector('.lists-wrapper.wjs-scroll'),
                  { right:true,
                    overflowXHidden:true
                });
    } else {
      showMenuItem('page', 'groupcardP')
    }
  }

  async function showSubheader(id, meta) {
    let showSubheaderRequest = await loadContactSubheader(id, meta);
    if (showSubheaderRequest.status == 200) {
      document.querySelector('.left-side .subheader__wrapper').innerHTML = showSubheaderRequest.html;
      document.querySelector('.right-side .subheader__wrapper').innerHTML = showSubheaderRequest.html;
      // document.querySelector('.left-side .subheader').style.display = 'flex';
    } else {
      //
    }
  }

  async function showContactsList() {
    let contactsListRequest = await renderContactsList();
    if (contactsListRequest.status == 200) {
      if (contactsListRequest.html.length > 0) {
        // показ списку
        document.querySelector('.left-side .list_active').innerHTML = contactsListRequest.html;
        wSetScroll( document.querySelector('.lists-wrapper.wjs-scroll'),
                    { right:true,
                      overflowXHidden:true
                  });
      } else {
        showMenuItem('aside', 'startL');
      }
    } else {
      showMenuItem('aside', 'startL');
    }
  }

  async function showChatsList() {
    let chatsListRequest = await renderChatsList();
    if (chatsListRequest.status == 200) {
      if (chatsListRequest.html.length > 0) {
        // показ списку
        document.querySelector('.left-side .list_active').innerHTML = chatsListRequest.html;
        wSetScroll( document.querySelector('.lists-wrapper.wjs-scroll'),
                    { right:true,
                      overflowXHidden:true
                  });
      } else {
        showMenuItem('aside', 'startL');
      }
    } else {
      showMenuItem('aside', 'startL');
    }
  }

  async function openChat(id, meta) {

    await showSubheader(id, meta);

    let tzOffset = new Date().getTimezoneOffset();

    document.querySelector('.right-side .chat-wrapper .wjs-scroll__content').innerHTML = '';
    document.querySelector('.chat-wrapper_small-view').innerHTML = '';

    let openChatRequest = await loadChat(id, meta, tzOffset);
    if (openChatRequest.status == 200) {
      document.querySelector('.right-side .chat-wrapper .wjs-scroll__content').innerHTML = openChatRequest.html;
      document.querySelector('.chat-wrapper_small-view').innerHTML = openChatRequest.html;
    } else {
      showPopupInfo('something went wrong with chat downloading');
    }

    if ( isSmallView() ) {
      showMenuItem('aside', 'chat');
      document.querySelector('.left-side').classList.add('left-side_with-subheader');
      if ( document.querySelector('.left-side .subheader') ) {
        document.querySelector('.left-side .subheader').style.display = 'flex';
      }
      wSetScroll( document.querySelector('.lists-wrapper.wjs-scroll'),
                  { right:true, overflowXHidden:true });
    } else {
      showMenuItem('page', 'chatP')

      wSetScroll( document.querySelector('.right-side .chat-wrapper.wjs-scroll'),
                  { right:true, overflowXHidden:true });
      wSetScroll( document.querySelector('.right-side .chat-wrapper.wjs-scroll'),
                  { right:true, overflowXHidden:true });
    }

    handleMessagesList();
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
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

  async function removeHistory (id) {
    console.log("removeHistory", id);
    let response = await fetch('api/gCard/removeHistory', {
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

  async function loadContactsInGroupPopup(groupID) {
    let response;
    if (groupID) {
      response = await fetch('api/render/contactsListGroupPopup', {
        method: 'POST',
        headers: {
          'Accept': 'text/html',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:groupID})
      });
    } else {
      response = await fetch('api/render/contactsListGroupPopup', {
        method: 'GET',
        headers: {
          'Accept': 'text/html'
        }
      });
    }

    if (response.status == 200) {
      let html = await response.text();
      return {status: 200, html: html}
    } else {
      return {status: response.status}
    }
  }

  async function loadMembersInGroupPopup(groupID) {
    let response = await fetch('api/render/membersListGroupPopup', {
      method: 'POST',
      headers: {
        'Accept': 'text/html',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:groupID})
    });
    if (response.status == 200) {
      let html = await response.text();
      return {status: 200, html: html}
    } else {
      return {status: response.status}
    }
  }

  async function searchIDforGP(id) {
    let response = await fetch('/api/render/matchedIDList', {
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

  async function manageGroup(properties) {
    let response = await fetch('/api/settings/manageGroup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/html'
      },
      body: JSON.stringify(properties)
    });
    if (response.status == 200) {
      return {status: 200}
    } else {
      return {status: response.status}
    }
  }

  async function sendMessageToServer(contactID, message) {
    let response = await fetch('api/chat/sendMessageToServer',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contactID : contactID,
        message   : message
      })
    });
    if (response.status == 200) {
      return {status: 200}
    } else {
      return {status: response.status}
    }
  }

  async function changeMessageStatus(contactID, messageID) {
    let response = await fetch('api/chat/changeMessageStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contactID : contactID,
        messageID : messageID
      })
    });
    if (response.status == 200) {
      return {status: 200}
    } else {
      return {status: response.status}
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////