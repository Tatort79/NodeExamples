
/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');

var app = module.exports = express.createServer();
mongoose.connect('mongodb://localhost/test');

// Configuration

app.configure(function(){
  app.use(express.cookieParser());
  app.use(express.session({ secret: "keyboard cat" }));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

//Set Up Models
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: { type: String }
  , lastName: String
  , active: Boolean
});

var User = mongoose.model('User', UserSchema);

// Routes

app.get('/', function(req, res){
	
	  res.render('index', {
		    title: 'Express Demo von Tatort79 ' + req.session.info
		  });
  
});

app.get('/createUser', function(req, res) {
	
	console.log(req.params);
	
	res.render('index', {
		 title: 'createUser '+req.params
		  });
	
});

app.get('/session', function(req, res){
	
	  req.session.info = "Session";
	
	  res.render('index', {
		    title: 'Express Demo von Tatort79'
		  });

});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
