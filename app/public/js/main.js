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
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
 * Socket.IO v2.4.0
 * (c) 2014-2021 Guillermo Rauch
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.io=e():t.io=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){function r(t,e){"object"==typeof t&&(e=t,t=void 0),e=e||{};var n,r=o(t),i=r.source,p=r.id,u=r.path,h=c[p]&&u in c[p].nsps,f=e.forceNew||e["force new connection"]||!1===e.multiplex||h;return f?(a("ignoring socket cache for %s",i),n=s(i,e)):(c[p]||(a("new io instance for %s",i),c[p]=s(i,e)),n=c[p]),r.query&&!e.query&&(e.query=r.query),n.socket(r.path,e)}var o=n(1),i=n(7),s=n(12),a=n(3)("socket.io-client");t.exports=e=r;var c=e.managers={};e.protocol=i.protocol,e.connect=r,e.Manager=n(12),e.Socket=n(37)},function(t,e,n){function r(t,e){var n=t;e=e||"undefined"!=typeof location&&location,null==t&&(t=e.protocol+"//"+e.host),"string"==typeof t&&("/"===t.charAt(0)&&(t="/"===t.charAt(1)?e.protocol+t:e.host+t),/^(https?|wss?):\/\//.test(t)||(i("protocol-less url %s",t),t="undefined"!=typeof e?e.protocol+"//"+t:"https://"+t),i("parse %s",t),n=o(t)),n.port||(/^(http|ws)$/.test(n.protocol)?n.port="80":/^(http|ws)s$/.test(n.protocol)&&(n.port="443")),n.path=n.path||"/";var r=n.host.indexOf(":")!==-1,s=r?"["+n.host+"]":n.host;return n.id=n.protocol+"://"+s+":"+n.port,n.href=n.protocol+"://"+s+(e&&e.port===n.port?"":":"+n.port),n}var o=n(2),i=n(3)("socket.io-client:url");t.exports=r},function(t,e){function n(t,e){var n=/\/{2,9}/g,r=e.replace(n,"/").split("/");return"/"!=e.substr(0,1)&&0!==e.length||r.splice(0,1),"/"==e.substr(e.length-1,1)&&r.splice(r.length-1,1),r}function r(t,e){var n={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(t,e,r){e&&(n[e]=r)}),n}var o=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,i=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];t.exports=function(t){var e=t,s=t.indexOf("["),a=t.indexOf("]");s!=-1&&a!=-1&&(t=t.substring(0,s)+t.substring(s,a).replace(/:/g,";")+t.substring(a,t.length));for(var c=o.exec(t||""),p={},u=14;u--;)p[i[u]]=c[u]||"";return s!=-1&&a!=-1&&(p.source=e,p.host=p.host.substring(1,p.host.length-1).replace(/;/g,":"),p.authority=p.authority.replace("[","").replace("]","").replace(/;/g,":"),p.ipv6uri=!0),p.pathNames=n(p,p.path),p.queryKey=r(p,p.query),p}},function(t,e,n){(function(r){"use strict";function o(){return!("undefined"==typeof window||!window.process||"renderer"!==window.process.type)||("undefined"==typeof navigator||!navigator.userAgent||!navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))}function i(t){var n=this.useColors;if(t[0]=(n?"%c":"")+this.namespace+(n?" %c":" ")+t[0]+(n?"%c ":" ")+"+"+e.humanize(this.diff),n){var r="color: "+this.color;t.splice(1,0,r,"color: inherit");var o=0,i=0;t[0].replace(/%[a-zA-Z%]/g,function(t){"%%"!==t&&(o++,"%c"===t&&(i=o))}),t.splice(i,0,r)}}function s(){return"object"===("undefined"==typeof console?"undefined":u(console))&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function a(t){try{null==t?e.storage.removeItem("debug"):e.storage.debug=t}catch(n){}}function c(){var t;try{t=e.storage.debug}catch(n){}return!t&&"undefined"!=typeof r&&"env"in r&&(t=r.env.DEBUG),t}function p(){try{return window.localStorage}catch(t){}}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e=t.exports=n(5),e.log=s,e.formatArgs=i,e.save=a,e.load=c,e.useColors=o,e.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:p(),e.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],e.formatters.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},e.enable(c())}).call(e,n(4))},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(t){if(u===setTimeout)return setTimeout(t,0);if((u===n||!u)&&setTimeout)return u=setTimeout,setTimeout(t,0);try{return u(t,0)}catch(e){try{return u.call(null,t,0)}catch(e){return u.call(this,t,0)}}}function i(t){if(h===clearTimeout)return clearTimeout(t);if((h===r||!h)&&clearTimeout)return h=clearTimeout,clearTimeout(t);try{return h(t)}catch(e){try{return h.call(null,t)}catch(e){return h.call(this,t)}}}function s(){y&&l&&(y=!1,l.length?d=l.concat(d):g=-1,d.length&&a())}function a(){if(!y){var t=o(s);y=!0;for(var e=d.length;e;){for(l=d,d=[];++g<e;)l&&l[g].run();g=-1,e=d.length}l=null,y=!1,i(t)}}function c(t,e){this.fun=t,this.array=e}function p(){}var u,h,f=t.exports={};!function(){try{u="function"==typeof setTimeout?setTimeout:n}catch(t){u=n}try{h="function"==typeof clearTimeout?clearTimeout:r}catch(t){h=r}}();var l,d=[],y=!1,g=-1;f.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];d.push(new c(t,e)),1!==d.length||y||o(a)},c.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=p,f.addListener=p,f.once=p,f.off=p,f.removeListener=p,f.removeAllListeners=p,f.emit=p,f.prependListener=p,f.prependOnceListener=p,f.listeners=function(t){return[]},f.binding=function(t){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(t){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},function(t,e,n){"use strict";function r(t){var n,r=0;for(n in t)r=(r<<5)-r+t.charCodeAt(n),r|=0;return e.colors[Math.abs(r)%e.colors.length]}function o(t){function n(){if(n.enabled){var t=n,r=+new Date,i=r-(o||r);t.diff=i,t.prev=o,t.curr=r,o=r;for(var s=new Array(arguments.length),a=0;a<s.length;a++)s[a]=arguments[a];s[0]=e.coerce(s[0]),"string"!=typeof s[0]&&s.unshift("%O");var c=0;s[0]=s[0].replace(/%([a-zA-Z%])/g,function(n,r){if("%%"===n)return n;c++;var o=e.formatters[r];if("function"==typeof o){var i=s[c];n=o.call(t,i),s.splice(c,1),c--}return n}),e.formatArgs.call(t,s);var p=n.log||e.log||console.log.bind(console);p.apply(t,s)}}var o;return n.namespace=t,n.enabled=e.enabled(t),n.useColors=e.useColors(),n.color=r(t),n.destroy=i,"function"==typeof e.init&&e.init(n),e.instances.push(n),n}function i(){var t=e.instances.indexOf(this);return t!==-1&&(e.instances.splice(t,1),!0)}function s(t){e.save(t),e.names=[],e.skips=[];var n,r=("string"==typeof t?t:"").split(/[\s,]+/),o=r.length;for(n=0;n<o;n++)r[n]&&(t=r[n].replace(/\*/g,".*?"),"-"===t[0]?e.skips.push(new RegExp("^"+t.substr(1)+"$")):e.names.push(new RegExp("^"+t+"$")));for(n=0;n<e.instances.length;n++){var i=e.instances[n];i.enabled=e.enabled(i.namespace)}}function a(){e.enable("")}function c(t){if("*"===t[t.length-1])return!0;var n,r;for(n=0,r=e.skips.length;n<r;n++)if(e.skips[n].test(t))return!1;for(n=0,r=e.names.length;n<r;n++)if(e.names[n].test(t))return!0;return!1}function p(t){return t instanceof Error?t.stack||t.message:t}e=t.exports=o.debug=o["default"]=o,e.coerce=p,e.disable=a,e.enable=s,e.enabled=c,e.humanize=n(6),e.instances=[],e.names=[],e.skips=[],e.formatters={}},function(t,e){function n(t){if(t=String(t),!(t.length>100)){var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if(e){var n=parseFloat(e[1]),r=(e[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*u;case"days":case"day":case"d":return n*p;case"hours":case"hour":case"hrs":case"hr":case"h":return n*c;case"minutes":case"minute":case"mins":case"min":case"m":return n*a;case"seconds":case"second":case"secs":case"sec":case"s":return n*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function r(t){return t>=p?Math.round(t/p)+"d":t>=c?Math.round(t/c)+"h":t>=a?Math.round(t/a)+"m":t>=s?Math.round(t/s)+"s":t+"ms"}function o(t){return i(t,p,"day")||i(t,c,"hour")||i(t,a,"minute")||i(t,s,"second")||t+" ms"}function i(t,e,n){if(!(t<e))return t<1.5*e?Math.floor(t/e)+" "+n:Math.ceil(t/e)+" "+n+"s"}var s=1e3,a=60*s,c=60*a,p=24*c,u=365.25*p;t.exports=function(t,e){e=e||{};var i=typeof t;if("string"===i&&t.length>0)return n(t);if("number"===i&&isNaN(t)===!1)return e["long"]?o(t):r(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))}},function(t,e,n){function r(){}function o(t){var n=""+t.type;if(e.BINARY_EVENT!==t.type&&e.BINARY_ACK!==t.type||(n+=t.attachments+"-"),t.nsp&&"/"!==t.nsp&&(n+=t.nsp+","),null!=t.id&&(n+=t.id),null!=t.data){var r=i(t.data);if(r===!1)return m;n+=r}return f("encoded %j as %s",t,n),n}function i(t){try{return JSON.stringify(t)}catch(e){return!1}}function s(t,e){function n(t){var n=d.deconstructPacket(t),r=o(n.packet),i=n.buffers;i.unshift(r),e(i)}d.removeBlobs(t,n)}function a(){this.reconstructor=null}function c(t){var n=0,r={type:Number(t.charAt(0))};if(null==e.types[r.type])return h("unknown packet type "+r.type);if(e.BINARY_EVENT===r.type||e.BINARY_ACK===r.type){for(var o="";"-"!==t.charAt(++n)&&(o+=t.charAt(n),n!=t.length););if(o!=Number(o)||"-"!==t.charAt(n))throw new Error("Illegal attachments");r.attachments=Number(o)}if("/"===t.charAt(n+1))for(r.nsp="";++n;){var i=t.charAt(n);if(","===i)break;if(r.nsp+=i,n===t.length)break}else r.nsp="/";var s=t.charAt(n+1);if(""!==s&&Number(s)==s){for(r.id="";++n;){var i=t.charAt(n);if(null==i||Number(i)!=i){--n;break}if(r.id+=t.charAt(n),n===t.length)break}r.id=Number(r.id)}if(t.charAt(++n)){var a=p(t.substr(n)),c=a!==!1&&(r.type===e.ERROR||y(a));if(!c)return h("invalid payload");r.data=a}return f("decoded %s as %j",t,r),r}function p(t){try{return JSON.parse(t)}catch(e){return!1}}function u(t){this.reconPack=t,this.buffers=[]}function h(t){return{type:e.ERROR,data:"parser error: "+t}}var f=n(3)("socket.io-parser"),l=n(8),d=n(9),y=n(10),g=n(11);e.protocol=4,e.types=["CONNECT","DISCONNECT","EVENT","ACK","ERROR","BINARY_EVENT","BINARY_ACK"],e.CONNECT=0,e.DISCONNECT=1,e.EVENT=2,e.ACK=3,e.ERROR=4,e.BINARY_EVENT=5,e.BINARY_ACK=6,e.Encoder=r,e.Decoder=a;var m=e.ERROR+'"encode error"';r.prototype.encode=function(t,n){if(f("encoding packet %j",t),e.BINARY_EVENT===t.type||e.BINARY_ACK===t.type)s(t,n);else{var r=o(t);n([r])}},l(a.prototype),a.prototype.add=function(t){var n;if("string"==typeof t)n=c(t),e.BINARY_EVENT===n.type||e.BINARY_ACK===n.type?(this.reconstructor=new u(n),0===this.reconstructor.reconPack.attachments&&this.emit("decoded",n)):this.emit("decoded",n);else{if(!g(t)&&!t.base64)throw new Error("Unknown type: "+t);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");n=this.reconstructor.takeBinaryData(t),n&&(this.reconstructor=null,this.emit("decoded",n))}},a.prototype.destroy=function(){this.reconstructor&&this.reconstructor.finishedReconstruction()},u.prototype.takeBinaryData=function(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){var e=d.reconstructPacket(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null},u.prototype.finishedReconstruction=function(){this.reconPack=null,this.buffers=[]}},function(t,e,n){function r(t){if(t)return o(t)}function o(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}t.exports=r,r.prototype.on=r.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},r.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks["$"+t];if(!n)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var r,o=0;o<n.length;o++)if(r=n[o],r===e||r.fn===e){n.splice(o,1);break}return 0===n.length&&delete this._callbacks["$"+t],this},r.prototype.emit=function(t){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),n=this._callbacks["$"+t],r=1;r<arguments.length;r++)e[r-1]=arguments[r];if(n){n=n.slice(0);for(var r=0,o=n.length;r<o;++r)n[r].apply(this,e)}return this},r.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},r.prototype.hasListeners=function(t){return!!this.listeners(t).length}},function(t,e,n){function r(t,e){if(!t)return t;if(s(t)){var n={_placeholder:!0,num:e.length};return e.push(t),n}if(i(t)){for(var o=new Array(t.length),a=0;a<t.length;a++)o[a]=r(t[a],e);return o}if("object"==typeof t&&!(t instanceof Date)){var o={};for(var c in t)o[c]=r(t[c],e);return o}return t}function o(t,e){if(!t)return t;if(t&&t._placeholder)return e[t.num];if(i(t))for(var n=0;n<t.length;n++)t[n]=o(t[n],e);else if("object"==typeof t)for(var r in t)t[r]=o(t[r],e);return t}var i=n(10),s=n(11),a=Object.prototype.toString,c="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===a.call(Blob),p="function"==typeof File||"undefined"!=typeof File&&"[object FileConstructor]"===a.call(File);e.deconstructPacket=function(t){var e=[],n=t.data,o=t;return o.data=r(n,e),o.attachments=e.length,{packet:o,buffers:e}},e.reconstructPacket=function(t,e){return t.data=o(t.data,e),t.attachments=void 0,t},e.removeBlobs=function(t,e){function n(t,a,u){if(!t)return t;if(c&&t instanceof Blob||p&&t instanceof File){r++;var h=new FileReader;h.onload=function(){u?u[a]=this.result:o=this.result,--r||e(o)},h.readAsArrayBuffer(t)}else if(i(t))for(var f=0;f<t.length;f++)n(t[f],f,t);else if("object"==typeof t&&!s(t))for(var l in t)n(t[l],l,t)}var r=0,o=t;n(o),r||e(o)}},function(t,e){var n={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==n.call(t)}},function(t,e){function n(t){return r&&Buffer.isBuffer(t)||o&&(t instanceof ArrayBuffer||i(t))}t.exports=n;var r="function"==typeof Buffer&&"function"==typeof Buffer.isBuffer,o="function"==typeof ArrayBuffer,i=function(t){return"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer}},function(t,e,n){function r(t,e){if(!(this instanceof r))return new r(t,e);t&&"object"==typeof t&&(e=t,t=void 0),e=e||{},e.path=e.path||"/socket.io",this.nsps={},this.subs=[],this.opts=e,this.reconnection(e.reconnection!==!1),this.reconnectionAttempts(e.reconnectionAttempts||1/0),this.reconnectionDelay(e.reconnectionDelay||1e3),this.reconnectionDelayMax(e.reconnectionDelayMax||5e3),this.randomizationFactor(e.randomizationFactor||.5),this.backoff=new f({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(null==e.timeout?2e4:e.timeout),this.readyState="closed",this.uri=t,this.connecting=[],this.lastPing=null,this.encoding=!1,this.packetBuffer=[];var n=e.parser||a;this.encoder=new n.Encoder,this.decoder=new n.Decoder,this.autoConnect=e.autoConnect!==!1,this.autoConnect&&this.open()}var o=n(13),i=n(37),s=n(8),a=n(7),c=n(39),p=n(40),u=n(3)("socket.io-client:manager"),h=n(36),f=n(41),l=Object.prototype.hasOwnProperty;t.exports=r,r.prototype.emitAll=function(){this.emit.apply(this,arguments);for(var t in this.nsps)l.call(this.nsps,t)&&this.nsps[t].emit.apply(this.nsps[t],arguments)},r.prototype.updateSocketIds=function(){for(var t in this.nsps)l.call(this.nsps,t)&&(this.nsps[t].id=this.generateId(t))},r.prototype.generateId=function(t){return("/"===t?"":t+"#")+this.engine.id},s(r.prototype),r.prototype.reconnection=function(t){return arguments.length?(this._reconnection=!!t,this):this._reconnection},r.prototype.reconnectionAttempts=function(t){return arguments.length?(this._reconnectionAttempts=t,this):this._reconnectionAttempts},r.prototype.reconnectionDelay=function(t){return arguments.length?(this._reconnectionDelay=t,this.backoff&&this.backoff.setMin(t),this):this._reconnectionDelay},r.prototype.randomizationFactor=function(t){return arguments.length?(this._randomizationFactor=t,this.backoff&&this.backoff.setJitter(t),this):this._randomizationFactor},r.prototype.reconnectionDelayMax=function(t){return arguments.length?(this._reconnectionDelayMax=t,this.backoff&&this.backoff.setMax(t),this):this._reconnectionDelayMax},r.prototype.timeout=function(t){return arguments.length?(this._timeout=t,this):this._timeout},r.prototype.maybeReconnectOnOpen=function(){!this.reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()},r.prototype.open=r.prototype.connect=function(t,e){if(u("readyState %s",this.readyState),~this.readyState.indexOf("open"))return this;u("opening %s",this.uri),this.engine=o(this.uri,this.opts);var n=this.engine,r=this;this.readyState="opening",this.skipReconnect=!1;var i=c(n,"open",function(){r.onopen(),t&&t()}),s=c(n,"error",function(e){if(u("connect_error"),r.cleanup(),r.readyState="closed",r.emitAll("connect_error",e),t){var n=new Error("Connection error");n.data=e,t(n)}else r.maybeReconnectOnOpen()});if(!1!==this._timeout){var a=this._timeout;u("connect attempt will timeout after %d",a),0===a&&i.destroy();var p=setTimeout(function(){u("connect attempt timed out after %d",a),i.destroy(),n.close(),n.emit("error","timeout"),r.emitAll("connect_timeout",a)},a);this.subs.push({destroy:function(){clearTimeout(p)}})}return this.subs.push(i),this.subs.push(s),this},r.prototype.onopen=function(){u("open"),this.cleanup(),this.readyState="open",this.emit("open");var t=this.engine;this.subs.push(c(t,"data",p(this,"ondata"))),this.subs.push(c(t,"ping",p(this,"onping"))),this.subs.push(c(t,"pong",p(this,"onpong"))),this.subs.push(c(t,"error",p(this,"onerror"))),this.subs.push(c(t,"close",p(this,"onclose"))),this.subs.push(c(this.decoder,"decoded",p(this,"ondecoded")))},r.prototype.onping=function(){this.lastPing=new Date,this.emitAll("ping")},r.prototype.onpong=function(){this.emitAll("pong",new Date-this.lastPing)},r.prototype.ondata=function(t){this.decoder.add(t)},r.prototype.ondecoded=function(t){this.emit("packet",t)},r.prototype.onerror=function(t){u("error",t),this.emitAll("error",t)},r.prototype.socket=function(t,e){function n(){~h(o.connecting,r)||o.connecting.push(r)}var r=this.nsps[t];if(!r){r=new i(this,t,e),this.nsps[t]=r;var o=this;r.on("connecting",n),r.on("connect",function(){r.id=o.generateId(t)}),this.autoConnect&&n()}return r},r.prototype.destroy=function(t){var e=h(this.connecting,t);~e&&this.connecting.splice(e,1),this.connecting.length||this.close()},r.prototype.packet=function(t){u("writing packet %j",t);var e=this;t.query&&0===t.type&&(t.nsp+="?"+t.query),e.encoding?e.packetBuffer.push(t):(e.encoding=!0,this.encoder.encode(t,function(n){for(var r=0;r<n.length;r++)e.engine.write(n[r],t.options);e.encoding=!1,e.processPacketQueue()}))},r.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var t=this.packetBuffer.shift();this.packet(t)}},r.prototype.cleanup=function(){u("cleanup");for(var t=this.subs.length,e=0;e<t;e++){var n=this.subs.shift();n.destroy()}this.packetBuffer=[],this.encoding=!1,this.lastPing=null,this.decoder.destroy()},r.prototype.close=r.prototype.disconnect=function(){u("disconnect"),this.skipReconnect=!0,this.reconnecting=!1,"opening"===this.readyState&&this.cleanup(),this.backoff.reset(),this.readyState="closed",this.engine&&this.engine.close()},r.prototype.onclose=function(t){u("onclose"),this.cleanup(),this.backoff.reset(),this.readyState="closed",this.emit("close",t),this._reconnection&&!this.skipReconnect&&this.reconnect()},r.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var t=this;if(this.backoff.attempts>=this._reconnectionAttempts)u("reconnect failed"),this.backoff.reset(),this.emitAll("reconnect_failed"),this.reconnecting=!1;else{var e=this.backoff.duration();u("will wait %dms before reconnect attempt",e),this.reconnecting=!0;var n=setTimeout(function(){t.skipReconnect||(u("attempting reconnect"),t.emitAll("reconnect_attempt",t.backoff.attempts),t.emitAll("reconnecting",t.backoff.attempts),t.skipReconnect||t.open(function(e){e?(u("reconnect attempt error"),t.reconnecting=!1,t.reconnect(),t.emitAll("reconnect_error",e.data)):(u("reconnect success"),t.onreconnect())}))},e);this.subs.push({destroy:function(){clearTimeout(n)}})}},r.prototype.onreconnect=function(){var t=this.backoff.attempts;this.reconnecting=!1,this.backoff.reset(),this.updateSocketIds(),this.emitAll("reconnect",t)}},function(t,e,n){t.exports=n(14),t.exports.parser=n(22)},function(t,e,n){function r(t,e){return this instanceof r?(e=e||{},t&&"object"==typeof t&&(e=t,t=null),t?(t=u(t),e.hostname=t.host,e.secure="https"===t.protocol||"wss"===t.protocol,e.port=t.port,t.query&&(e.query=t.query)):e.host&&(e.hostname=u(e.host).host),this.secure=null!=e.secure?e.secure:"undefined"!=typeof location&&"https:"===location.protocol,e.hostname&&!e.port&&(e.port=this.secure?"443":"80"),this.agent=e.agent||!1,this.hostname=e.hostname||("undefined"!=typeof location?location.hostname:"localhost"),this.port=e.port||("undefined"!=typeof location&&location.port?location.port:this.secure?443:80),this.query=e.query||{},"string"==typeof this.query&&(this.query=h.decode(this.query)),this.upgrade=!1!==e.upgrade,this.path=(e.path||"/engine.io").replace(/\/$/,"")+"/",this.forceJSONP=!!e.forceJSONP,this.jsonp=!1!==e.jsonp,this.forceBase64=!!e.forceBase64,this.enablesXDR=!!e.enablesXDR,this.withCredentials=!1!==e.withCredentials,this.timestampParam=e.timestampParam||"t",this.timestampRequests=e.timestampRequests,this.transports=e.transports||["polling","websocket"],this.transportOptions=e.transportOptions||{},this.readyState="",this.writeBuffer=[],this.prevBufferLen=0,this.policyPort=e.policyPort||843,this.rememberUpgrade=e.rememberUpgrade||!1,this.binaryType=null,this.onlyBinaryUpgrades=e.onlyBinaryUpgrades,this.perMessageDeflate=!1!==e.perMessageDeflate&&(e.perMessageDeflate||{}),!0===this.perMessageDeflate&&(this.perMessageDeflate={}),this.perMessageDeflate&&null==this.perMessageDeflate.threshold&&(this.perMessageDeflate.threshold=1024),this.pfx=e.pfx||null,this.key=e.key||null,this.passphrase=e.passphrase||null,this.cert=e.cert||null,this.ca=e.ca||null,this.ciphers=e.ciphers||null,this.rejectUnauthorized=void 0===e.rejectUnauthorized||e.rejectUnauthorized,this.forceNode=!!e.forceNode,this.isReactNative="undefined"!=typeof navigator&&"string"==typeof navigator.product&&"reactnative"===navigator.product.toLowerCase(),("undefined"==typeof self||this.isReactNative)&&(e.extraHeaders&&Object.keys(e.extraHeaders).length>0&&(this.extraHeaders=e.extraHeaders),e.localAddress&&(this.localAddress=e.localAddress)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingIntervalTimer=null,this.pingTimeoutTimer=null,void this.open()):new r(t,e)}function o(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}var i=n(15),s=n(8),a=n(3)("engine.io-client:socket"),c=n(36),p=n(22),u=n(2),h=n(30);t.exports=r,r.priorWebsocketSuccess=!1,s(r.prototype),r.protocol=p.protocol,r.Socket=r,r.Transport=n(21),r.transports=n(15),r.parser=n(22),r.prototype.createTransport=function(t){a('creating transport "%s"',t);var e=o(this.query);e.EIO=p.protocol,e.transport=t;var n=this.transportOptions[t]||{};this.id&&(e.sid=this.id);var r=new i[t]({query:e,socket:this,agent:n.agent||this.agent,hostname:n.hostname||this.hostname,port:n.port||this.port,secure:n.secure||this.secure,path:n.path||this.path,forceJSONP:n.forceJSONP||this.forceJSONP,jsonp:n.jsonp||this.jsonp,forceBase64:n.forceBase64||this.forceBase64,enablesXDR:n.enablesXDR||this.enablesXDR,withCredentials:n.withCredentials||this.withCredentials,timestampRequests:n.timestampRequests||this.timestampRequests,timestampParam:n.timestampParam||this.timestampParam,policyPort:n.policyPort||this.policyPort,pfx:n.pfx||this.pfx,key:n.key||this.key,passphrase:n.passphrase||this.passphrase,cert:n.cert||this.cert,ca:n.ca||this.ca,ciphers:n.ciphers||this.ciphers,rejectUnauthorized:n.rejectUnauthorized||this.rejectUnauthorized,perMessageDeflate:n.perMessageDeflate||this.perMessageDeflate,extraHeaders:n.extraHeaders||this.extraHeaders,forceNode:n.forceNode||this.forceNode,localAddress:n.localAddress||this.localAddress,requestTimeout:n.requestTimeout||this.requestTimeout,protocols:n.protocols||void 0,isReactNative:this.isReactNative});return r},r.prototype.open=function(){var t;if(this.rememberUpgrade&&r.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)t="websocket";else{if(0===this.transports.length){var e=this;return void setTimeout(function(){e.emit("error","No transports available")},0)}t=this.transports[0]}this.readyState="opening";try{t=this.createTransport(t)}catch(n){return this.transports.shift(),void this.open()}t.open(),this.setTransport(t)},r.prototype.setTransport=function(t){a("setting transport %s",t.name);var e=this;this.transport&&(a("clearing existing transport %s",this.transport.name),this.transport.removeAllListeners()),this.transport=t,t.on("drain",function(){e.onDrain()}).on("packet",function(t){e.onPacket(t)}).on("error",function(t){e.onError(t)}).on("close",function(){e.onClose("transport close")})},r.prototype.probe=function(t){function e(){if(f.onlyBinaryUpgrades){var e=!this.supportsBinary&&f.transport.supportsBinary;h=h||e}h||(a('probe transport "%s" opened',t),u.send([{type:"ping",data:"probe"}]),u.once("packet",function(e){if(!h)if("pong"===e.type&&"probe"===e.data){if(a('probe transport "%s" pong',t),f.upgrading=!0,f.emit("upgrading",u),!u)return;r.priorWebsocketSuccess="websocket"===u.name,a('pausing current transport "%s"',f.transport.name),f.transport.pause(function(){h||"closed"!==f.readyState&&(a("changing transport and sending upgrade packet"),p(),f.setTransport(u),u.send([{type:"upgrade"}]),f.emit("upgrade",u),u=null,f.upgrading=!1,f.flush())})}else{a('probe transport "%s" failed',t);var n=new Error("probe error");n.transport=u.name,f.emit("upgradeError",n)}}))}function n(){h||(h=!0,p(),u.close(),u=null)}function o(e){var r=new Error("probe error: "+e);r.transport=u.name,n(),a('probe transport "%s" failed because of error: %s',t,e),f.emit("upgradeError",r)}function i(){o("transport closed")}function s(){o("socket closed")}function c(t){u&&t.name!==u.name&&(a('"%s" works - aborting "%s"',t.name,u.name),n())}function p(){u.removeListener("open",e),u.removeListener("error",o),u.removeListener("close",i),f.removeListener("close",s),f.removeListener("upgrading",c)}a('probing transport "%s"',t);var u=this.createTransport(t,{probe:1}),h=!1,f=this;r.priorWebsocketSuccess=!1,u.once("open",e),u.once("error",o),u.once("close",i),this.once("close",s),this.once("upgrading",c),u.open()},r.prototype.onOpen=function(){if(a("socket open"),this.readyState="open",r.priorWebsocketSuccess="websocket"===this.transport.name,this.emit("open"),this.flush(),"open"===this.readyState&&this.upgrade&&this.transport.pause){a("starting upgrade probes");for(var t=0,e=this.upgrades.length;t<e;t++)this.probe(this.upgrades[t])}},r.prototype.onPacket=function(t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(a('socket receive: type "%s", data "%s"',t.type,t.data),this.emit("packet",t),this.emit("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"pong":this.setPing(),this.emit("pong");break;case"error":var e=new Error("server error");e.code=t.data,this.onError(e);break;case"message":this.emit("data",t.data),this.emit("message",t.data)}else a('packet received with socket readyState "%s"',this.readyState)},r.prototype.onHandshake=function(t){this.emit("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=this.filterUpgrades(t.upgrades),this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.onOpen(),"closed"!==this.readyState&&(this.setPing(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat))},r.prototype.onHeartbeat=function(t){clearTimeout(this.pingTimeoutTimer);var e=this;e.pingTimeoutTimer=setTimeout(function(){"closed"!==e.readyState&&e.onClose("ping timeout")},t||e.pingInterval+e.pingTimeout)},r.prototype.setPing=function(){var t=this;clearTimeout(t.pingIntervalTimer),t.pingIntervalTimer=setTimeout(function(){a("writing ping packet - expecting pong within %sms",t.pingTimeout),t.ping(),t.onHeartbeat(t.pingTimeout)},t.pingInterval)},r.prototype.ping=function(){var t=this;this.sendPacket("ping",function(){t.emit("ping")})},r.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emit("drain"):this.flush()},r.prototype.flush=function(){"closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(a("flushing %d packets in socket",this.writeBuffer.length),this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))},r.prototype.write=r.prototype.send=function(t,e,n){return this.sendPacket("message",t,e,n),this},r.prototype.sendPacket=function(t,e,n,r){if("function"==typeof e&&(r=e,e=void 0),"function"==typeof n&&(r=n,n=null),"closing"!==this.readyState&&"closed"!==this.readyState){n=n||{},n.compress=!1!==n.compress;var o={type:t,data:e,options:n};this.emit("packetCreate",o),this.writeBuffer.push(o),r&&this.once("flush",r),this.flush()}},r.prototype.close=function(){function t(){r.onClose("forced close"),a("socket closing - telling transport to close"),r.transport.close()}function e(){r.removeListener("upgrade",e),r.removeListener("upgradeError",e),t()}function n(){r.once("upgrade",e),r.once("upgradeError",e)}if("opening"===this.readyState||"open"===this.readyState){this.readyState="closing";var r=this;this.writeBuffer.length?this.once("drain",function(){this.upgrading?n():t()}):this.upgrading?n():t()}return this},r.prototype.onError=function(t){a("socket error %j",t),r.priorWebsocketSuccess=!1,this.emit("error",t),this.onClose("transport error",t)},r.prototype.onClose=function(t,e){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState){a('socket close with reason: "%s"',t);var n=this;clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),
this.transport.removeAllListeners(),this.readyState="closed",this.id=null,this.emit("close",t,e),n.writeBuffer=[],n.prevBufferLen=0}},r.prototype.filterUpgrades=function(t){for(var e=[],n=0,r=t.length;n<r;n++)~c(this.transports,t[n])&&e.push(t[n]);return e}},function(t,e,n){function r(t){var e,n=!1,r=!1,a=!1!==t.jsonp;if("undefined"!=typeof location){var c="https:"===location.protocol,p=location.port;p||(p=c?443:80),n=t.hostname!==location.hostname||p!==t.port,r=t.secure!==c}if(t.xdomain=n,t.xscheme=r,e=new o(t),"open"in e&&!t.forceJSONP)return new i(t);if(!a)throw new Error("JSONP disabled");return new s(t)}var o=n(16),i=n(19),s=n(33),a=n(34);e.polling=r,e.websocket=a},function(t,e,n){var r=n(17),o=n(18);t.exports=function(t){var e=t.xdomain,n=t.xscheme,i=t.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!e||r))return new XMLHttpRequest}catch(s){}try{if("undefined"!=typeof XDomainRequest&&!n&&i)return new XDomainRequest}catch(s){}if(!e)try{return new(o[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(s){}}},function(t,e){try{t.exports="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(n){t.exports=!1}},function(t,e){t.exports=function(){return"undefined"!=typeof self?self:"undefined"!=typeof window?window:Function("return this")()}()},function(t,e,n){function r(){}function o(t){if(c.call(this,t),this.requestTimeout=t.requestTimeout,this.extraHeaders=t.extraHeaders,"undefined"!=typeof location){var e="https:"===location.protocol,n=location.port;n||(n=e?443:80),this.xd="undefined"!=typeof location&&t.hostname!==location.hostname||n!==t.port,this.xs=t.secure!==e}}function i(t){this.method=t.method||"GET",this.uri=t.uri,this.xd=!!t.xd,this.xs=!!t.xs,this.async=!1!==t.async,this.data=void 0!==t.data?t.data:null,this.agent=t.agent,this.isBinary=t.isBinary,this.supportsBinary=t.supportsBinary,this.enablesXDR=t.enablesXDR,this.withCredentials=t.withCredentials,this.requestTimeout=t.requestTimeout,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.extraHeaders=t.extraHeaders,this.create()}function s(){for(var t in i.requests)i.requests.hasOwnProperty(t)&&i.requests[t].abort()}var a=n(16),c=n(20),p=n(8),u=n(31),h=n(3)("engine.io-client:polling-xhr"),f=n(18);if(t.exports=o,t.exports.Request=i,u(o,c),o.prototype.supportsBinary=!0,o.prototype.request=function(t){return t=t||{},t.uri=this.uri(),t.xd=this.xd,t.xs=this.xs,t.agent=this.agent||!1,t.supportsBinary=this.supportsBinary,t.enablesXDR=this.enablesXDR,t.withCredentials=this.withCredentials,t.pfx=this.pfx,t.key=this.key,t.passphrase=this.passphrase,t.cert=this.cert,t.ca=this.ca,t.ciphers=this.ciphers,t.rejectUnauthorized=this.rejectUnauthorized,t.requestTimeout=this.requestTimeout,t.extraHeaders=this.extraHeaders,new i(t)},o.prototype.doWrite=function(t,e){var n="string"!=typeof t&&void 0!==t,r=this.request({method:"POST",data:t,isBinary:n}),o=this;r.on("success",e),r.on("error",function(t){o.onError("xhr post error",t)}),this.sendXhr=r},o.prototype.doPoll=function(){h("xhr poll");var t=this.request(),e=this;t.on("data",function(t){e.onData(t)}),t.on("error",function(t){e.onError("xhr poll error",t)}),this.pollXhr=t},p(i.prototype),i.prototype.create=function(){var t={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};t.pfx=this.pfx,t.key=this.key,t.passphrase=this.passphrase,t.cert=this.cert,t.ca=this.ca,t.ciphers=this.ciphers,t.rejectUnauthorized=this.rejectUnauthorized;var e=this.xhr=new a(t),n=this;try{h("xhr open %s: %s",this.method,this.uri),e.open(this.method,this.uri,this.async);try{if(this.extraHeaders){e.setDisableHeaderCheck&&e.setDisableHeaderCheck(!0);for(var r in this.extraHeaders)this.extraHeaders.hasOwnProperty(r)&&e.setRequestHeader(r,this.extraHeaders[r])}}catch(o){}if("POST"===this.method)try{this.isBinary?e.setRequestHeader("Content-type","application/octet-stream"):e.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(o){}try{e.setRequestHeader("Accept","*/*")}catch(o){}"withCredentials"in e&&(e.withCredentials=this.withCredentials),this.requestTimeout&&(e.timeout=this.requestTimeout),this.hasXDR()?(e.onload=function(){n.onLoad()},e.onerror=function(){n.onError(e.responseText)}):e.onreadystatechange=function(){if(2===e.readyState)try{var t=e.getResponseHeader("Content-Type");(n.supportsBinary&&"application/octet-stream"===t||"application/octet-stream; charset=UTF-8"===t)&&(e.responseType="arraybuffer")}catch(r){}4===e.readyState&&(200===e.status||1223===e.status?n.onLoad():setTimeout(function(){n.onError("number"==typeof e.status?e.status:0)},0))},h("xhr data %s",this.data),e.send(this.data)}catch(o){return void setTimeout(function(){n.onError(o)},0)}"undefined"!=typeof document&&(this.index=i.requestsCount++,i.requests[this.index]=this)},i.prototype.onSuccess=function(){this.emit("success"),this.cleanup()},i.prototype.onData=function(t){this.emit("data",t),this.onSuccess()},i.prototype.onError=function(t){this.emit("error",t),this.cleanup(!0)},i.prototype.cleanup=function(t){if("undefined"!=typeof this.xhr&&null!==this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=r:this.xhr.onreadystatechange=r,t)try{this.xhr.abort()}catch(e){}"undefined"!=typeof document&&delete i.requests[this.index],this.xhr=null}},i.prototype.onLoad=function(){var t;try{var e;try{e=this.xhr.getResponseHeader("Content-Type")}catch(n){}t="application/octet-stream"===e||"application/octet-stream; charset=UTF-8"===e?this.xhr.response||this.xhr.responseText:this.xhr.responseText}catch(n){this.onError(n)}null!=t&&this.onData(t)},i.prototype.hasXDR=function(){return"undefined"!=typeof XDomainRequest&&!this.xs&&this.enablesXDR},i.prototype.abort=function(){this.cleanup()},i.requestsCount=0,i.requests={},"undefined"!=typeof document)if("function"==typeof attachEvent)attachEvent("onunload",s);else if("function"==typeof addEventListener){var l="onpagehide"in f?"pagehide":"unload";addEventListener(l,s,!1)}},function(t,e,n){function r(t){var e=t&&t.forceBase64;u&&!e||(this.supportsBinary=!1),o.call(this,t)}var o=n(21),i=n(30),s=n(22),a=n(31),c=n(32),p=n(3)("engine.io-client:polling");t.exports=r;var u=function(){var t=n(16),e=new t({xdomain:!1});return null!=e.responseType}();a(r,o),r.prototype.name="polling",r.prototype.doOpen=function(){this.poll()},r.prototype.pause=function(t){function e(){p("paused"),n.readyState="paused",t()}var n=this;if(this.readyState="pausing",this.polling||!this.writable){var r=0;this.polling&&(p("we are currently polling - waiting to pause"),r++,this.once("pollComplete",function(){p("pre-pause polling complete"),--r||e()})),this.writable||(p("we are currently writing - waiting to pause"),r++,this.once("drain",function(){p("pre-pause writing complete"),--r||e()}))}else e()},r.prototype.poll=function(){p("polling"),this.polling=!0,this.doPoll(),this.emit("poll")},r.prototype.onData=function(t){var e=this;p("polling got data %s",t);var n=function(t,n,r){return"opening"===e.readyState&&"open"===t.type&&e.onOpen(),"close"===t.type?(e.onClose(),!1):void e.onPacket(t)};s.decodePayload(t,this.socket.binaryType,n),"closed"!==this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"===this.readyState?this.poll():p('ignoring poll - transport state "%s"',this.readyState))},r.prototype.doClose=function(){function t(){p("writing close packet"),e.write([{type:"close"}])}var e=this;"open"===this.readyState?(p("transport open - closing"),t()):(p("transport not open - deferring close"),this.once("open",t))},r.prototype.write=function(t){var e=this;this.writable=!1;var n=function(){e.writable=!0,e.emit("drain")};s.encodePayload(t,this.supportsBinary,function(t){e.doWrite(t,n)})},r.prototype.uri=function(){var t=this.query||{},e=this.secure?"https":"http",n="";!1!==this.timestampRequests&&(t[this.timestampParam]=c()),this.supportsBinary||t.sid||(t.b64=1),t=i.encode(t),this.port&&("https"===e&&443!==Number(this.port)||"http"===e&&80!==Number(this.port))&&(n=":"+this.port),t.length&&(t="?"+t);var r=this.hostname.indexOf(":")!==-1;return e+"://"+(r?"["+this.hostname+"]":this.hostname)+n+this.path+t}},function(t,e,n){function r(t){this.path=t.path,this.hostname=t.hostname,this.port=t.port,this.secure=t.secure,this.query=t.query,this.timestampParam=t.timestampParam,this.timestampRequests=t.timestampRequests,this.readyState="",this.agent=t.agent||!1,this.socket=t.socket,this.enablesXDR=t.enablesXDR,this.withCredentials=t.withCredentials,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.forceNode=t.forceNode,this.isReactNative=t.isReactNative,this.extraHeaders=t.extraHeaders,this.localAddress=t.localAddress}var o=n(22),i=n(8);t.exports=r,i(r.prototype),r.prototype.onError=function(t,e){var n=new Error(t);return n.type="TransportError",n.description=e,this.emit("error",n),this},r.prototype.open=function(){return"closed"!==this.readyState&&""!==this.readyState||(this.readyState="opening",this.doOpen()),this},r.prototype.close=function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this},r.prototype.send=function(t){if("open"!==this.readyState)throw new Error("Transport not open");this.write(t)},r.prototype.onOpen=function(){this.readyState="open",this.writable=!0,this.emit("open")},r.prototype.onData=function(t){var e=o.decodePacket(t,this.socket.binaryType);this.onPacket(e)},r.prototype.onPacket=function(t){this.emit("packet",t)},r.prototype.onClose=function(){this.readyState="closed",this.emit("close")}},function(t,e,n){function r(t,n){var r="b"+e.packets[t.type]+t.data.data;return n(r)}function o(t,n,r){if(!n)return e.encodeBase64Packet(t,r);var o=t.data,i=new Uint8Array(o),s=new Uint8Array(1+o.byteLength);s[0]=v[t.type];for(var a=0;a<i.length;a++)s[a+1]=i[a];return r(s.buffer)}function i(t,n,r){if(!n)return e.encodeBase64Packet(t,r);var o=new FileReader;return o.onload=function(){e.encodePacket({type:t.type,data:o.result},n,!0,r)},o.readAsArrayBuffer(t.data)}function s(t,n,r){if(!n)return e.encodeBase64Packet(t,r);if(m)return i(t,n,r);var o=new Uint8Array(1);o[0]=v[t.type];var s=new k([o.buffer,t.data]);return r(s)}function a(t){try{t=d.decode(t,{strict:!1})}catch(e){return!1}return t}function c(t,e,n){for(var r=new Array(t.length),o=l(t.length,n),i=function(t,n,o){e(n,function(e,n){r[t]=n,o(e,r)})},s=0;s<t.length;s++)i(s,t[s],o)}var p,u=n(23),h=n(24),f=n(25),l=n(26),d=n(27);"undefined"!=typeof ArrayBuffer&&(p=n(28));var y="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),g="undefined"!=typeof navigator&&/PhantomJS/i.test(navigator.userAgent),m=y||g;e.protocol=3;var v=e.packets={open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6},b=u(v),w={type:"error",data:"parser error"},k=n(29);e.encodePacket=function(t,e,n,i){"function"==typeof e&&(i=e,e=!1),"function"==typeof n&&(i=n,n=null);var a=void 0===t.data?void 0:t.data.buffer||t.data;if("undefined"!=typeof ArrayBuffer&&a instanceof ArrayBuffer)return o(t,e,i);if("undefined"!=typeof k&&a instanceof k)return s(t,e,i);if(a&&a.base64)return r(t,i);var c=v[t.type];return void 0!==t.data&&(c+=n?d.encode(String(t.data),{strict:!1}):String(t.data)),i(""+c)},e.encodeBase64Packet=function(t,n){var r="b"+e.packets[t.type];if("undefined"!=typeof k&&t.data instanceof k){var o=new FileReader;return o.onload=function(){var t=o.result.split(",")[1];n(r+t)},o.readAsDataURL(t.data)}var i;try{i=String.fromCharCode.apply(null,new Uint8Array(t.data))}catch(s){for(var a=new Uint8Array(t.data),c=new Array(a.length),p=0;p<a.length;p++)c[p]=a[p];i=String.fromCharCode.apply(null,c)}return r+=btoa(i),n(r)},e.decodePacket=function(t,n,r){if(void 0===t)return w;if("string"==typeof t){if("b"===t.charAt(0))return e.decodeBase64Packet(t.substr(1),n);if(r&&(t=a(t),t===!1))return w;var o=t.charAt(0);return Number(o)==o&&b[o]?t.length>1?{type:b[o],data:t.substring(1)}:{type:b[o]}:w}var i=new Uint8Array(t),o=i[0],s=f(t,1);return k&&"blob"===n&&(s=new k([s])),{type:b[o],data:s}},e.decodeBase64Packet=function(t,e){var n=b[t.charAt(0)];if(!p)return{type:n,data:{base64:!0,data:t.substr(1)}};var r=p.decode(t.substr(1));return"blob"===e&&k&&(r=new k([r])),{type:n,data:r}},e.encodePayload=function(t,n,r){function o(t){return t.length+":"+t}function i(t,r){e.encodePacket(t,!!s&&n,!1,function(t){r(null,o(t))})}"function"==typeof n&&(r=n,n=null);var s=h(t);return n&&s?k&&!m?e.encodePayloadAsBlob(t,r):e.encodePayloadAsArrayBuffer(t,r):t.length?void c(t,i,function(t,e){return r(e.join(""))}):r("0:")},e.decodePayload=function(t,n,r){if("string"!=typeof t)return e.decodePayloadAsBinary(t,n,r);"function"==typeof n&&(r=n,n=null);var o;if(""===t)return r(w,0,1);for(var i,s,a="",c=0,p=t.length;c<p;c++){var u=t.charAt(c);if(":"===u){if(""===a||a!=(i=Number(a)))return r(w,0,1);if(s=t.substr(c+1,i),a!=s.length)return r(w,0,1);if(s.length){if(o=e.decodePacket(s,n,!1),w.type===o.type&&w.data===o.data)return r(w,0,1);var h=r(o,c+i,p);if(!1===h)return}c+=i,a=""}else a+=u}return""!==a?r(w,0,1):void 0},e.encodePayloadAsArrayBuffer=function(t,n){function r(t,n){e.encodePacket(t,!0,!0,function(t){return n(null,t)})}return t.length?void c(t,r,function(t,e){var r=e.reduce(function(t,e){var n;return n="string"==typeof e?e.length:e.byteLength,t+n.toString().length+n+2},0),o=new Uint8Array(r),i=0;return e.forEach(function(t){var e="string"==typeof t,n=t;if(e){for(var r=new Uint8Array(t.length),s=0;s<t.length;s++)r[s]=t.charCodeAt(s);n=r.buffer}e?o[i++]=0:o[i++]=1;for(var a=n.byteLength.toString(),s=0;s<a.length;s++)o[i++]=parseInt(a[s]);o[i++]=255;for(var r=new Uint8Array(n),s=0;s<r.length;s++)o[i++]=r[s]}),n(o.buffer)}):n(new ArrayBuffer(0))},e.encodePayloadAsBlob=function(t,n){function r(t,n){e.encodePacket(t,!0,!0,function(t){var e=new Uint8Array(1);if(e[0]=1,"string"==typeof t){for(var r=new Uint8Array(t.length),o=0;o<t.length;o++)r[o]=t.charCodeAt(o);t=r.buffer,e[0]=0}for(var i=t instanceof ArrayBuffer?t.byteLength:t.size,s=i.toString(),a=new Uint8Array(s.length+1),o=0;o<s.length;o++)a[o]=parseInt(s[o]);if(a[s.length]=255,k){var c=new k([e.buffer,a.buffer,t]);n(null,c)}})}c(t,r,function(t,e){return n(new k(e))})},e.decodePayloadAsBinary=function(t,n,r){"function"==typeof n&&(r=n,n=null);for(var o=t,i=[];o.byteLength>0;){for(var s=new Uint8Array(o),a=0===s[0],c="",p=1;255!==s[p];p++){if(c.length>310)return r(w,0,1);c+=s[p]}o=f(o,2+c.length),c=parseInt(c);var u=f(o,0,c);if(a)try{u=String.fromCharCode.apply(null,new Uint8Array(u))}catch(h){var l=new Uint8Array(u);u="";for(var p=0;p<l.length;p++)u+=String.fromCharCode(l[p])}i.push(u),o=f(o,c)}var d=i.length;i.forEach(function(t,o){r(e.decodePacket(t,n,!0),o,d)})}},function(t,e){t.exports=Object.keys||function(t){var e=[],n=Object.prototype.hasOwnProperty;for(var r in t)n.call(t,r)&&e.push(r);return e}},function(t,e,n){function r(t){if(!t||"object"!=typeof t)return!1;if(o(t)){for(var e=0,n=t.length;e<n;e++)if(r(t[e]))return!0;return!1}if("function"==typeof Buffer&&Buffer.isBuffer&&Buffer.isBuffer(t)||"function"==typeof ArrayBuffer&&t instanceof ArrayBuffer||s&&t instanceof Blob||a&&t instanceof File)return!0;if(t.toJSON&&"function"==typeof t.toJSON&&1===arguments.length)return r(t.toJSON(),!0);for(var i in t)if(Object.prototype.hasOwnProperty.call(t,i)&&r(t[i]))return!0;return!1}var o=n(10),i=Object.prototype.toString,s="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===i.call(Blob),a="function"==typeof File||"undefined"!=typeof File&&"[object FileConstructor]"===i.call(File);t.exports=r},function(t,e){t.exports=function(t,e,n){var r=t.byteLength;if(e=e||0,n=n||r,t.slice)return t.slice(e,n);if(e<0&&(e+=r),n<0&&(n+=r),n>r&&(n=r),e>=r||e>=n||0===r)return new ArrayBuffer(0);for(var o=new Uint8Array(t),i=new Uint8Array(n-e),s=e,a=0;s<n;s++,a++)i[a]=o[s];return i.buffer}},function(t,e){function n(t,e,n){function o(t,r){if(o.count<=0)throw new Error("after called too many times");--o.count,t?(i=!0,e(t),e=n):0!==o.count||i||e(null,r)}var i=!1;return n=n||r,o.count=t,0===t?e():o}function r(){}t.exports=n},function(t,e){function n(t){for(var e,n,r=[],o=0,i=t.length;o<i;)e=t.charCodeAt(o++),e>=55296&&e<=56319&&o<i?(n=t.charCodeAt(o++),56320==(64512&n)?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),o--)):r.push(e);return r}function r(t){for(var e,n=t.length,r=-1,o="";++r<n;)e=t[r],e>65535&&(e-=65536,o+=d(e>>>10&1023|55296),e=56320|1023&e),o+=d(e);return o}function o(t,e){if(t>=55296&&t<=57343){if(e)throw Error("Lone surrogate U+"+t.toString(16).toUpperCase()+" is not a scalar value");return!1}return!0}function i(t,e){return d(t>>e&63|128)}function s(t,e){if(0==(4294967168&t))return d(t);var n="";return 0==(4294965248&t)?n=d(t>>6&31|192):0==(4294901760&t)?(o(t,e)||(t=65533),n=d(t>>12&15|224),n+=i(t,6)):0==(4292870144&t)&&(n=d(t>>18&7|240),n+=i(t,12),n+=i(t,6)),n+=d(63&t|128)}function a(t,e){e=e||{};for(var r,o=!1!==e.strict,i=n(t),a=i.length,c=-1,p="";++c<a;)r=i[c],p+=s(r,o);return p}function c(){if(l>=f)throw Error("Invalid byte index");var t=255&h[l];if(l++,128==(192&t))return 63&t;throw Error("Invalid continuation byte")}function p(t){var e,n,r,i,s;if(l>f)throw Error("Invalid byte index");if(l==f)return!1;if(e=255&h[l],l++,0==(128&e))return e;if(192==(224&e)){if(n=c(),s=(31&e)<<6|n,s>=128)return s;throw Error("Invalid continuation byte")}if(224==(240&e)){if(n=c(),r=c(),s=(15&e)<<12|n<<6|r,s>=2048)return o(s,t)?s:65533;throw Error("Invalid continuation byte")}if(240==(248&e)&&(n=c(),r=c(),i=c(),s=(7&e)<<18|n<<12|r<<6|i,s>=65536&&s<=1114111))return s;throw Error("Invalid UTF-8 detected")}function u(t,e){e=e||{};var o=!1!==e.strict;h=n(t),f=h.length,l=0;for(var i,s=[];(i=p(o))!==!1;)s.push(i);return r(s)}/*! https://mths.be/utf8js v2.1.2 by @mathias */
var h,f,l,d=String.fromCharCode;t.exports={version:"2.1.2",encode:a,decode:u}},function(t,e){!function(t){"use strict";e.encode=function(e){var n,r=new Uint8Array(e),o=r.length,i="";for(n=0;n<o;n+=3)i+=t[r[n]>>2],i+=t[(3&r[n])<<4|r[n+1]>>4],i+=t[(15&r[n+1])<<2|r[n+2]>>6],i+=t[63&r[n+2]];return o%3===2?i=i.substring(0,i.length-1)+"=":o%3===1&&(i=i.substring(0,i.length-2)+"=="),i},e.decode=function(e){var n,r,o,i,s,a=.75*e.length,c=e.length,p=0;"="===e[e.length-1]&&(a--,"="===e[e.length-2]&&a--);var u=new ArrayBuffer(a),h=new Uint8Array(u);for(n=0;n<c;n+=4)r=t.indexOf(e[n]),o=t.indexOf(e[n+1]),i=t.indexOf(e[n+2]),s=t.indexOf(e[n+3]),h[p++]=r<<2|o>>4,h[p++]=(15&o)<<4|i>>2,h[p++]=(3&i)<<6|63&s;return u}}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")},function(t,e){function n(t){return t.map(function(t){if(t.buffer instanceof ArrayBuffer){var e=t.buffer;if(t.byteLength!==e.byteLength){var n=new Uint8Array(t.byteLength);n.set(new Uint8Array(e,t.byteOffset,t.byteLength)),e=n.buffer}return e}return t})}function r(t,e){e=e||{};var r=new i;return n(t).forEach(function(t){r.append(t)}),e.type?r.getBlob(e.type):r.getBlob()}function o(t,e){return new Blob(n(t),e||{})}var i="undefined"!=typeof i?i:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder&&MozBlobBuilder,s=function(){try{var t=new Blob(["hi"]);return 2===t.size}catch(e){return!1}}(),a=s&&function(){try{var t=new Blob([new Uint8Array([1,2])]);return 2===t.size}catch(e){return!1}}(),c=i&&i.prototype.append&&i.prototype.getBlob;"undefined"!=typeof Blob&&(r.prototype=Blob.prototype,o.prototype=Blob.prototype),t.exports=function(){return s?a?Blob:o:c?r:void 0}()},function(t,e){e.encode=function(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e},e.decode=function(t){for(var e={},n=t.split("&"),r=0,o=n.length;r<o;r++){var i=n[r].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}},function(t,e){t.exports=function(t,e){var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},function(t,e){"use strict";function n(t){var e="";do e=s[t%a]+e,t=Math.floor(t/a);while(t>0);return e}function r(t){var e=0;for(u=0;u<t.length;u++)e=e*a+c[t.charAt(u)];return e}function o(){var t=n(+new Date);return t!==i?(p=0,i=t):t+"."+n(p++)}for(var i,s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),a=64,c={},p=0,u=0;u<a;u++)c[s[u]]=u;o.encode=n,o.decode=r,t.exports=o},function(t,e,n){function r(){}function o(t){i.call(this,t),this.query=this.query||{},c||(c=a.___eio=a.___eio||[]),this.index=c.length;var e=this;c.push(function(t){e.onData(t)}),this.query.j=this.index,"function"==typeof addEventListener&&addEventListener("beforeunload",function(){e.script&&(e.script.onerror=r)},!1)}var i=n(20),s=n(31),a=n(18);t.exports=o;var c,p=/\n/g,u=/\\n/g;s(o,i),o.prototype.supportsBinary=!1,o.prototype.doClose=function(){this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),i.prototype.doClose.call(this)},o.prototype.doPoll=function(){var t=this,e=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),e.async=!0,e.src=this.uri(),e.onerror=function(e){t.onError("jsonp poll error",e)};var n=document.getElementsByTagName("script")[0];n?n.parentNode.insertBefore(e,n):(document.head||document.body).appendChild(e),this.script=e;var r="undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent);r&&setTimeout(function(){var t=document.createElement("iframe");document.body.appendChild(t),document.body.removeChild(t)},100)},o.prototype.doWrite=function(t,e){function n(){r(),e()}function r(){if(o.iframe)try{o.form.removeChild(o.iframe)}catch(t){o.onError("jsonp polling iframe removal error",t)}try{var e='<iframe src="javascript:0" name="'+o.iframeId+'">';i=document.createElement(e)}catch(t){i=document.createElement("iframe"),i.name=o.iframeId,i.src="javascript:0"}i.id=o.iframeId,o.form.appendChild(i),o.iframe=i}var o=this;if(!this.form){var i,s=document.createElement("form"),a=document.createElement("textarea"),c=this.iframeId="eio_iframe_"+this.index;s.className="socketio",s.style.position="absolute",s.style.top="-1000px",s.style.left="-1000px",s.target=c,s.method="POST",s.setAttribute("accept-charset","utf-8"),a.name="d",s.appendChild(a),document.body.appendChild(s),this.form=s,this.area=a}this.form.action=this.uri(),r(),t=t.replace(u,"\\\n"),this.area.value=t.replace(p,"\\n");try{this.form.submit()}catch(h){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"===o.iframe.readyState&&n()}:this.iframe.onload=n}},function(t,e,n){function r(t){var e=t&&t.forceBase64;e&&(this.supportsBinary=!1),this.perMessageDeflate=t.perMessageDeflate,this.usingBrowserWebSocket=o&&!t.forceNode,this.protocols=t.protocols,this.usingBrowserWebSocket||(l=i),s.call(this,t)}var o,i,s=n(21),a=n(22),c=n(30),p=n(31),u=n(32),h=n(3)("engine.io-client:websocket");if("undefined"!=typeof WebSocket?o=WebSocket:"undefined"!=typeof self&&(o=self.WebSocket||self.MozWebSocket),"undefined"==typeof window)try{i=n(35)}catch(f){}var l=o||i;t.exports=r,p(r,s),r.prototype.name="websocket",r.prototype.supportsBinary=!0,r.prototype.doOpen=function(){if(this.check()){var t=this.uri(),e=this.protocols,n={};this.isReactNative||(n.agent=this.agent,n.perMessageDeflate=this.perMessageDeflate,n.pfx=this.pfx,n.key=this.key,n.passphrase=this.passphrase,n.cert=this.cert,n.ca=this.ca,n.ciphers=this.ciphers,n.rejectUnauthorized=this.rejectUnauthorized),this.extraHeaders&&(n.headers=this.extraHeaders),this.localAddress&&(n.localAddress=this.localAddress);try{this.ws=this.usingBrowserWebSocket&&!this.isReactNative?e?new l(t,e):new l(t):new l(t,e,n)}catch(r){return this.emit("error",r)}void 0===this.ws.binaryType&&(this.supportsBinary=!1),this.ws.supports&&this.ws.supports.binary?(this.supportsBinary=!0,this.ws.binaryType="nodebuffer"):this.ws.binaryType="arraybuffer",this.addEventListeners()}},r.prototype.addEventListeners=function(){var t=this;this.ws.onopen=function(){t.onOpen()},this.ws.onclose=function(){t.onClose()},this.ws.onmessage=function(e){t.onData(e.data)},this.ws.onerror=function(e){t.onError("websocket error",e)}},r.prototype.write=function(t){function e(){n.emit("flush"),setTimeout(function(){n.writable=!0,n.emit("drain")},0)}var n=this;this.writable=!1;for(var r=t.length,o=0,i=r;o<i;o++)!function(t){a.encodePacket(t,n.supportsBinary,function(o){if(!n.usingBrowserWebSocket){var i={};if(t.options&&(i.compress=t.options.compress),n.perMessageDeflate){var s="string"==typeof o?Buffer.byteLength(o):o.length;s<n.perMessageDeflate.threshold&&(i.compress=!1)}}try{n.usingBrowserWebSocket?n.ws.send(o):n.ws.send(o,i)}catch(a){h("websocket closed before onclose event")}--r||e()})}(t[o])},r.prototype.onClose=function(){s.prototype.onClose.call(this)},r.prototype.doClose=function(){"undefined"!=typeof this.ws&&this.ws.close()},r.prototype.uri=function(){var t=this.query||{},e=this.secure?"wss":"ws",n="";this.port&&("wss"===e&&443!==Number(this.port)||"ws"===e&&80!==Number(this.port))&&(n=":"+this.port),this.timestampRequests&&(t[this.timestampParam]=u()),this.supportsBinary||(t.b64=1),t=c.encode(t),t.length&&(t="?"+t);var r=this.hostname.indexOf(":")!==-1;return e+"://"+(r?"["+this.hostname+"]":this.hostname)+n+this.path+t},r.prototype.check=function(){return!(!l||"__initialize"in l&&this.name===r.prototype.name)}},function(t,e){},function(t,e){var n=[].indexOf;t.exports=function(t,e){if(n)return t.indexOf(e);for(var r=0;r<t.length;++r)if(t[r]===e)return r;return-1}},function(t,e,n){function r(t,e,n){this.io=t,this.nsp=e,this.json=this,this.ids=0,this.acks={},this.receiveBuffer=[],this.sendBuffer=[],this.connected=!1,this.disconnected=!0,this.flags={},n&&n.query&&(this.query=n.query),this.io.autoConnect&&this.open()}var o=n(7),i=n(8),s=n(38),a=n(39),c=n(40),p=n(3)("socket.io-client:socket"),u=n(30),h=n(24);t.exports=e=r;var f={connect:1,connect_error:1,connect_timeout:1,connecting:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1,ping:1,pong:1},l=i.prototype.emit;i(r.prototype),r.prototype.subEvents=function(){if(!this.subs){var t=this.io;this.subs=[a(t,"open",c(this,"onopen")),a(t,"packet",c(this,"onpacket")),a(t,"close",c(this,"onclose"))]}},r.prototype.open=r.prototype.connect=function(){return this.connected?this:(this.subEvents(),this.io.reconnecting||this.io.open(),"open"===this.io.readyState&&this.onopen(),this.emit("connecting"),this)},r.prototype.send=function(){var t=s(arguments);return t.unshift("message"),this.emit.apply(this,t),this},r.prototype.emit=function(t){if(f.hasOwnProperty(t))return l.apply(this,arguments),this;var e=s(arguments),n={type:(void 0!==this.flags.binary?this.flags.binary:h(e))?o.BINARY_EVENT:o.EVENT,data:e};return n.options={},n.options.compress=!this.flags||!1!==this.flags.compress,"function"==typeof e[e.length-1]&&(p("emitting packet with ack id %d",this.ids),this.acks[this.ids]=e.pop(),n.id=this.ids++),this.connected?this.packet(n):this.sendBuffer.push(n),this.flags={},this},r.prototype.packet=function(t){t.nsp=this.nsp,this.io.packet(t)},r.prototype.onopen=function(){if(p("transport is open - connecting"),"/"!==this.nsp)if(this.query){var t="object"==typeof this.query?u.encode(this.query):this.query;p("sending connect packet with query %s",t),this.packet({type:o.CONNECT,query:t})}else this.packet({type:o.CONNECT})},r.prototype.onclose=function(t){p("close (%s)",t),this.connected=!1,this.disconnected=!0,delete this.id,this.emit("disconnect",t)},r.prototype.onpacket=function(t){var e=t.nsp===this.nsp,n=t.type===o.ERROR&&"/"===t.nsp;if(e||n)switch(t.type){case o.CONNECT:this.onconnect();break;case o.EVENT:this.onevent(t);break;case o.BINARY_EVENT:this.onevent(t);break;case o.ACK:this.onack(t);break;case o.BINARY_ACK:this.onack(t);break;case o.DISCONNECT:this.ondisconnect();break;case o.ERROR:this.emit("error",t.data)}},r.prototype.onevent=function(t){var e=t.data||[];p("emitting event %j",e),null!=t.id&&(p("attaching ack callback to event"),e.push(this.ack(t.id))),this.connected?l.apply(this,e):this.receiveBuffer.push(e)},r.prototype.ack=function(t){var e=this,n=!1;return function(){if(!n){n=!0;var r=s(arguments);p("sending ack %j",r),e.packet({type:h(r)?o.BINARY_ACK:o.ACK,id:t,data:r})}}},r.prototype.onack=function(t){var e=this.acks[t.id];"function"==typeof e?(p("calling ack %s with %j",t.id,t.data),e.apply(this,t.data),delete this.acks[t.id]):p("bad ack %s",t.id)},r.prototype.onconnect=function(){this.connected=!0,this.disconnected=!1,this.emit("connect"),this.emitBuffered()},r.prototype.emitBuffered=function(){var t;for(t=0;t<this.receiveBuffer.length;t++)l.apply(this,this.receiveBuffer[t]);for(this.receiveBuffer=[],t=0;t<this.sendBuffer.length;t++)this.packet(this.sendBuffer[t]);this.sendBuffer=[]},r.prototype.ondisconnect=function(){p("server disconnect (%s)",this.nsp),this.destroy(),this.onclose("io server disconnect")},r.prototype.destroy=function(){if(this.subs){for(var t=0;t<this.subs.length;t++)this.subs[t].destroy();this.subs=null}this.io.destroy(this)},r.prototype.close=r.prototype.disconnect=function(){return this.connected&&(p("performing disconnect (%s)",this.nsp),this.packet({type:o.DISCONNECT})),this.destroy(),this.connected&&this.onclose("io client disconnect"),this},r.prototype.compress=function(t){return this.flags.compress=t,this},r.prototype.binary=function(t){return this.flags.binary=t,this}},function(t,e){function n(t,e){var n=[];e=e||0;for(var r=e||0;r<t.length;r++)n[r-e]=t[r];return n}t.exports=n},function(t,e){function n(t,e,n){return t.on(e,n),{destroy:function(){t.removeListener(e,n)}}}t.exports=n},function(t,e){var n=[].slice;t.exports=function(t,e){if("string"==typeof e&&(e=t[e]),"function"!=typeof e)throw new Error("bind() requires a function");var r=n.call(arguments,2);return function(){return e.apply(t,r.concat(n.call(arguments)))}}},function(t,e){function n(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}t.exports=n,n.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=0==(1&Math.floor(10*e))?t-n:t+n}return 0|Math.min(t,this.max)},n.prototype.reset=function(){this.attempts=0},n.prototype.setMin=function(t){this.ms=t},n.prototype.setMax=function(t){this.max=t},n.prototype.setJitter=function(t){this.jitter=t}}])});
//# sourceMappingURL=socket.io.js.map

"use strict"; // wScroll.js
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ custom scroll ↓↓↓ */
  // ініціалізація
  document.addEventListener('DOMContentLoaded', function(){
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
      let ta  = document.querySelector('.chat-form__textarea'),
          btn = document.querySelector('.chat-form__btn');
      ta.classList.add('chat-form__textarea_active');
      btn.classList.add('chat-form__btn_active');
      ta.focus();
      return
    }
  // close
  if( document.querySelector('.chat-form__textarea_active')
      && !event.target.closest('.chat-form__textarea_active') ) {
    let ta  = document.querySelector('.chat-form__textarea'),
        btn = document.querySelector('.chat-form__btn');
    ta.classList.remove('chat-form__textarea_active');
    btn.classList.remove('chat-form__btn_active');
    ta.blur();
  }
  });
/* ↑↑↑ event listeners ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
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
      document.querySelector('[data-list="groupcardP"] .user-info__name')
              .innerHTML = groupName;
      document.querySelector('[data-list="groupcardP"] .logo__name')
              .innerHTML = groupName.slice(0,2).toUpperCase();

      document.querySelector('.chat-item[data-id="' + groupID + '"] .chat-item__name')
              .innerHTML = groupName;
      document.querySelector('.chat-item[data-id="' + groupID + '"] .logo__name')
              .innerHTML = groupName.slice(0,2).toUpperCase();

      showPopupInfo('changes saved successfully');
    } else {
      showPopupInfo('something went wrong with the group settings');
    }
  }
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
// 6127f3d2d770f515a045836f
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
        document.querySelector('body').innerHTML = logoutRequest.html;
        document.querySelector('head title').innerHTML = 'Login';
        wSetScroll(document.querySelector('.login-main__inner'), {right:true, overflowXHidden:true});
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

  function isSmallView() {
    let indicator = document.getElementById('widthIndicator');
    if (getComputedStyle(indicator).display == 'none') {
      return true
    }
    return false
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
/* ↑↑↑ functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
let socket = io();

socket.on('hello', msg => {
  console.log(msg)
});