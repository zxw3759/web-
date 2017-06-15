var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var multiparty = require('multiparty');
//
var index = require('./routes/index');
var detail = require('./routes/detail');
var addComment = require('./routes/addComment');
//后台部分
var adminIndex = require('./routes/admin/index');
var adminAdd = require('./routes/admin/add');
var ajaxadd = require('./routes/admin/ajaxadd');
var edit = require('./routes/admin/edit');
var del = require('./routes/admin/del');

var cateindex = require('./routes/admin/cateindex');
var cateadd = require('./routes/admin/cateadd');
var ajaxcateadd = require('./routes/admin/ajaxcateadd');
var cateedit = require('./routes/admin/cateedit');
var catedel = require(' ./routes/admin/catedel');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.set('view engine', 'html');
app.engine('html', ejs.__express);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bootstrap')));

//后台布局
app.use(express.static(path.join(__dirname, 'admin')));
app.use('/', index);
app.use('/detail', detail);
app.use('/addComment', addComment);
//后台部分
app.use('/admin/index', adminIndex);
app.use('/admin/add', adminAdd);
app.use('/admin/ajaxadd', ajaxadd);
app.use('/admin/edit', edit);
app.use('/admin/del', del);

app.use('/admin/cateindex', cateindex);
app.use('/admin/cateadd', cateadd);
app.use('/admin/ajaxcateadd', ajaxcateadd);
app.use('/admin/cateedit', cateedit);
app.use('/admin/catedel', catedel);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log('err:' + err);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000);
console.log('服务器正在运行.....');
module.exports = app;
