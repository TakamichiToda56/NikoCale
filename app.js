var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cookie = require('cookie');

var serialized_cookie = cookie.serialize('test', 'ほげ', {
        maxAge : 10 //有効期間を100秒に設定
      });

var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var confirm = require('./routes/confirm');
var tweetCheck = require('./routes/tweetCheck');
var addUser = require('./routes/addUser');
var addTweet = require('./routes/addTweet');
var showAll = require('./routes/showAll');
var personal = require('./routes/personal');
var like = require('./routes/like');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('login',false));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/confirm', confirm);
app.use('/addUser', addUser);
app.use('/addTweet', addTweet);
app.use('/tweetCheck', tweetCheck);
app.use('/showAll', showAll);
app.use('/personal', personal);
app.use('/like', like);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
