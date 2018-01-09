var express = require('express');
var router = express.Router();


var returnRouter = function(io) {

	/*var getAll = function(done, error){
		Usuario.find(function(err, item){
			if(err){ error(err)}
			done(item);
		})
	}*/

	//OBTIENE LISTA DE USUARIOS
	router.get('/', function(req, res, next) {
	  	
	  	/*getAll(function(result){
	  		res.status(200).send(result);
	  	}, function(err){
	  		res.status(400).send({message: "Error al traer usuarios"});
	  	});*/

	});

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
