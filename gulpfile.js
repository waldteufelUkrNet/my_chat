'use strict'
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ VARIABLES ↓↓↓ */
  const { src,
          dest,
          // task,
          series,
          parallel,
          watch
        } = require('gulp');

  const bs      = require('browser-sync').create(),
        del     = require('del'),
        autopre = require('gulp-autoprefixer'),
        concat  = require('gulp-concat'), // ??? а css?
        csso    = require('gulp-csso'),
        notify  = require('gulp-notify'),
        pug     = require('gulp-pug'),
        scss    = require('gulp-sass')(require('sass')),
        uglify  = require('gulp-uglify-es').default;
/* ↑↑↑ /VARIABLES ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ TASKS (DEVELOPMENT) ↓↓↓ */
  // server for live reload
  function startBrowserSync() {
    bs.init({
      server : {
        baseDir : 'app/public/',
        index: "front.html"
      },
      notify: false // відключення повідомлень browserSync
    });
  }
  exports.startBrowserSync = startBrowserSync;

  // app.pug, index.pug -> app.html, index.html
  function convertIndexPug(){
    return src('app/public/*.pug')
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
    return src(['app/public/js-global/*.js',
                'app/public/libs-js/*.js',
                'app/templates/**/*.js',
                'app/public/js-expanded/*.js'
              ])
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
/* ↑↑↑ /TASKS (DEVELOPMENT) ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ TASKS (PRODUCTION) ↓↓↓ */

  function convertServerJS() {
    return src(['app/*/*.js', '!app/socket/**/*'])
           .pipe( uglify() )
           .on('error', notify.onError({
              message : 'Error: <%= error.message %>',
              title   : 'JS error'
            }))
           .pipe( dest('dist/') )
  }
  exports.convertServerJS = convertServerJS;

  function convertAppJS() {
    return src('app/app.js')
           .pipe( uglify() )
           .on('error', notify.onError({
              message : 'Error: <%= error.message %>',
              title   : 'JS error'
            }))
           .pipe( dest('dist/') )
  }
  exports.convertAppJS = convertAppJS;

  function copyFiles(done) {
    src('app/config/config.json').pipe( dest('dist/config/') );
    src('app/bin/**/*').pipe( dest('dist/bin/') );
    src('app/templates/**/*.pug').pipe( dest('dist/templates/') );
    src('app/datastorage/**/*').pipe( dest('dist/datastorage/') );
    src('app/socket/**/*').pipe( dest('dist/socket/') );

    src('app/public/css/main.css').pipe( csso() ).pipe( dest('dist/public/css/') );
    src('app/public/fonts/**/*').pipe( dest('dist/public/fonts/') );
    src('app/public/html/**/*').pipe( dest('dist/public/html/') );
    src('app/public/*.html').pipe( dest('dist/public/') );
    src('app/public/img/**/*').pipe( dest('dist/public/img/') );
    src('app/public/js/main.js').pipe( dest('dist/public/js/') );

    done()
  }
  exports.copyFiles = copyFiles;

  // чищення каталогу dist
  function clean(done) {
    return del('dist');
    done();
  }
  exports.clean = clean;

  exports.build = series(clean, convertServerJS, convertAppJS, copyFiles);
/* ↑↑↑ /TASKS (PRODUCTION) ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////