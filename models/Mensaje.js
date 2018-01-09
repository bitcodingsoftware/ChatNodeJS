var mongoose = require('mongoose');
 

var MensajeSchema = new mongoose.Schema({
	texto: String
});


mongoose.model('Mensaje', MensajeSchema);