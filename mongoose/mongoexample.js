
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

//Set Up Models
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: { type: String }
  , lastName: String
  , active: Boolean
});

var User = mongoose.model('User', UserSchema);

User.count(function (err, count){
	if (count == 0)
	{
		new User({firstName:'James', lastName:'Carr', active:true}).save();
		new User({firstName:'Thomas', lastName:'Langer', active:true}).save();	
	}
	User.find({ 'firstName': 'Thomas' }, function (err, docs) {
		docs.forEach(function (doc) {
		console.log("Simple: ("+doc.firstName+")");	
		});
	});	
});


console.log("Test");