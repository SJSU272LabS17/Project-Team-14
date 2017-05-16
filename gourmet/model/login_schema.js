var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loginSchema = new Schema({
	
	fname: String,
	lname: String,
	emailid: String,
	password: String,
	
	
});

module.exports = mongoose.model('login', loginSchema);