var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Mensaje = mongoose.model('Mensaje');

var returnRouter = function(io) {

	var getAll = function(done, error){
		Mensaje.find(function(err, item){
			if(err){ error(err)}
			done(item);
		})
	}

	//OBTIENE LISTA DE USUARIOS
	router.get('/', function(req, res, next) {
	  	
	  	getAll(function(result){
	  		res.status(200).send(result);
	  	}, function(err){
	  		res.status(400).send({message: "Error al traer usuarios"});
	  	});

	});

	//GUARDAR MENSAJE
	router.post('/', function(req, res, next){

		var mensaje = new Mensaje(req.body);

		mensaje.save(function(err, user){
			if(err){return next(err)}

			getAll(function(result){
		  		io.emit('chat:message', result);
		  	}, function(err){
		  		res.status(400).send({message: "Error al traer usuarios"});
		  	});
			//res.status(201).send({message: "Usuario creado con exito"});
		}) 
	})

	/*io.in(req.params.idNegocio).emit('change:usuario', data);


	router.post('/', function(req, res, next){

		var usuario = new Usuario(req.body);

		usuario.save(function(err, user){
			if(err){return next(err)}
			res.status(201).send({message: "Usuario creado con exito"});
		}) 
	})*/

	return router;
}

module.exports = returnRouter;
