
var mongoose = require('mongoose');
login = require('../model/login_schema');
mongoose.connect('mongodb://127.0.0.1:27017/login');
var global_login = false;

exports.homepage = function(req, res){
	  res.render('homepage.ejs', '');
	};

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(req, res){

	res.render('login.ejs', "Hi");

}

exports.register = function(req, res){
	
	res.render('register.ejs', "Hi");

}

exports.signin = function(req, res){
	var emailid = req.body.email;
	var password = req.body.password;
	
    var response = {}; 
    login.find({emailid: emailid}, function(err, user){
    	if(err){
    		response = {"error" : true, "message": err};
        }
        else{
        	if(user[0] != null){
	        	if(password == user[0].password)
	        	{ 
		        	response = {"error" : false, "message": user };
		        	res.render('homepage.ejs', emailid);
	        	}
	        	else{
	        		res.render('login.ejs', {message:"Wrong Password. Try again"})
	        	}
        	}
        	else{
        		res.render('register.ejs', {message:"Not a user. Please register"})
        	}
        		
        }
    	
    });
}

exports.signup = function(req, res){
	var fname = req.body.name;
	var lname = req.body.last;
	var emailid = req.body.email;
	var password = req.body.password;
	var credentials = {'fname':fname, 'lname':lname, 'emailid': emailid, 'password': password};

	var db = new login(credentials);
	db.save(function(err){
		if (err){
			response = {"status": "bad", "message": "Error"};
		}
		else{
				global_login = true;
				response = {"status": "ok", "message": "Logged in successfully"};
		}
		res.render('register.ejs', 'Registered successfully');
	});

	console.log(emailid);
	console.log(req.body);
	res.render('register.ejs', 'hooiou');
	
}



