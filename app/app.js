process.env.NODE_ENV = 'development';

const chalk             = require('chalk'),
      config            = require('./config'),
      createError       = require('http-errors'),
      express           = require('express'),
      helmet            = require('helmet'),                   // security
      log               = require('./libs/log')(module),       // HTTP logger
      logger            = require('morgan'),                   // logger
      path              = require('path'),
      session           = require('express-session'),          // cookies generator: request.session
      sessionStore      = require('./libs/sessionStore'),
      io                = require('./socket'),

      authRouter        = require('./routes/authRouter'),
      gCardRouter       = require('./routes/gCardRouter'),
      indexRouter       = require('./routes/indexRouter'),
      renderRouter      = require('./routes/renderRouter'),
      searchRouter      = require('./routes/searchRouter'),
      settingsRouter    = require('./routes/settingsRouter'),
      uCardRouter       = require('./routes/uCardRouter'),

      port              = config.get('port'),

      app               = express();

let httpServer = io.init(app);

httpServer.listen(3002, function(err, result) {
  if (err) {
    log.error('\nerr.name:\n    ' + err.name + '\nerr.message:\n    ' + err.message + '\nerr.stack:\n    ' +err.stack);
  } else {
    console.log( chalk.black.bgGreen(`server start listen on port ${port}` ));
    log.debug(`server start listen on port ${port}`);
  }
});

// app.use( helmet() );

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

// app.use(logger('dev',{immediate:true}));
// if (app.get('env') == 'development') {
//   app.use( logger('dev') );
// } else {
//   app.use( logger('combined') );
// }

app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );


let sessionConfig = config.get('session');
sessionConfig.store = sessionStore;
app.use(session( sessionConfig ));

app.use('/api/authorization', authRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/search', searchRouter);
app.use('/api/render', renderRouter);
app.use('/api/uCard', uCardRouter);
app.use('/api/gCard', gCardRouter);
app.use('/', indexRouter);

app.use( express.static(path.join(__dirname, 'public')) );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;