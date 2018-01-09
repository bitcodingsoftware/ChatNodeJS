var mongoose = require('mongoose');
 
//DEFINE EL MODELO DEL USUARIO COMO SE VA A GUARDAR POR BASE DE DATOS
var UsuarioSchema = new mongoose.Schema({
	correo: String,
	nombre: String
});


mongoose.model('Usuario', UsuarioSchema);