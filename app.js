var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var ruta_materia = require('./routes/ruta_materia');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/materia', ruta_materia);

//==================================================================MANEJAR MATERIAS
var materias = [
	"Calculo I", //Busquedas escondidas como atributo mat
	"Calculo II","Calculo III","Algebra I","Algebra II","Intro a la Prog.","Programacion I","Programacion II",
	"Fisica I","Fisica II","Fisica III","Des. Esp. Emprendedor","Calculo II","Calculo III","Algebra I","Algebra II",
  "Intro a la Prog.","Programacion I","Programacion II","Fisica I","Fisica II","Fisica III","Des. Esp. Emprendedor",
	"pra","pre","pre","pro","aru","ara","are","are","aro","aru","bra","bre","bre","bro","bru","cra","cre","cre","cro","cru",
	"dra","dre","dre","dro","dru","era","ere","ere","ero","eru"
];
/*
*/
function routear(){
  for (i = 0; i < materias.length; i++) {
    if ( document.URL.split('.com')[1] == ('/'+materias[i])+'/'){
      return '/' + materias[i];
    }
  }
}
app.use(routear(), ruta_materia);
//==================================================================MANEJAR ERRORES
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('URL Not Found');
  err.status = 404;
  next(err);
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
//------------------------------------------------------------------MANEJAR ERRORES
module.exports = app;
