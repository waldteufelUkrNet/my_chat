const config       = require('./config'),
      cookieParser = require('cookie-parser'), // а він взагалі зараз треба? він тепер хіба не вбудований?
      createError  = require('http-errors'),
      express      = require('express'),
      helmet       = require('helmet'),
      log          = require('./libs/log')(module),
      logger       = require('morgan'),
      path         = require('path'),

      indexRouter  = require('./routes/index.js'),
      authRouter   = require('./routes/authRouter'),

      port         = config.get('port'),

      app = express();

app.listen(port, function(err,result){
  console.log(`server start listen on port ${port}`);
});

app.use( helmet() );

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
app.use( cookieParser() );
app.use( express.static(path.join(__dirname, 'public')) );

app.use('/', indexRouter);
// app.use('/users', usersRouter);
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