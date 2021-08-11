'use strict'
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ VARIABLES ↓↓↓ */
  const { src,
          dest,
          task,
          series,
          parallel,
          watch
        } = require('gulp');

  const bs      = require('browser-sync').create(),
        del     = require('del'),
        autopre = require('gulp-autoprefixer'),
        concat  = require('gulp-concat'), // ??? а css?
        imgmin  = require('gulp-imagemin'),
        notify  = require('gulp-notify'),
        pug     = require('gulp-pug'),
        rename  = require('gulp-rename'),
        scss    = require('gulp-sass')(require('sass')),
        uglify  = require('gulp-uglify-es').default;
/* ↑↑↑ /VARIABLES ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ TASKS ↓↓↓ */
  // server for live reload
  function startBrowserSync() {
    bs.init({
      server : {
        baseDir : 'app/client/'
      },
      notify: false // відключення повідомлень browserSync
    });
  }
  exports.startBrowserSync = startBrowserSync;

  // index.pug -> index.html
  function convertIndexPug(){
    return src('app/client/index.pug')
           // .pipe(changed('app/', {extension: '.html'}))
           .pipe(pug({
             pretty : true
           }))
           .on('error', notify.onError({
             message : 'Error: <%= error.message %>',
             title   : 'PUG error'
           }))
          .pipe( dest('app/client') )
  }
  exports.convertIndexPug = convertIndexPug;

  // pug -> html
  function convertPug(){
    return src('app/client/pug/*.pug')
           // .pipe(changed('app/', {extension: '.html'}))
           .pipe(pug({
             pretty : true
           }))
           .on('error', notify.onError({
             message : 'Error: <%= error.message %>',
             title   : 'PUG error'
           }))
          .pipe( dest('app/client/html/') )
  }
  exports.convertPug = convertPug;

  // scss -> css
  function convertSCSS() {
    return src('app/client/scss/main.scss')
           .pipe( scss({outputStyle: 'compressed'}) ) // nested expanded compact compressed
           .on('error', notify.onError({
              message : 'Error: <%= error.message %>',
              title   : 'SASS error'
            }))
           .pipe (autopre ({overrideBrowserslist: ['last 10 version'], grid: 'autoplace'}) )
           .on('error', notify.onError({
              message : 'Error: <%= error.message %>',
              title   : 'Autoprefixer error'
            }))
           // .pipe( rename('index.min.css') )
           .pipe( dest('app/client/css/') )
           .pipe( bs.stream() )
  }
  exports.convertSCSS = convertSCSS;

  // js modules
  function convertModulesJS() {
    return src('app/client/modules/**/*.js')
           // .pipe( uglify() )
           .on('error', notify.onError({
              message : 'Error: <%= error.message %>',
              title   : 'JS error'
            }))
           .pipe( concat('modules.js') )
           .pipe( dest('app/client/js/') )
           .pipe( bs.stream() )
  }
  exports.convertModulesJS = convertModulesJS;

  // js
  function convertJS() {
    return src('app/client/js-expanded/*.js')
           // .pipe( uglify() )
           .on('error', notify.onError({
              message : 'Error: <%= error.message %>',
              title   : 'JS error'
            }))
           // .pipe( rename('index.min.js') )
           .pipe( dest('app/client/js/') )
           .pipe( bs.stream() )
  }
  exports.convertJS = convertJS;

  // watching & live reload
  function startWatch(){
    watch(['app/client/index.pug'], convertIndexPug);
    watch(['app/client/pug/*.pug', 'app/client/modules/**/*.pug'], convertPug);
    watch(['app/client/scss/*.scss', 'app/client/modules/**/*.scss'], convertSCSS);
    watch(['app/client/modules/**/*.js'], convertModulesJS);
    watch(['app/client/js-expanded/*.js'], convertJS );
    watch(['app/client/index.html', 'app/client/html/*.html']).on('change',  bs.reload);
  }
  exports.startWatch = startWatch;

  exports.default = series(convertSCSS, convertModulesJS, convertJS, convertPug, convertIndexPug, parallel(startBrowserSync, startWatch));
/* ↑↑↑ /TASKS ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////