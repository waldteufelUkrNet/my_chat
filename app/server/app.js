const config            = require('./config'),
      createError       = require('http-errors'),
      express           = require('express'),
      helmet            = require('helmet'),                   // security
      log               = require('./libs/log')(module),       // HTTP logger
      logger            = require('morgan'),                   // logger
      mongoSessionStore = require('connect-mongo'),            // save cookies in db
      path              = require('path'),
      session           = require('express-session'),          // cookies generator: request.session

      indexRouter       = require('./routes/index.js'),
      authRouter        = require('./routes/authRouter'),

      port              = config.get('port'),

      app               = express();

app.listen(port, function(err,result){
  console.log(`server start listen on port ${port}`);
});

// app.use( helmet() );

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

// app.use(logger('dev',{immediate:true}));
if (app.get('env') == 'development') {
  app.use( logger('dev') );
} else {
  app.use( logger('combined') );
}

app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
app.use( express.static(path.join(__dirname, 'public')) );

let sessionConfig = config.get('session');
sessionConfig.store = mongoSessionStore.create({ mongoUrl: config.get('mongoose:uri') });
app.use(session( sessionConfig ));

app.use('/', indexRouter);
app.use('/api/authorization', authRouter);

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