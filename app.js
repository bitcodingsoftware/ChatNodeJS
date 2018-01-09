var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var io    = require( "socket.io")();
var mongoose = require('mongoose');
var app = express();


require('./models/Mensaje'); 
var mongoose = require('mongoose');
var Mensaje = mongoose.model('Mensaje');


io.sockets.on('connection', function(socket){

  //METODO PARA TRAER TODOS LOS MENSAJES
  var getAll = function(done, error){
    Mensaje.find(function(err, item){
      if(err){ error(err)}
      done(item);
    })
  }

  //TRAE TODOS LOS MENSAJES CUANDO UN USUARIO SE CONECTA
  getAll(function(result){
    socket.emit('chat:messages', result);
  }, function(error){
    io.emit('chat:error', {message: "Error al guardar datos"});
  })  

  //RECIBE EL MENSAJE DE UN USUARIO, LO GUARDA EN MONGO Y LOS
  //ENVIA A TODOS LOS USUARIOS CONECTADOS
  socket.on('chat:sendmessage', function(msg){

    var mensaje = new Mensaje(msg);

    mensaje.save(function(err, user){
      if(err){return next(err)}

      getAll(function(result){
          io.emit('chat:messages', result);
        }, function(err){
          io.emit('chat:error', {message: "Error al guardar datos"});
        });
    }) 

  });
});

app.io  = io;


//CONEXION A BASE DE DATOS
mongoose.connect('mongodb://localhost/chatNode');


var index = require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
