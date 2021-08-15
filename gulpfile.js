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
        baseDir : 'app/public/'
      },
      notify: false // відключення повідомлень browserSync
    });
  }
  exports.startBrowserSync = startBrowserSync;

  // index.pug -> index.html
  function convertIndexPug(){
    return src('app/public/index.pug')
           // .pipe(changed('app/', {extension: '.html'}))
           .pipe(pug({
             pretty : true
           }))
           .on('error', notify.onError({
             message : 'Error: <%= error.message %>',
             title   : 'PUG error'
           }))
          .pipe( dest('app/public/') )
  }
  exports.convertIndexPug = convertIndexPug;

  // pug -> html
  function convertPug(){
    return src('app/public/pug/*.pug')
           // .pipe(changed('app/', {extension: '.html'}))
           .pipe(pug({
             pretty : true
           }))
           .on('error', notify.onError({
             message : 'Error: <%= error.message %>',
             title   : 'PUG error'
           }))
          .pipe( dest('app/public/html/') )
  }
  exports.convertPug = convertPug;

  // scss -> css
  function convertSCSS() {
    return src('app/public/scss/main.scss')
           .pipe( scss({outputStyle: 'expanded'}) ) // nested expanded compact compressed
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
           .pipe( dest('app/public/css/') )
           .pipe( bs.stream() )
  }
  exports.convertSCSS = convertSCSS;

  // convert js
  function convertJS() {
    return src(['app/public/libs-js/*.js',
                'app/templates/**/*.js',
                'app/public/js-expanded/*.js'])
           // .pipe( uglify() )
           .on('error', notify.onError({
              message : 'Error: <%= error.message %>',
              title   : 'JS error'
            }))
           .pipe( concat('main.js') )
           .pipe( dest('app/public/js/') )
           .pipe( bs.stream() )
  }
  exports.convertJS = convertJS;


  // watching & live reload
  function startWatch(){
    watch(['app/public/index.pug'], convertIndexPug);
    watch(['app/public/pug/*.pug', 'app/templates/**/*.pug'], convertPug);
    watch(['app/public/scss/*.scss', 'app/templates/**/*.scss'], convertSCSS);
    watch(['app/public/libs-js/*.js','app/public/js-expanded/*.js','app/templates/**/*.js'], convertJS );
    watch(['app/public/index.html', 'app/public/html/*.html']).on('change',  bs.reload);
  }
  exports.startWatch = startWatch;

  exports.default = series(convertSCSS, convertJS, convertPug, convertIndexPug, parallel(startBrowserSync, startWatch));
/* ↑↑↑ /TASKS ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////